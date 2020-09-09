import ModEntityModel from "./ModEntityModel";
import {ParadoxEntity} from "./decorators/ParadoxEntity";
import ParadoxProperty from "./decorators/ParadoxProperty";

@ParadoxEntity("equipment", "Equipment")
export default class EquipmentModel extends ModEntityModel {
    public name: string;
    public sourceFilePath: string;
    @ParadoxProperty("year", "number", {
        label: "Year",
        inputType: "text"
    })
    private year: number;
    @ParadoxProperty("picture", "string", {
        label: "Picture",
        inputType: "text"
    })
    private picture: string
    @ParadoxProperty("is_archetype", "boolean", {
        label: "Is Archetype",
        inputType: "checkbox"
    })
    private isArchetype: boolean
    @ParadoxProperty("archetype", "string", {
        label: "Archetype",
        inputType: "text"
    })
    private archetype: string;
    @ParadoxProperty("is_buildable", "boolean", {
        label: "Is Buildable",
        inputType: "checkbox"
    })
    private isBuildable: boolean;
    /**
     * If this equipment can be built without requiring unlocking with a technology.
     */
    @ParadoxProperty("active", "boolean", {
        label: "IS Active",
        inputType: "checkbox"
    })
    private active: boolean;
    @ParadoxProperty("type", "InternalType", {
        label: "Type",
        inputType: "text"
    })
    private type: string;
    @ParadoxProperty("group_by", "string", {
        label: "Group By",
        inputType: "select[string]",
        options: ["archetype", "type"]
    })
    private groupBy: string;
    @ParadoxProperty("interface_category", "string", {
        label: "Interface Category",
        inputType: "text"
    })
    private interfaceCategory: string;
    @ParadoxProperty("parent", "string", {
        label: "Parent",
        inputType: "text"
    })
    private parent: string;
    @ParadoxProperty("priority", "string", {
        label: "Priority",
        inputType: "number"
    })
    private priority: string;
    @ParadoxProperty("visual_level", "number", {
        label: "Visual Level",
        inputType: "number"
    })
    private visualLevel: number;

    /**
     * Costs
     */
    @ParadoxProperty("lend_least_cost", "number", {
        label: "Lend-Lease Cost",
        inputType: "number"
    })
    private lendLeaseCost: number;
    /**
     * How much factory output used to produce.
     */
    @ParadoxProperty("build_cost_ic", "number", {
        label: "Build Cost",
        inputType: "number"
    })
    private buildCostIc: number;
    /**
     *
     */
    @ParadoxProperty("manpower", "number", {
        label: "Manpower",
        inputType: "number"
    })
    private manpower: number;
    @ParadoxProperty("resources", "map", {
        label: "Resources",
        inputType: "map[number]"
    })
    private resources: { [index: string]: number };

    @ParadoxProperty("max_organization", "number", {
        label: "Max Organization",
        inputType: "number"
    })
    private maxOrganization: number;
    @ParadoxProperty("reliability", "number", {
        label: "Reliability",
        inputType: "number"
    })
    private reliability: number;
    @ParadoxProperty("weight", "number", {
        label: "Weight",
        inputType: "number"
    })
    private weight: number;
    @ParadoxProperty("maximum_speed", "number", {
        label: "Max Speed",
        inputType: "number"
    })
    private maximumSpeed: number;
    @ParadoxProperty("supply_consumption", "number", {
        label: "Supply Consumption",
        inputType: "number"
    })
    private supplyConsumption: number;
    @ParadoxProperty("default_morale", "number", {
        label: "Default Morale",
        inputType: "number"
    })
    private defaultMorale: number;
    /**
     * Defensive values
     */
    @ParadoxProperty("defense", "number", {
        label: "Defense",
        inputType: "number"
    })
    private defense: number;
    @ParadoxProperty("breakthrough", "number", {
        label: "Breakthrough",
        inputType: "number"
    })
    private breakthrough: number;
    @ParadoxProperty("armor", "number", {
        label: "Armor",
        inputType: "number"
    })
    private armor: number;

    /**
     * Offensive values
     */
    @ParadoxProperty("soft_attack", "number", {
        label: "Soft Attack",
        inputType: "number"
    })
    private softAttack: number;
    @ParadoxProperty("hard_attack", "number", {
        label: "Hard Attack",
        inputType: "number"
    })
    private hardAttack: number;
    @ParadoxProperty("ap_attack", "number", {
        label: "Armor Penetration",
        inputType: "number"
    })
    private armorPenetration: number;
    @ParadoxProperty("air_attack", "number", {
        label: "Air Attack",
        inputType: "number"
    })
    private airAttack: number;

    public readonly localization_name: string;
    public readonly localization_description: string;

    private constructor(props: any) {
        super();
    }


    static from(input: object) {
        return new EquipmentModel(input);
    }
}