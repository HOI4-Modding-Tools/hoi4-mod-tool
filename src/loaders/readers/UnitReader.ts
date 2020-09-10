import EntityReader from "./EntityReader";
import EquipmentModel from "../../model/EquipmentModel";
import EntityBuilder from "../builders/EntityBuilder";
import UnitModel from "../../model/UnitModel";

export default class UnitReader extends EntityReader<UnitModel> {
    read(input: string): any {
        const tree = this.generateTree(input);
        return {
            "units": new EntityBuilder(UnitModel).buildFrom(tree)
        };
    }
}