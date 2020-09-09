import "reflect-metadata";
import * as util from "util";
import ModModel from "../ModModel";

export default function ParadoxProperty(paradoxPropertyName:string, paradoxPropertyType: string, uiConfig: { label:string, helperText?: string, inputType: string, options?:any[]}) {
    return (target: any, property: string) => {
        let propertyMappings = Reflect.getMetadata("ParadoxProperties", target.constructor);
        if (!propertyMappings) {
            propertyMappings = {};
            Reflect.defineMetadata("ParadoxProperties", propertyMappings, target.constructor);
        }
        propertyMappings[paradoxPropertyName] = property;
        propertyMappings[property] = paradoxPropertyName;

        let typeMappings = Reflect.getMetadata("ParadoxFieldTypes", target.constructor);
        if(!typeMappings) {
            typeMappings = {};
            Reflect.defineMetadata("ParadoxFieldTypes", typeMappings, target.constructor);
        }
        typeMappings[property] = paradoxPropertyType;
        typeMappings[paradoxPropertyName] = paradoxPropertyType;

        let entityProperties = Reflect.getMetadata("EntityProperties", target.constructor);
        if(!entityProperties) {
            entityProperties = {};
            Reflect.defineMetadata("EntityProperties", entityProperties, target.constructor);
        }

        entityProperties[property] = {
            fieldName: property,
            propertyName: paradoxPropertyName,
            type: paradoxPropertyType,
            uiConfig
        }
    }
}

/**
 * Give a field name to get the paradox property name, or vice versa.
 * @param field
 * @param target
 */
export function getMappingForField(field:string, constructor: any) {
    const propertyMappings = Reflect.getMetadata("ParadoxProperties", constructor);
    return propertyMappings[field];
}

export function getParadoxTypeForfield(field:string, constructor: any):string {
    const typeMappings = Reflect.getMetadata("ParadoxFieldTypes", constructor);

    return typeof typeMappings[field] === "string" ? typeMappings[field] : undefined;
}

export function convertValueToParadoxString(value: any, paradoxType: string) {
    if (value === undefined) {
        return undefined;
    }
    switch (paradoxType) {
        case "string":
            return util.format("\"%s\"", value)
            return value;
        case "boolean":
            return value == true ? "yes" : "no";
        default:
            return value.toString();
    }
}

export function parseParadoxString(value: any, paradoxType: string) {
    switch (paradoxType) {
        case "number":
            return Number.parseFloat(value);
            break;
        case "boolean":
            return value === "yes";
            break;
        case "string":
            return value.substring(1, value.length - 1);
            break;
        case "InternalType":
            return value;
            break;
        default:
            throw new Error("Didn't understand " + paradoxType);
    }
}

export function getPropertiesForEntity(entity:any):{[property:string]: any} {
    return Reflect.getMetadata("EntityProperties", entity);
}