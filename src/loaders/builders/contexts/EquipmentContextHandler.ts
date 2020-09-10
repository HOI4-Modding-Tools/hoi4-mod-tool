import {
    getMappingForField,
    getPropertiesForEntity,
    parseParadoxString
} from "../../../model/decorators/ParadoxProperty";
import EquipmentModel from "../../../model/EquipmentModel";

export default {
    "equipments": function (token:string) {
        this.workingInstance.name = token;
        this.currentContext.push("body");
        return ["{", "="];
    },
    "equipments:body": function (token:string) {
         const equipmentProperties = getPropertiesForEntity(EquipmentModel);
         const fieldName = getMappingForField(token, EquipmentModel);
         if(Object.keys(equipmentProperties).includes(fieldName)) {
             this.currentContext.push("property", {propertyName: token, propertyType: equipmentProperties[fieldName].type});
             return ["="];
         }
    },
    "equipments:body:end": function () {
        this.entities[this.workingInstance.name] = EquipmentModel.from(this.workingInstance);
        return null;
    },
    "equipments:body:property": function (token:string, context: any) {
        console.log("Setting property", context.propertyName);
        this.workingInstance[getMappingForField(context.propertyName, EquipmentModel)] = parseParadoxString(token, context.propertyType);
        this.currentContext.pop();
        return null;
    }
}