import {ParadoxPropertyType} from "./ParadoxPropertyType";
import * as util from "util";
import {convertValueToParadoxString} from "./decorators/ParadoxProperty";

export default class ParadoxEntityProperty<T> {
    public value: T;
    public line: number;
    public readonly paradoxPropertyName: string;
    public readonly paradoxPropertyType: ParadoxPropertyType;

    constructor(paradoxPropertyName: string, paradoxPropertyType: ParadoxPropertyType, defaultValue?: T) {
        this.paradoxPropertyName = paradoxPropertyName;
        this.paradoxPropertyType = paradoxPropertyType;
        this.value = defaultValue;
    }

    public toParadoxFormat(): string {
        return convertValueToParadoxString(this.value, this.paradoxPropertyType)
    }
}