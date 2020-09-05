import "reflect-metadata";
import * as util from "util";

const paradoxPropertyTemplate = Symbol("propertyTemplate");


export function ParadoxProperty(paradoxPropertyName: string, objectPropertyType: string, templateGenerator?: (target:any)=>string): any {
    const template = templateGenerator || util.format("%s=%s", paradoxPropertyName)
    return (target, property) => {
        Reflect.defineMetadata(paradoxPropertyTemplate, template, target, property);
        let paradoxProperties = Reflect.getMetadata("paradoxProperties", target.constructor);
        if(paradoxProperties === undefined) {
            paradoxProperties = [];
            Reflect.defineMetadata("paradoxProperties", paradoxProperties, target.constructor);
        }
        paradoxProperties.push({paradoxPropertyName, objectPropertyName: property, objectPropertyType});
    }
}

export function getParadoxPropertyFormat(target: any, propertyKey: string) {
    const template = Reflect.getMetadata(paradoxPropertyTemplate, target, propertyKey);
    if(typeof template === "function") {
        return template(target, propertyKey);
    } else if(template !== undefined) {
        let replacementValue;
        switch (typeof target[propertyKey]) {
            case "boolean":
                replacementValue = target[propertyKey] ? "yes" : "no";
                break;
            case "number":
                replacementValue = target[propertyKey].toFixed(2);
                break;
            default:
                replacementValue = util.format("\"%s\"", target[propertyKey]);
                break;
        }
        return util.format(template, replacementValue);
    }
}

/**
 * Returns an object containing the paradox property name (the name of the property as it is found inside a file)
 * and the object property name.
 * @param target    The target model object
 * @param property  The paradox property name.
 */
export function getPropertyMappingByParadoxName(target: any, property: string) {
    const mappings = Reflect.getMetadata("paradoxProperties", target);
    return mappings.find(mapping => mapping.paradoxPropertyName === property);
}

export function getPropertyMappingByObjectName(target: any, property: string) {
    const mappings = Reflect.getMetadata("paradoxProperties", target);
    return mappings.find(mapping => mapping.objectPropertyName === property);
}

export function getParadoxPropertiesForType(target: Function):any {
    return Reflect.getMetadata("paradoxProperties", target);
}