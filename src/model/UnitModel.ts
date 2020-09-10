import ModEntityModel from "./ModEntityModel";
import {GroupType} from "./GroupType";
import {ParadoxEntity} from "./decorators/ParadoxEntity";
import ParadoxProperty from "./decorators/ParadoxProperty";
import EquipmentReader from "../loaders/readers/EquipmentReader";

@ParadoxEntity("sub_units", "Sub Units", "sub_units", EquipmentReader)
export default class UnitModel extends ModEntityModel {
    public name: string;
    public sourceFilePath: string;
    @ParadoxProperty("map_icon_category", "string", {
        label: "Icon",
        inputType: "text"
    })
    private mapIconCategory: string;
    @ParadoxProperty("priority", "number", {
        label: "Priority",
        inputType: "number"
    })
    private iconPriority: string;
    @ParadoxProperty("ai_priority", "number", {
        label: "AI Priority",
        inputType: "number"
    })
    private aiIconPriority: string;
    @ParadoxProperty("active", "boolean", {
        label: "Is Active",
        inputType: "checkbox"
    })
    private active: boolean;
    @ParadoxProperty("cavalry", "boolean", {
        label: "Is Cavalry",
        inputType: "checkbox"
    })
    private isCavalry: boolean;
    @ParadoxProperty("cavalry", "boolean", {
        label: "Is Special Forces",
        inputType: "checkbox"
    })
    private isSpecialForces: boolean;
    @ParadoxProperty("marines", "boolean", {
        label: "Is Marines",
        inputType: "checkbox"
    })
    private isMarines: boolean;
    @ParadoxProperty("mountaineers", "boolean", {
        label: "Is Mountaineers",
        inputType: "checkbox"
    })
    private isMountaineers: boolean;
    @ParadoxProperty("can_be_parachuted", "boolean", {
        label: "Can Be Parachuted",
        inputType: "checkbox"
    })
    private canBeParachuted: boolean;
    @ParadoxProperty("transport", "string", {
        label: "Transport",
        inputType: "text",
        helperText: "The name of the equipment type used to determine the speed of this unit (for mechanized infantry, etc.)"
    })
    private transportEquipmentName: string;
    @ParadoxProperty("group", "GroupType", {
        label: "Group",
        inputType: "text"
    })
    private group: string;
    @ParadoxProperty("type", "InternalType", {
        label: "Type",
        inputType: "text"
    })
    private types: string;
    @ParadoxProperty("categories", "string[]", {
        label: "Categories",
        inputType: "text"
    })
    private categories: string[];
    @ParadoxProperty("essential", "string[]", {
        label: "Essential Equipment",
        inputType: "select[string]"
    })
    private essentialEquipment: string[];
    @ParadoxProperty("essential", "string[]", {
        label: "Needed Equipment",
        inputType: "select[equipment]"
    })
    private neededEquipment: string[];

    @ParadoxProperty("max_organization", "number", {
        label: "Priority",
        inputType: "number"
    })
    private maxOrganization: number;
    @ParadoxProperty("reliability", "number", {
        label: "Reliability",
        inputType: "number"
    })
    private reliability: number;
    @ParadoxProperty("weight", "number", {
        label: "weight",
        inputType: "number"
    })
    private weight: number;
    @ParadoxProperty("maximum_speed", "number", {
        label: "Maximum Speed Modifier",
        inputType: "number"
    })
    private maximumSpeedMultiplier: number;
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
    @ParadoxProperty("combat_width", "number", {
        label: "Combat Width",
        inputType: "number"
    })
    private combatWidth: number;

    @ParadoxProperty("manpower", "number", {
        label: "Manpower",
        inputType: "number"
    })
    private manpower: number;
    @ParadoxProperty("training_time", "number", {
        label: "Training Time",
        inputType: "number"
    })
    private trainingTime: number;

    @ParadoxProperty("attack", "number", {
        label: "Firepower",
        inputType: "number"
    })
    private firepower: number;
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
    @ParadoxProperty("air_attack", "number", {
        label: "Air Attack",
        inputType: "number"
    })
    private airAttack: number;
    @ParadoxProperty("ap_attack", "number", {
        label: "Armor Penetration",
        inputType: "number"
    })
    private armorPiercing: number;
    @ParadoxProperty("breakthrough", "number", {
        label: "Breakthrough",
        inputType: "number"
    })
    private breakthrough: number;

    @ParadoxProperty("defense", "number", {
        label: "Defense",
        inputType: "number"
    })
    private defense: number;
    @ParadoxProperty("max_strength", "number", {
        label: "Max Strength",
        inputType: "number"
    })
    private maxStrength: number;
    @ParadoxProperty("armor_value", "number", {
        label: "Armor",
        inputType: "number"
    })
    private armor: number;
    @ParadoxProperty("hardness", "number", {
        label: "Hardness",
        inputType: "number"
    })
    private hardness: number;
    @ParadoxProperty("entrenchment", "number", {
        label: "Entrenchment",
        inputType: "number"
    })
    private entrenchmentModifier: number;

    @ParadoxProperty("movement", "number", {
        label: "Movement",
        inputType: "number"
    })
    private movement: number;
    @ParadoxProperty("experience_loss_factor", "number", {
        label: "Experience Loss Factor",
        inputType: "number"
    })
    private experienceLossFactor: number;
    @ParadoxProperty("casualty_trickleback", "number", {
        label: "Casualty Trickleback",
        inputType: "number"
    })
    private casualtyTrickleback: number;
    @ParadoxProperty("suppression_factor", "number", {
        label: "Suppression Factor",
        inputType: "number"
    })
    private suppressionFactor: number;
    @ParadoxProperty("reliability_factor", "number", {
        label: "Reliability Factor",
        inputType: "number"
    })
    private reliabilityFactor: number;
    @ParadoxProperty("recon", "number", {
        label: "Reconnaissance",
        inputType: "number"
    })
    private reconnaissance: number;
    @ParadoxProperty("initiative", "number", {
        label: "Initiative",
        inputType: "number"
    })
    private initiative: number;

    public readonly localization_name: string;
    public readonly localization_description: string;

    private constructor(props: any) {
        super();
        for (const property in props) {
            this[property] = props[property];
        }
    }


    static from(input: object) {
        return new UnitModel(input);
    }
}