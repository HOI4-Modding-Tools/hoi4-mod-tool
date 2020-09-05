import * as  fs from "fs";
import * as paths from "path";
import * as os from "os";
import * as ncp from "ncp";
import * as _ from "lodash";
import * as util from "util";
import ModDescriptor from "./model/ModDescriptor";
import ModModel from "./model/ModModel";
import EquipmentModel from "./model/EquipmentModel";
import UnitModel from "./model/UnitModel";
import {EventEmitter} from "events";
import LoadDefinitions from "./LoadDefinitions";

export default class Hoi4ModCreator extends EventEmitter {
    private readonly mods: { [index: string]: ModModel } = {};
    private readonly modStateSnapshots: { [index: string]: ModModel } = {};
    private configuration: { [index: string]: any }
    private readonly configurationFileLocation: string;

    constructor(configurationObject) {
        super();
        this.on("modUpdated", (updatedMod) => {
            this.saveModFiles(updatedMod);
        });
        this.on("configurationChanged", this.saveConfigurationFile);
        this.configurationFileLocation = paths.join(os.homedir(), "hoi4-mod-tool-config.json");
    }

    public initialize() {
        const configFileLocation = paths.join(os.homedir(), "hoi-4-mod-tool-config.json");
        if (fs.existsSync(configFileLocation)) {
            console.log("Existing configuration was found, let's load it.");
            const loadedConfig = JSON.parse(fs.readFileSync(configFileLocation, "utf8"));
            console.log("Based on the loaded configuration, the following properties are set:");
            for (const property in loadedConfig) {
                console.log(property, ":", loadedConfig[property]);
            }
            this.configuration = loadedConfig;
        }
        if (this.configuration.modHomeDirectory) {
            this.loadExistingLocalMods();
        }
    }

    loadExistingLocalMods() {
        const localModDirectories = fs.readdirSync(this.configuration.modHomeDirectory);
        for (const directory of localModDirectories) {
            const file = fs.statSync(paths.join(this.configuration.modHomeDirectory, directory));
            if (file.isDirectory()) {
                this.loadLocalMod(
                    paths.join(this.configuration.modHomeDirectory, directory));
            }
        }
    }

    private loadLocalMod(directory: string) {
        let modDescriptor: ModDescriptor = this.processDescriptorFile(directory);

        const definitions = LoadDefinitions(directory);

        this.mods[modDescriptor.name] = new ModModel(modDescriptor, definitions.equipment, definitions.units);
        this.modStateSnapshots[modDescriptor.name] = new ModModel(modDescriptor, {...definitions.equipment}, {...definitions.units});
    }

    processDescriptorFile(directory) {
        return ModDescriptor.parse(fs.readFileSync(paths.join(directory, "descriptor.mod"), "utf-8"), directory);
    }

    getMods(): { [index: string]: ModModel } {
        return this.mods;
    }

    getMod(modName: string): ModModel {
        return this.mods[modName];
    }

    replaceEntity(mod: string, type: string, entity: any) {
        const activeMod: ModModel = this.mods[mod];
        if (activeMod && entity.name) {
            switch (type) {
                case "equipment":
                    activeMod.equipment[entity.name] = EquipmentModel.from(entity);
                    break;
                case "unit":
                    activeMod.units[entity.name] = UnitModel.from(entity);
                    break;
                default:
                    console.error("Entity type " + type + " not supported");
            }
            this.emit("modUpdated", activeMod);
        }
    }

    deleteEntity(mod: string, type: string, entity: string) {
        const activeMod = this.mods[mod];
        if (activeMod) {
            const entityCategory = activeMod["_" + type];
            if (entityCategory) {
                delete entityCategory[entity];
                this.emit("modUpdated", activeMod);
            }
        }
    }

    updateDescriptor(mod: string, descriptor: any) {
        this.mods[mod].descriptor = new ModDescriptor(descriptor.name, descriptor.version, descriptor.tags, descriptor.replacePaths, descriptor.location, descriptor.supportedVersion, descriptor.dependencies);
        this.emit("modUpdated", this.mods[mod]);
    }

