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
            _.merge(existingDefinitions, readFile(path.join(directory, fileName));
        }

    }
    return existingDefinitions;
}

function readFile(filePath: string): any {
    const fileContents:string[] = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

    if(fileContents[0].startsWith("equipments")) {
        // Parse as equipment file
        parseFileIntoType(fileContents.slice(1), EquipmentModel);
    } else if(fileContents[0].startsWith("sub_units")) {
        // Parse as unit file
        parseFileIntoType(fileContents.slice(1), UnitModel);
    }
}

function parseFileIntoType(fileLines:string[], entityConstructor: any) {
    // Iterate each line in the file.
    let tempInstance: {[property:string]: any} = {};
    fileLines.forEach((line:string, index:number) => {
        const tokenizedLine = line.split("=").map(token => token.trim());
        if(index == 0) {
            tempInstance.name = tokenizedLine[0];
            return;
        }
        if(tokenizedLine[0] === "}") {
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
            default:
                propertyValue = tokenizedLine[1];
                break;
        }
        tempInstance[objectProperty.objectPropertyName] = propertyValue;
    });
    return entityConstructor.From(tempInstance);
}