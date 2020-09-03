import "reflect-metadata";
import * as util from "util";

const paradoxProperty = Symbol("paradoxPropertyFormat");

export function HasParadoxPropertyFormat(paradoxPropertyName: string, templateGenerator?: (target:any)=>string): any {
    const template = templateGenerator || util.format("%s=%s", paradoxPropertyName)
    return Reflect.metadata(paradoxProperty, template);
}

export function getParadoxPropertyFormat(target: any, propertyKey: string) {
    const template = Reflect.getMetadata(paradoxProperty, target, propertyKey);
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
