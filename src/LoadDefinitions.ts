import * as fs from "fs";
import * as path from "path";
import EquipmentModel from "./model/EquipmentModel";
import UnitModel from "./model/UnitModel";
import * as _ from "lodash";
import {getMappingForField, getParadoxTypeForfield, parseParadoxString} from "./model/decorators/ParadoxProperty";
import {
    getConstructorForEntityWithName,
    getEntityNameForFilePrefix,
    getReaderForEntity
} from "./model/decorators/ParadoxEntity";
import EntityReader from "./loaders/readers/EntityReader";

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
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parserToUse:any = determineParserFromFileContents(fileContent);
    const entities = {};
    let category;
    if(parserToUse) {
        const loaded = new parserToUse().read(fileContent);
        for(const category in loaded) {
            for(const entity in loaded[category]) {
                loaded[category][entity].sourceFilePath = filePath;
            }
        }
        return _.merge(entities, loaded);
    }
    return entities;
}
function determineParserFromFileContents(content: string): Function | undefined {
    const readerConstructor = getReaderForEntity(getConstructorForEntityWithName(getEntityNameForFilePrefix(content))); 
    return readerConstructor;
}