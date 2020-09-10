import * as os from "os";
import {getMappingForField, getParadoxTypeForfield} from "./decorators/ParadoxProperty";

export default abstract class ModEntityModel {
    private _lineMappings = {};

    constructor(props) {
        for(const property in props) {
            this[property] = props[property];
        }
    }

    toParadoxFormat() {
        let fileContent = "";
        const paradoxEntityCategory = Reflect.getMetadata("ParadoxEntityCategory", this.constructor);
        fileContent += paradoxEntityCategory + " = {" + os.EOL +
            "\t{";
        const paradoxProperties = Reflect.getMetadata("ParadoxProperties", this.constructor);
        for (const property of paradoxProperties) {
            const field = this[property];
            if (field.value) {
                fileContent += field.toParadoxFormat();
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