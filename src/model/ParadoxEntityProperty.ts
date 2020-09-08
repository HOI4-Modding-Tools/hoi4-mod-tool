import {ParadoxPropertyType} from "./ParadoxPropertyType";
import * as util from "util";
import {convertValueToParadoxString} from "./decorators/ParadoxProperty";
import ModEntityModel from "./ModEntityModel";

export default class ParadoxEntityProperty<T> {
    public value: T;
    public fieldName:string;
    public line: number;
    public readonly paradoxPropertyName: string;
    public readonly paradoxPropertyType: ParadoxPropertyType;
    private parent:ModEntityModel;

    constructor(parent: ModEntityModel, paradoxPropertyName: string, paradoxPropertyType: ParadoxPropertyType, defaultValue?: T) {
        this.parent = parent;
        this.paradoxPropertyName = paradoxPropertyName;
        this.paradoxPropertyType = paradoxPropertyType;
        this.value = defaultValue;
    }

    public toParadoxFormat(): string {
        return util.format("%s = %s", this.parent.getParadoxPropertyForField(this.fieldName) , convertValueToParadoxString(this.value, this.paradoxPropertyType));
    }
}