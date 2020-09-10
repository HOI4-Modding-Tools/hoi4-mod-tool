import {
    getMappingForField,
    getPropertiesForEntity,
    parseParadoxString
} from "../../../model/decorators/ParadoxProperty";
import EquipmentModel from "../../../model/EquipmentModel";
import * as _ from "lodash";

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
    "equipments:body:property": function (token:string, context: any, parserContext: any) {
        console.log("Setting property", context.propertyName);
        this.workingInstance[getMappingForField(context.propertyName, EquipmentModel)] = parseParadoxString(token, context.propertyType);
        this.currentContext.pop();
        _.set(this.workingInstance, ["_lineMappings", getMappingForField(context.propertyName, EquipmentModel)], parserContext.start.line);
        return null;
    }
}