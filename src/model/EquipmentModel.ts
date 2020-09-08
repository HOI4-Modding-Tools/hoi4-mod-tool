import ModEntityModel from "./ModEntityModel";
import {ParadoxEntity} from "./decorators/ParadoxEntity";
import ParadoxEntityProperty from "./ParadoxEntityProperty";
import ParadoxProperty from "./decorators/ParadoxProperty";

@ParadoxEntity("equipments")
export default class EquipmentModel extends ModEntityModel {
    public name: string;
    public sourceFilePath: string;
    @ParadoxProperty("year", "number")
    private year: number;
    @ParadoxProperty("picture", "string")
    private picture:string
    @ParadoxProperty("is_archetype", "boolean")
    private isArchetype:boolean
    @ParadoxProperty("archetype", "string")
    private archetype:string;
    @ParadoxProperty("is_buildable", "boolean")
    private isBuildable: boolean;
    /**
     * If this equipment can be built without requiring unlocking with a technology.
     */
    @ParadoxProperty("active", "boolean")
    private active: boolean;
    @ParadoxProperty("type", "InternalType")
    private type:string;
    @ParadoxProperty("group_by", "string")
    private groupBy:string;
    @ParadoxProperty("interface_category", "string")
    private interfaceCategory:string;
    @ParadoxProperty("parent", "string")
    private parent:string;
    @ParadoxProperty("priority", "string")
    private priority: string;
    @ParadoxProperty("visual_level", "number")
    private visualLevel: number;

    /**
     * Costs
     */
    @ParadoxProperty("lend_least_cost", "number")
    private lendLeaseCost:number;
    /**
     * How much factory output used to produce.
     */
    @ParadoxProperty("build_cost_ic", "number")
    private buildCostIc: number;
    /**
     *
     */
    @ParadoxProperty("manpower", "number")
    private manpower: number;
    @ParadoxProperty( "resources", "map")
    private resources: { [index: string]: number };

    @ParadoxProperty("max_organization", "number")
    private maxOrganization:number;
    @ParadoxProperty("reliability", "number")
    private reliability: number;
    @ParadoxProperty("weight", "number")
    private weight:number;
    @ParadoxProperty("maximum_speed", "number")
    private maximumSpeed:number;
    @ParadoxProperty("supply_consumption", "number")
    private supplyConsumption: number;
    @ParadoxProperty("default_morale", "number")
    private defaultMorale: number;
    /**
     * Defensive values
     */
    @ParadoxProperty("defense", "number")
    private defense: number;
    @ParadoxProperty("breakthrough", "number")
    private breakthrough: number;
    @ParadoxProperty("armor", "number")
    private armor: number;

    /**
     * Offensive values
     */
    @ParadoxProperty("soft_attack", "number")
    private softAttack: number;
    @ParadoxProperty("hard_attack", "number")
    private hardAttack: number;
    @ParadoxProperty("ap_attack", "number")
    private armorPenetration: number;
    @ParadoxProperty("air_attack", "number")
    private airAttack: number;

    public readonly localization_name:string;
    public readonly localization_description:string;

    private constructor(props: any) {
        super();
    }


    static from(input: object) {
        return new EquipmentModel(input);
    }
}