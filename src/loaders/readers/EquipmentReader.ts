import EntityReader from "./EntityReader";
import EquipmentModel from "../../model/EquipmentModel";
import EntityBuilder from "../builders/EntityBuilder";

export default class EquipmentReader extends EntityReader<EquipmentModel> {
    read(input: string): any {
        const tree = this.generateTree(input);
        return {
            "equipment": new EntityBuilder(EquipmentModel).buildFrom(tree)
        };
    }
}