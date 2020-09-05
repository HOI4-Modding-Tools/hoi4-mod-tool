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
    let loadedEntity;
    if(fileContents[0].startsWith("equipments")) {
        // Parse as equipment file
        category = "equipment";
        loadedEntity = parseFileIntoType(fileContents.slice(1), EquipmentModel);
    } else if(fileContents[0].startsWith("sub_units")) {
        // Parse as unit file
        category = "units";
        loadedEntity = parseFileIntoType(fileContents.slice(1), UnitModel);
    }
    if(loadedEntity) {
        entities[category] = {
            [loadedEntity.name]: loadedEntity
        }
        return entities;
    } else {
        return {};
    }
}

function parseFileIntoType(fileLines:string[], entityConstructor: any) {
    // Iterate each line in the file.
    let tempInstance: {[property:string]: any} = {};
    let mode:string[] = [];
    fileLines.forEach((line:string, index:number) => {
        const tokenizedLine = line.split("=").map(token => token.trim());
        if(index == 0) {
            tempInstance.name = tokenizedLine[0];
            return;
        }
        if(tokenizedLine[0] === "}" && mode.length == 0) {
            return;
        }
        const objectProperty = getPropertyMappingByParadoxName(entityConstructor, tokenizedLine[0]);
        //Special property handling?
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
    return entityConstructor.from(tempInstance);
}