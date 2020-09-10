import "reflect-metadata";
import ModModel from "../ModModel";
import * as _ from "lodash";

export function ParadoxEntity(typeName: string, displayName: string, filePrefix: string, reader: Function) {
    return (target) => {
        Reflect.defineMetadata("ParadoxEntityCategory", typeName, target);
        let paradoxEntities: { [entityName: string]: EntityMetadata } = Reflect.getMetadata("ParadoxEntities", ModModel);
        if (!paradoxEntities) {
            paradoxEntities = {};
            Reflect.defineMetadata("ParadoxEntities", paradoxEntities, ModModel);
        }
        paradoxEntities[typeName] = {
            entityName: typeName,
            displayName,
            constructor: target,
            filePrefix,
            reader
        };
    }
}

type EntityMetadata = {
    entityName?: string,
    displayName?: string,
    constructor?: Function,
    filePrefix?: string,
    reader?: Function
}

function findEntity(propertyToMatch: string, value: any, customMatcher?: (entityValue: any, valueToCompare: any) => boolean): EntityMetadata {
    const entityMetadata = Reflect.getMetadata("ParadoxEntities", ModModel);
    if (entityMetadata) {
        return Object.keys(entityMetadata).map(name => entityMetadata[name])
            .find(entity => {
                const entityPropertyValue = _.get(entity, propertyToMatch);
                return customMatcher ? customMatcher(entityPropertyValue, value) : entityPropertyValue === value;
            }) || {};
    }
    return {};
}

export function getEntities(): { [type: string]: Function } {
    return Reflect.getMetadata("ParadoxEntities", ModModel);
}

export function getReaderForEntity(entity: Function): Function {
    return findEntity("constructor", entity).reader;
}

export function getEntityNameForFilePrefix(content: string) {
    return findEntity("filePrefix", content, function (filePrefix) {
        return content.trim().startsWith(filePrefix);
    }).entityName;
}

export function getFilePrefixForEntity(constructor: Function) {
    return findEntity("constructor", constructor).filePrefix;
}

export function getConstructorForEntityWithName(entityName: string) {
    return findEntity("entityName", entityName).constructor;
}