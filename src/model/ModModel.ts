import ModDescriptor from "./ModDescriptor";
import EquipmentModel from "./EquipmentModel";
import UnitModel from "./UnitModel";

export default class ModModel {
    private _descriptor:ModDescriptor;
    private readonly _equipment: {[index:string]: EquipmentModel} = {};
    private readonly _units: {[index:string]: UnitModel} = {};
    public constructor(descriptor: ModDescriptor, equipment: {[index:string]: EquipmentModel},
                       units:{[index:string]: UnitModel}) {
        this._descriptor = descriptor;
        this._equipment = equipment;
        this._units = units;
    }

    get descriptor(){
        return this._descriptor;
    }

    set descriptor(newDescriptor: ModDescriptor) {
        this._descriptor = newDescriptor;
    }

     get equipment(){
        return this._equipment;
     }

     get units() {
        return this._units;
     }

     // asSimpleObject() {
     //    const object: {[property:string] : any} = {};
     //    for(const property of ["_equipment", "_units"]) {
     //        switch (typeof this[property]) {
     //            case "object":
     //                object[property] = {};
     //                for(const objectProperty in this[property]) {
     //                    const myPropertyValue = (<any>this[property][objectProperty]);
     //                    object[property][objectProperty] = myPropertyValue.asSimpleObject();
     //                }
     //                break;
     //            default:
     //                object[property] = this[property];
     //        }
     //    }
     //    object._descriptor = this._descriptor;
     //    return object;
     // }
}