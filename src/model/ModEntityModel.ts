import * as os from "os";
import {getMappingForField, getParadoxTypeForfield, getPropertiesForEntity} from "./decorators/ParadoxProperty";
import * as util from "util";
import {getFilePrefixForEntity} from "./decorators/ParadoxEntity";

export default abstract class ModEntityModel {
    private _lineMappings = {};

    constructor(props) {
        for(const property in props) {
            this[property] = props[property];
        }
    }

    toParadoxFormat() {
        let fileContent = "";
        fileContent += this.name + " = {" + os.EOL;
        const paradoxProperties = getPropertiesForEntity(this.constructor);
        for (const property in paradoxProperties) {
            const propertyDef = paradoxProperties[property];
            if(this[propertyDef.fieldName] !== undefined) {
                fileContent += "\t\t" + util.format("%s = %s", propertyDef.propertyName, this[propertyDef.fieldName])
            }
        }
        fileContent += "}";
        return fileContent;
    }

    updateFrom(object: any) {
        for (const property in object) {
            if(getMappingForField(property, this.constructor)) {
                this[property] = object[property];
            }
        }
        return this;
    }

    abstract get name(): string;

    /**
     * The path to the file where this file
     */
    abstract get sourceFilePath(): string;

    get lineMappings() {
        return this._lineMappings;
    }
}