    private async saveModFiles(mod: ModModel) {
        const modSnapshot = this.modStateSnapshots[mod.descriptor.name] || new ModModel(mod.descriptor, {}, {});
        if (!_.isEqual(mod, modSnapshot)) {
            const tempDirectoryRoot = paths.join(os.tmpdir(), "hoi4-tool", encodeURIComponent(mod.descriptor.name));
            try {
                // @ts-ignore
                await util.promisify(fs.rmdir)(tempDirectoryRoot, {
                    recursive: true
                });

                // @ts-ignore
                await util.promisify(fs.mkdir)(tempDirectoryRoot, {
                    recursive: true
                });

                fs.writeFileSync(paths.join(tempDirectoryRoot, "descriptor.mod"), mod.descriptor.toParadoxFormat());

                this.saveEquipmentFiles(mod, modSnapshot, tempDirectoryRoot);
                this.saveUnitFiles(mod, modSnapshot, tempDirectoryRoot);

                ncp(tempDirectoryRoot, mod.descriptor.location, {
                    clobber: true
                }, (err) => {
                    if(!err) {
                        this.cleanupDeletedFiles(mod, modSnapshot);
                        this.modStateSnapshots[mod.descriptor.name] = new ModModel(new ModDescriptor(mod.descriptor.name, mod.descriptor.version, mod.descriptor.tags, mod.descriptor.replacePaths, mod.descriptor.location, mod.descriptor.supportedVersion, mod.descriptor.dependencies),
                            {...mod.equipment}, {...mod.units});
                        fs.rmdirSync(tempDirectoryRoot, {
                            recursive: true
                        });
                    }
                });


            } catch (e) {
                fs.rmdirSync(tempDirectoryRoot);
            }
        }
    }

    private saveEquipmentFiles(mod: ModModel, modSnapshot: ModModel, tempDirectoryRoot: string) {
        // @ts-ignore
        fs.mkdirSync(paths.join(tempDirectoryRoot, "common", "units", "equipment"), {
            recursive: true
        });

        for (let equipment in mod.equipment) {
            const paradoxFormatted = mod.equipment[equipment].toParadoxFormat();

            // Write to temp directory
            fs.writeFileSync(paths.join(tempDirectoryRoot, "common", "units", "equipment", equipment + ".txt"), paradoxFormatted, {
                "encoding": "utf8"
            });
        }
    }

    private saveUnitFiles(mod: ModModel, modSnapshot: ModModel, tempDirectoryRoot: string) {
        // @ts-ignore
        fs.mkdirSync(paths.join(tempDirectoryRoot, "common", "units"), {
            recursive: true
        });

        // Copy all units to the temp directory
        for (let unit in mod.units) {
            const paradoxFormatted = mod.units[unit].toParadoxFormat();

            // Write to temp directory
            fs.writeFileSync(paths.join(tempDirectoryRoot, "common", "units", unit + ".txt"), paradoxFormatted, {
                "encoding": "utf8"
            });
        }
    }

    private cleanupDeletedFiles(mod: ModModel, modSnapshot: ModModel) {
        const deletedUnits = _.difference(Object.keys(modSnapshot.units || {}), Object.keys(mod.units || {}));
        for (let deleted of deletedUnits) {
            fs.unlinkSync(paths.join(mod.descriptor.location, "common", "units", "equipment", deleted + ".txt"));
        }
        const deletedEquipment = _.difference(Object.keys(modSnapshot.equipment), Object.keys(mod.equipment));
        for (let deleted of deletedEquipment) {
            fs.unlinkSync(paths.join(mod.descriptor.location, "common", "units", "equipment", deleted + ".txt"));
        }
    }

    private saveConfigurationFile() {
        const stringifiedConfiguration = JSON.stringify(this.configuration);
        fs.writeFile(this.configurationFileLocation, stringifiedConfiguration, err => {
            if (!err) {
                console.log("Updated configuration file");
            } else {
                console.error(err);
            }
        });
    }
}