import {InternalType} from "./InternalTypes";
import ModEntityModel from "./ModEntityModel";
import * as util from "util";
import {ParadoxProperty} from "./decorators/ParadoxProperty";
import * as os from "os";
import * as _ from "lodash";
import {ParadoxEntity} from "./decorators/ParadoxEntity";

@ParadoxEntity("equipments")
export default class EquipmentModel extends ModEntityModel {
    public name: string;
    @ParadoxProperty("year", "number")
    private year: number;
    @ParadoxProperty("picture", "string")
    private picture: string;
    @ParadoxProperty("is_archetype", "boolean")
    private isArchetype: boolean;
    @ParadoxProperty("archetype", "string")
    private archetype: string;
    @ParadoxProperty("is_buildable", "boolean")
    private isBuildable: boolean;
    /**
     * If this equipment can be built without requiring unlocking with a technology.
     */
    @ParadoxProperty("active", "boolean")
    private active: boolean;
    @ParadoxProperty("type", "InternalType")
    private type: InternalType;
    @ParadoxProperty("group_by", "string")
    private groupBy: string;
    @ParadoxProperty('interface_category', "string")
    private interfaceCategory: string;
    @ParadoxProperty("parent", "string")
    private parent: string;
    @ParadoxProperty("priority", "string")
    private priority: string;
    @ParadoxProperty("visual_level", "string")
    private visualLevel: string;

    /**
     * Costs
     */
    @ParadoxProperty("lend_lease_cost", "number")
    private lendLeaseCost: number;
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
    @ParadoxProperty("resources", "map",(target: any)=>{
        if(_.isEmpty(target.resources)) {
            return "";
        }
       return "{" + os.EOL +
           Object.keys(target.resources).map(resource => {
               return util.format("%s=\"%s\"", resource, target.resources[resource]);
           })
           + "}" + os.EOL;
    })
    private resources: Map<string, number> = new Map<string, number>();

    @ParadoxProperty("max_organization", "number")
    private maxOrganization: number;
    @ParadoxProperty("reliability", "number")
    private reliability: number;
    @ParadoxProperty("weight", "number")
    private weight: number;
    @ParadoxProperty("maximum_speed", "number")
    private maximumSpeed: number = 4;
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

    public readonly localization_name: string;
    public readonly localization_description:string;

    private constructor(props: any) {
        super();
        for (const property in props) {
            this[property] = props[property];
        }
    }


    static from(input: object) {
        return new EquipmentModel(input);
    }
}