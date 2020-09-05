import * as  fs from "fs";
import * as paths from "path";
import * as os from "os";
import * as ncp from "ncp";
import * as _ from "lodash";
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

    private loadEquipmentDefinitions(directory: string) {
        let loadedDefinitions = {};
        for (const file of fs.readdirSync(directory)) {
            const fileContent = fs.readFileSync(paths.join(directory, file), "utf8").split(/\r?\n/);
            let mode: string[] = [];
            let inProgressItem: { [index: string]: any } = {};
            for (let i = 0; i < fileContent.length; i++) {
                const trimmedLine = fileContent[i].trim().substr(0, fileContent[i].indexOf("#") === -1 ? undefined : fileContent[i].trim().indexOf("#"));
                const tokenizedLine = trimmedLine.split("=").map(token => token.trim());
                if (i == 0) {
                    if (!trimmedLine.startsWith("equipments")) {
                        throw new Error("Equipment files must start with 'equipments = {' on the first line.");
                    } else {
                        continue;
                    }
                }
                if (trimmedLine.length === 0) {
                    continue;
                }
                if (mode.length == 0 && tokenizedLine[1] === "{") {
                    mode.push("equipment");
                    inProgressItem = {
                        name: tokenizedLine[0]
                    };
                    continue;
                }
                if (mode.slice(-1)[0] === "equipment") {
                    switch (tokenizedLine[0]) {
                        case "is_archetype":
                            if (tokenizedLine[1] === "yes") {
                                inProgressItem.isArchetype = true;
                            } else {
                                console.warn("is_archetype doesn't make sense with any value other than 'yes', so it's being skipped.");
                            }
                            break;
                        case "is_buildable":
                            if (tokenizedLine[1] === "no") {
                                inProgressItem.isBuildable = false;
                            } else {
                                console.warn("is_buildable doesn't make sense with any value other than 'no', so it's being skipped.");
                            }
                            break;
                        case "type":
                            if (["infantry", "support", "artillery", "anti_tank", "anti_air", "motorized", "mechanized", "armor", "fighter", "cas", "naval_bomber", "interceptor", "suicide", "tactical_bomber", "strategic_bomber",
                                "air_transport", "missile", "submarine", "screen_ship", "capital_ship", "carrier"].includes(tokenizedLine[1].substring(1, tokenizedLine[1].length - 1))) {
                                inProgressItem.type = tokenizedLine[1].substring(1, tokenizedLine[1].length - 1);
                            } else {
                                console.warn("Internal type " + tokenizedLine[1] + " is not valid.");
                            }
                            break;
                        case "upgrades":
                            mode.push("upgrades");
                            break;
                        case "group_by":
                        case "archetype":
                        case "interface_category":
                        case "parent":
                            if (tokenizedLine[1].startsWith("\"") && tokenizedLine[1].endsWith("\"")) {
                                tokenizedLine[1] = tokenizedLine[1].substring(1, tokenizedLine[1].length - 1);
                            }
                            inProgressItem[tokenizedLine[0].fromSnakeCaseToCamelCase()] = tokenizedLine[1];
                            break;
                        case "priority":
                        case "visual_level":
                        case "reliability":
                        case "build_cost_ic":
                        case "defense":
                        case "breakthrough":
                        case "max_organization":
                        case "lend_lease_cost":
                        case "maximum_speed":
                        case "soft_attack":
                        case "hard_attack":
                        case "air_attack":
                            inProgressItem[tokenizedLine[0].fromSnakeCaseToCamelCase()] = Number.parseFloat(tokenizedLine[1]);
                            break;
                        case "ap_attack":
                            inProgressItem.armorPenetration = Number.parseFloat(tokenizedLine[1]);
                            break;
                        case "resources":
                            inProgressItem.resources = {};
                            mode.push("resources");
                            break;
                        case "}":
                            loadedDefinitions[inProgressItem.name] = EquipmentModel.from(inProgressItem);
                            inProgressItem = {};
                            mode
                                .pop();
                            break;
                        default:
                            console.log
                            (
                                "Ignoring property "
                                +
                                tokenizedLine
                                    [0]
                            );
                            break;
                    }
                    continue;
                }

                if (mode.slice(-1)[0] === "upgrades") {
                    switch (tokenizedLine[0]) {
                        case "}":
                            mode.pop();
                            break;
                    }
                    continue;
                }
                if (mode.slice(-1)[0] === "resources") {
                    switch (tokenizedLine[0]) {
                        case "}":
                            mode.pop();
                            break;
                        default:
                            inProgressItem.resources[tokenizedLine[0]] = tokenizedLine[1];
                            break;
                    }
                    continue;
                }
            }
        }
        return loadedDefinitions;
    }

    private saveModFiles(mod: ModModel) {
        const modSnapshot = this.modStateSnapshots[mod.descriptor.name] || new ModModel(mod.descriptor, {}, {});
        if (!_.isEqual(mod, modSnapshot)) {
            const tempDirectoryRoot = paths.join(os.tmpdir(), "hoi4-tool", encodeURIComponent(mod.descriptor.name));
            // @ts-ignore
            fs.rmdirSync(tempDirectoryRoot, {
                recursive: true
            });

            // @ts-ignore
            fs.mkdirSync(tempDirectoryRoot, {
                recursive: true
            });

            fs.writeFileSync(paths.join(tempDirectoryRoot, "descriptor.mod"), mod.descriptor.toParadoxFormat());

            this.saveEquipmentFiles(mod, modSnapshot, tempDirectoryRoot);
            this.saveUnitFiles(mod, modSnapshot, tempDirectoryRoot);

            ncp(tempDirectoryRoot, mod.descriptor.location);
            this.modStateSnapshots[mod.descriptor.name] = new ModModel(new ModDescriptor(mod.descriptor.name, mod.descriptor.version, mod.descriptor.tags, mod.descriptor.replacePaths, mod.descriptor.location, mod.descriptor.supportedVersion, mod.descriptor.dependencies),
                {...mod.equipment}, {...mod.units});
        }
    }

    private saveEquipmentFiles(mod: ModModel, modSnapshot: ModModel, tempDirectoryRoot: string) {
        // @ts-ignore
        fs.mkdirSync(paths.join(tempDirectoryRoot, "common", "units", "equipment"), {
            recursive: true
        });

        const deletedEquipment = _.difference(Object.keys(modSnapshot.equipment), Object.keys(mod.equipment));
        for (let deleted of deletedEquipment) {
            fs.unlinkSync(paths.join(mod.descriptor.location, "common", "units", "equipment", deleted + ".txt"));
        }

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

        const deletedUnits = _.difference(Object.keys(modSnapshot.units), Object.keys(mod.units));
        for (let deleted of deletedUnits) {
            fs.unlinkSync(paths.join(mod.descriptor.location, "common", "units", "equipment", deleted + ".txt"));
        }

        for (let unit in mod.units) {
            const paradoxFormatted = mod.units[unit].toParadoxFormat();

            // Write to temp directory
            fs.writeFileSync(paths.join(tempDirectoryRoot, "common", "units", unit + ".txt"), paradoxFormatted, {
                "encoding": "utf8"
            });
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