import "reflect-metadata";
import * as util from "util";
export default function ParadoxProperty() {
    return (target:any, property:string) => {
        const paradoxProperties:string[] = Reflect.getMetadata("ParadoxProperties", target.constructor);
        if(paradoxProperties) {
            paradoxProperties.push(property);
        } else {
            Reflect.defineMetadata("ParadoxProperties", [property], target.constructor);
        }
    }
}

export function convertValueToParadoxString(value: any, paradoxType: string) {
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