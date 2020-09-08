import ModEntityModel from "./ModEntityModel";
import {ParadoxEntity} from "./decorators/ParadoxEntity";
import ParadoxEntityProperty from "./ParadoxEntityProperty";
import ParadoxProperty from "./decorators/ParadoxProperty";

@ParadoxEntity("equipments")
export default class EquipmentModel extends ModEntityModel {
    public name: string;
    public sourceFilePath: string;
    @ParadoxProperty()
    private year: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("year", "number");
    @ParadoxProperty()
    private picture: ParadoxEntityProperty<string> = new ParadoxEntityProperty<string>("picture", "string");
    @ParadoxProperty()
    private isArchetype: ParadoxEntityProperty<boolean> = new ParadoxEntityProperty<boolean>("is_archetype", "boolean");
    @ParadoxProperty()
    private archetype: ParadoxEntityProperty<string> = new ParadoxEntityProperty<string>("archetype", "string");
    @ParadoxProperty()
    private isBuildable: ParadoxEntityProperty<boolean> = new ParadoxEntityProperty<boolean>("is_buildable", "boolean");
    /**
     * If this equipment can be built without requiring unlocking with a technology.
     */
    @ParadoxProperty()
    private active: ParadoxEntityProperty<boolean> = new ParadoxEntityProperty<boolean>("active", "boolean");
    @ParadoxProperty()
    private type: ParadoxEntityProperty<string> = new ParadoxEntityProperty<string>("type", "InternalType");
    @ParadoxProperty()
    private groupBy: ParadoxEntityProperty<string> = new ParadoxEntityProperty<string>("group_by", "string");
    @ParadoxProperty()
    private interfaceCategory: ParadoxEntityProperty<string> = new ParadoxEntityProperty<string>("interface_category", "string");
    @ParadoxProperty()
    private parent: ParadoxEntityProperty<string> = new ParadoxEntityProperty<string>("parent", "string");
    @ParadoxProperty()
    private priority: ParadoxEntityProperty<string> = new ParadoxEntityProperty<string>("priority", "string");
    @ParadoxProperty()
    private visualLevel: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("visual_level", "number");

    /**
     * Costs
     */
    @ParadoxProperty()
    private lendLeaseCost: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("lend_least_cost", "number");
    /**
     * How much factory output used to produce.
     */
    @ParadoxProperty()
    private buildCostIc: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("build_cost_ic", "number");
    /**
     *
     */
    @ParadoxProperty()
    private manpower: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("manpower", "number");
    @ParadoxProperty()
    private resources: ParadoxEntityProperty<{ [index: string]: number }> = new ParadoxEntityProperty<{ [index: string]: number }>("resources", "map");

    @ParadoxProperty()
    private maxOrganization: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("max_organization", "number");
    @ParadoxProperty()
    private reliability: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("reliability", "number");
    @ParadoxProperty()
    private weight: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("weight", "number");
    @ParadoxProperty()
    private maximumSpeed: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("maximum_speed", "number", 4);
    @ParadoxProperty()
    private supplyConsumption: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("supply_consumption", "number");
    @ParadoxProperty()
    private defaultMorale: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("default_morale", "number");
    /**
     * Defensive values
     */
    @ParadoxProperty()
    private defense: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("defense", "number");
    @ParadoxProperty()
    private breakthrough: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("breakthrough", "number");
    @ParadoxProperty()
    private armor: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("armor", "number");

    /**
     * Offensive values
     */
    @ParadoxProperty()
    private softAttack: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("soft_attack", "number");
    @ParadoxProperty()
    private hardAttack: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("hard_attack", "number");
    @ParadoxProperty()
    private armorPenetration: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("ap_attack", "number");
    @ParadoxProperty()
    private airAttack: ParadoxEntityProperty<number> = new ParadoxEntityProperty<number>("air_attack", "number");

    public readonly localization_name:string;
    public readonly localization_description:string;

    private constructor(props: any) {
        super();
    }


    static from(input: object) {
        return new EquipmentModel(input);
    }
}