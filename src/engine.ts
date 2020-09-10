import * as _ from "lodash";
import * as  fs from "fs";
import * as paths from "path";
import * as os from "os";
import * as ncp from "ncp";
import * as util from "util";
import ModDescriptor from "./model/ModDescriptor";
import ModModel from "./model/ModModel";
import {EventEmitter} from "events";
import LoadDefinitions from "./LoadDefinitions";
import {
    convertValueToParadoxString,
    getMappingForField,
    getParadoxTypeForfield, getPropertiesForEntity
} from "./model/decorators/ParadoxProperty";
import ModEntityModel from "./model/ModEntityModel";
import {getEntities, getFilePrefixForEntity} from "./model/decorators/ParadoxEntity";
import EquipmentModel from "./model/EquipmentModel";
import UnitModel from "./model/UnitModel";

// These are needed to ensure that the model decorators run.
require("./model/EquipmentModel").default;
require("./model/UnitModel").default;

export default class Hoi4ModCreator extends EventEmitter {
    private readonly mods: { [index: string]: ModModel } = {};
    private readonly modStateSnapshots: { [index: string]: ModModel } = {};
    private configuration: { [index: string]: any }
    private readonly configurationFileLocation: string;

    constructor() {
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
        let existingEntity;
        if (activeMod && entity.name) {
            switch (type) {
                case "equipment":
                    existingEntity = activeMod.equipment[entity.name] || _.set(activeMod, ["equipment", entity.name],  EquipmentModel.from(entity));
                    break;
                case "sub_unit":
                    existingEntity = activeMod.units[entity.name] || _.set(activeMod, ["units", entity.name],  UnitModel.from(entity));
                    break;
                default:
                    console.error("Entity type " + type + " not supported");
                    return;
            }
            if(existingEntity) {
                existingEntity.updateFrom(entity);
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

            this.saveEntityFiles(mod.equipment, paths.join(tempDirectoryRoot, "common", "units", "equipment"));
            this.saveEntityFiles(mod.units, paths.join(tempDirectoryRoot, "common", "units"));

            ncp(tempDirectoryRoot, mod.descriptor.location, {
                clobber: true,
                stopOnErr: true
            }, (err) => {
                if (!err) {
                    this.cleanupDeletedFiles(mod);
                }
            });
        } catch (e) {
            console.error(e);
            // @ts-ignore
            fs.rmdirSync(tempDirectoryRoot, {
                recursive: true
            });
        }
    }

    private saveEntityFiles(entities: { [name:string]: ModEntityModel }, directoryRoot: string) {
        // @ts-ignore
        fs.mkdirSync(directoryRoot, {
            recursive: true
        });

        for (let entity in entities) {
            // If the item was loaded from a file, let's update that file.
            const entityDef: ModEntityModel = entities[entity];
            if (entityDef.sourceFilePath) {
                // Read the original file and update a temp copy
                let fileContents: string[] = fs.readFileSync(entities[entity].sourceFilePath, "utf8").split(/\r?\n/);
                // Find the lines where the entity starts and stops.
                const entityStartLine: number = fileContents.findIndex(line => {
                    return line.trim().startsWith(entityDef.name);
                })
                const entityEndLine: number = fileContents.findIndex((line, lineNumber) => {
                    return line.trim().startsWith("}") && lineNumber > entityStartLine;
                });
                const replacedProperties = [];
                fileContents = fileContents.map((line: string, lineNumber: number) => {
                    if(!line.trim().length) {
                        return;
                    }
                    if(lineNumber <= entityStartLine || lineNumber >= entityEndLine) {
                        return line;
                    }
                    const leadingWhiteSpace = /^(\s*)/.exec(line)[1];
                    const tokenizedLine = line.split("=").map(token => token.trim());
                    const fieldName = getMappingForField(tokenizedLine[0], entities[entity].constructor);
                    const value = entities[entity][fieldName];
                    if (value !== undefined) {
                        replacedProperties.push(getMappingForField(tokenizedLine[0], entities[entity].constructor));
                        const lineMappings = entities[entity].lineMappings;
                        if (lineMappings[fieldName] == lineNumber + 1) { // Line numbers start at 1 in text files
                            const typeMapping = getParadoxTypeForfield(fieldName, entities[entity].constructor);
                            const formattedValue = convertValueToParadoxString(entityDef[fieldName], typeMapping);
                            return leadingWhiteSpace + tokenizedLine[0] + " = " + formattedValue;
                        }
                    } else {
                        return line;
                    }
                });
                // Insert new properties before the endLine
                const linesToInsert = [];
                for (const property in entities[entity]) {
                    if (!replacedProperties.includes(property)) {
                        const paradoxType = getParadoxTypeForfield(property, entities[entity].constructor)
                        if(paradoxType !== undefined) {
                            const paradoxProperty = getMappingForField(property, entities[entity].constructor);
                            const value = entities[entity][property];
                            if (value !== undefined) {
                                linesToInsert.push("\t\t" + paradoxProperty + " = " + convertValueToParadoxString(value, paradoxType));
                            }
                        }
                    }
                }
                for (const line of linesToInsert) {
                    fileContents.splice(entityEndLine, 0, line);
                }

                fs.writeFileSync(paths.join(directoryRoot, paths.basename(entityDef.sourceFilePath)), fileContents.join(os.EOL));
            } else {
                const fileContent = this.generateNewFileForEntity(entityDef);
                fs.writeFileSync(paths.join(directoryRoot, entity + ".txt"), fileContent, {
                    encoding: "utf8"
                });
            }
        }
    }

    private generateNewFileForEntity(entity: ModEntityModel){
        const filePrefix = util.format("%s = {%s", getFilePrefixForEntity(entity.constructor), os.EOL);
        const fileContent = filePrefix + entity.toParadoxFormat() + os.EOL + "}";
        return fileContent;
    }

    private cleanupDeletedFiles(mod: ModModel) {
        // const deletedUnits = _.difference(Object.keys(modSnapshot.units || {}), Object.keys(mod.units || {}));
        // for (let deleted of deletedUnits) {
        //     fs.unlinkSync(paths.join(mod.descriptor.location, "common", "units", "equipment", deleted + ".txt"));
        // }
        // const deletedEquipment = _.difference(Object.keys(modSnapshot.equipment), Object.keys(mod.equipment));
        // for (let deleted of deletedEquipment) {
        //     fs.unlinkSync(paths.join(mod.descriptor.location, "common", "units", "equipment", deleted + ".txt"));
        // }
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

    generateUiConfiguration() {
        const entityDefinitions = getEntities();
        return Object.keys(entityDefinitions).reduce((definitions, nextEntityName) => {
           const entityDefinition = entityDefinitions[nextEntityName];
           const entityProperties = getPropertiesForEntity(entityDefinition.constructor);
            definitions[nextEntityName] = {
                categoryName: nextEntityName,
                categoryLabel: entityDefinition.displayName,
                entityProperties
            };
           return definitions;
        }, {});
    }
}