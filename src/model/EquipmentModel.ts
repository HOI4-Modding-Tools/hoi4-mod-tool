import {InternalType} from "./InternalTypes";
import ModEntityModel from "./ModEntityModel";
import * as util from "util";
import {getParadoxPropertyFormat, HasParadoxPropertyFormat} from "./decorators/HasParadoxPropertyFormat";
import * as os from "os";
import * as _ from "lodash";

export default class EquipmentModel extends ModEntityModel {
    private name: string;
    @HasParadoxPropertyFormat("year")
    private year: number;
    @HasParadoxPropertyFormat("picture")
    private picture: string;
    @HasParadoxPropertyFormat("is_archetype")
    private isArchetype: boolean;
    @HasParadoxPropertyFormat("archetype")
    private archetype: string;
    @HasParadoxPropertyFormat("is_buildable")
    private isBuildable: boolean = false;
    /**
     * If this equipment can be built without requiring unlocking with a technology.
     */
    @HasParadoxPropertyFormat("active")
    private active: boolean;
    @HasParadoxPropertyFormat("type")
    private type: InternalType;
    @HasParadoxPropertyFormat("group_by")
    private groupBy: string;
    @HasParadoxPropertyFormat('interface_category')
    private interfaceCategory: string;
    @HasParadoxPropertyFormat("parent")
    private parent: string;
    @HasParadoxPropertyFormat("priority")
    private priority: string;
    @HasParadoxPropertyFormat("visual_level")
    private visualLevel: string;

    /**
     * Costs
     */
    //@HasParadoxPropertyFormat("lend_lease_cost")
    private lendLeaseCost: number;
    /**
     * How much factory output used to produce.
     */
    //@HasParadoxPropertyFormat("build_cost_ic")
    private buildCostIc: number;
    /**
     *
     */
    //@HasParadoxPropertyFormat("manpower")
    private manpower: number;
    @HasParadoxPropertyFormat("resources",(target: any)=>{
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

    @HasParadoxPropertyFormat("max_organization")
    private maxOrganization: number;
    @HasParadoxPropertyFormat("reliability")
    private reliability: number;
    @HasParadoxPropertyFormat("weight")
    private weight: number;
    @HasParadoxPropertyFormat("maximum_speed")
    private maximumSpeed: number = 4;
    @HasParadoxPropertyFormat("supply_consumption")
    private supplyConsumption: number;
    @HasParadoxPropertyFormat("default_morale")
    private defaultMorale: number;
    /**
     * Defensive values
     */
    @HasParadoxPropertyFormat("defense")
    private defense: number;
    @HasParadoxPropertyFormat("breakthrough")
    private breakthrough: number;
    @HasParadoxPropertyFormat("armor")
    private armor: number;

    /**
     * Offensive values
     */
    @HasParadoxPropertyFormat("soft_attack")
    private softAttack: number;
    @HasParadoxPropertyFormat("hard_attack")
    private hardAttack: number;
    @HasParadoxPropertyFormat("ap_attack")
    private armorPenetration: number;
    @HasParadoxPropertyFormat("air_attack")
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

    toParadoxFormat(): string {
        let outputString = "";
        for(const property in this) {
            const paradoxPropertyFormat = getParadoxPropertyFormat(this, property)
            if(paradoxPropertyFormat) {
                outputString += "\t\t" + paradoxPropertyFormat + os.EOL;
            }
        }

        return "equipments = {" + os.EOL +
           "\t" + this.name + " = {" + os.EOL +
            outputString +
                "\t}" + os.EOL +
            "}";
    }
}