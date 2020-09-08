import * as fs from "fs";
import * as path from "path";
import EquipmentModel from "./model/EquipmentModel";
import UnitModel from "./model/UnitModel";
import * as _ from "lodash";
import ParadoxEntityProperty from "./model/ParadoxEntityProperty";
import {getMappingForField, getParadoxTypeForfield, parseParadoxString} from "./model/decorators/ParadoxProperty";

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
        loadedEntities = parseEntitiesFromFileToType(filePath, fileContents.slice(1), EquipmentModel);
    } else if(fileContents[0].startsWith("sub_units")) {
        // Parse as unit file
        category = "units";
        loadedEntities = parseEntitiesFromFileToType(filePath, fileContents.slice(1), UnitModel);
    }
    if(loadedEntities) {
        entities[category] = loadedEntities;
        return entities;
    } else {
        return {};
    }
}

function parseEntitiesFromFileToType(filePath:string, fileLines:string[], entityConstructor: any) {
    // Iterate each line in the file.
    let workingInstance: {[property:string]: any};
    const entities:{[property:string]: any} =  {};
    let mode:string[] = [];
    fileLines.forEach((line:string, lineNumber:number) => {
        // Discard comments
        line = line.indexOf("#") !== -1 ? line.substring(0, line.indexOf("#")) : line;
        // Discard empty lines
        if(!line.trim().length) {
            return;
        }
        const tokenizedLine = line.split("=").map(token => token.trim());
        if(tokenizedLine[1] === "{" && !mode.length) {
            workingInstance = new entityConstructor()
            workingInstance.name = tokenizedLine[0];
            workingInstance.sourceFilePath = filePath;
            mode.push("entity");
            return;
        }
        if(tokenizedLine[0] === "}" ) {
            if(mode[0] == "entity") {
                entities[workingInstance.name] = workingInstance;
                workingInstance = null;
                mode.pop();
                return;
            } else if (!mode.length) {
                return;
            }
        }
        if(mode[mode.length - 1] === "resources") {
            workingInstance.resources[tokenizedLine[0]] = tokenizedLine[1];
        }
        //Special property handling?
        switch (tokenizedLine[0]) {
            case "resources":
                mode.push(tokenizedLine[0]);
                return;
        }
        const fieldName = getMappingForField(tokenizedLine[0], entityConstructor);
        const fieldParadoxType = getParadoxTypeForfield(fieldName, entityConstructor);
        workingInstance[fieldName] = parseParadoxString(tokenizedLine[1], fieldParadoxType);
        workingInstance.lineMappings[fieldName] = lineNumber + 1;
    });
    return entities;
}