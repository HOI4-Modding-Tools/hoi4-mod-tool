import ModDescriptor from "./ModDescriptor";
import EquipmentModel from "./EquipmentModel";

export default class ModModel {
    private readonly _descriptor:ModDescriptor;
    private readonly _equipment: {[index:string]: EquipmentModel} = {};
    public constructor(descriptor: ModDescriptor, equipment: {[index:string]: EquipmentModel}) {
        this._descriptor = descriptor;
        this._equipment = equipment;
    }

    get descriptor(){
        return this._descriptor;
    }

     get equipment(){
        return this._equipment;
     };
}