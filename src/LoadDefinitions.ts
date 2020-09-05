import * as fs from "fs";
import * as path from "path";
import EquipmentModel from "./model/EquipmentModel";
import UnitModel from "./model/UnitModel";
import * as _ from "lodash";
import {getParadoxPropertiesForType, getPropertyMappingByParadoxName} from "./model/decorators/ParadoxProperty";

export default function LoadDefinitions(directory: string, existingDefinitions?: any): {[index:string] : any} {
    existingDefinitions = existingDefinitions || {};
    for(const fileName of fs.readdirSync(directory)) {
        const fileStats = fs.statSync(path.join(directory, fileName));
        if(fileStats.isDirectory()) {
            _.merge(existingDefinitions, LoadDefinitions(path.join(directory, fileName)));
        } else {
            _.merge(existingDefinitions, readFileAndLoadEntities(path.join(directory, fileName)));
        }

    }
    return existingDefinitions;
}

function readFileAndLoadEntities(filePath: string): any {
    const fileContents:string[] = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
    const entities = {};
    let category;
    let loadedEntities;
    if(fileContents[0].startsWith("equipments")) {
        // Parse as equipment file
        category = "equipment";
        loadedEntities = parseEntitiesFromFileToType(fileContents.slice(1), EquipmentModel);
    } else if(fileContents[0].startsWith("sub_units")) {
        // Parse as unit file
        category = "units";
        loadedEntities = parseEntitiesFromFileToType(fileContents.slice(1), UnitModel);
    }
    if(loadedEntities) {
        entities[category] = loadedEntities;
        return entities;
    } else {
        return {};
    }
}

function parseEntitiesFromFileToType(fileLines:string[], entityConstructor: any) {
    // Iterate each line in the file.
    let tempInstance: {[property:string]: any} = {};
    const entities:{[property:string]: any} =  {};
    let mode:string[] = [];
    fileLines.forEach((line:string, index:number) => {
        // Discard comments
        line = line.indexOf("#") !== -1 ? line.substring(0, line.indexOf("#")) : line;
        // Discard empty lines
        if(!line.trim().length) {
            return;
        }
        const tokenizedLine = line.split("=").map(token => token.trim());
        if(tokenizedLine[1] === "{" && !mode.length) {
            tempInstance = {
                name: tokenizedLine[0]
            };
            mode.push("entity");
            return;
        }
        if(tokenizedLine[0] === "}" ) {
            if(mode[0] == "entity") {
                entities[tempInstance.name] = entityConstructor.from(tempInstance);
                mode.pop();
                return;
            } else if (!mode.length) {
                return;
            }
        }
        if(mode[mode.length - 1] === "resources") {
            tempInstance.resources[tokenizedLine[0]] = tokenizedLine[1];
        }
        //Special property handling?
        switch (tokenizedLine[0]) {
            case "resources":
                mode.push(tokenizedLine[0]);
                return;
        }
        const objectProperty = getPropertyMappingByParadoxName(entityConstructor, tokenizedLine[0]);
        let propertyValue:any;
        switch (objectProperty.objectPropertyType) {
            case "number":
                propertyValue = Number.parseFloat(tokenizedLine[1]);
                break;
            case "boolean":
                propertyValue = tokenizedLine[1] === "yes";
                break;
            case "string":
                propertyValue = tokenizedLine[1].substring(1, tokenizedLine[1].length - 1);
                break;
            case "InternalType":
                propertyValue = tokenizedLine[1];
                break;
            default:
                throw new Error("Didn't understand " + objectProperty.objectPropertyType);
        }
        tempInstance[objectProperty.objectPropertyName] = propertyValue;
    });
    return entities;
}