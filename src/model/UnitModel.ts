
import ModEntityModel from "./ModEntityModel";
import {GroupType} from "./GroupType";
import {ParadoxEntity} from "./decorators/ParadoxEntity";
import ParadoxProperty from "./decorators/ParadoxProperty";

@ParadoxEntity("sub_units")
export default class UnitModel extends ModEntityModel {
    public name: string;
    public sourceFilePath: string;
    @ParadoxProperty("map_icon_category", "string")
    private mapIconCategory:string;
    @ParadoxProperty("priority", "number")
    private iconPriority:string;
    @ParadoxProperty("ai_priority", "number")
    private aiIconPriority:string;
    @ParadoxProperty("active", "boolean")
    private active:boolean;
    @ParadoxProperty("cavalry", "boolean")
    private isCavalry:boolean;
    @ParadoxProperty("cavalry", "boolean")
    private isSpecialForces:boolean;
    @ParadoxProperty("marines", "boolean")
    private isMarines:boolean;
    @ParadoxProperty("mountaineers", "boolean")
    private isMountaineers:boolean;
    @ParadoxProperty("can_be_parachuted", "boolean")
    private canBeParachuted:boolean;
    @ParadoxProperty("transport", "string")
    private transportEquipmentName:string;
    @ParadoxProperty("group", "GroupType")
    private group:string;
    @ParadoxProperty("type", "InternalType")
    private types:string;
    @ParadoxProperty("categories", "string[]")
    private categories:string[];
    @ParadoxProperty("essential", "string[]")
    private essentialEquipment:string[];
    @ParadoxProperty("essential", "string[]")
    private neededEquipment:string[];

    @ParadoxProperty("max_organization", "number")
    private maxOrganization:number;
    @ParadoxProperty("reliability", "number")
    private reliability:number;
    @ParadoxProperty("weight", "number")
    private weight:number;
    @ParadoxProperty("maximum_speed", "number")
    private maximumSpeedMultiplier:number;
    @ParadoxProperty("supply_consumption", "number")
    private supplyConsumption:number;
    @ParadoxProperty("default_morale", "number")
    private defaultMorale:number;
    @ParadoxProperty("combat_width", "number")
    private combatWidth:number;

    @ParadoxProperty("manpower", "number")
    private manpower:number;
    @ParadoxProperty("training_time", "number")
    private trainingTime:number;

    @ParadoxProperty("attack", "number")
    private firepower:number;
    @ParadoxProperty("soft_attack", "number")
    private softAttack:number;
    @ParadoxProperty("hard_attack", "number")
    private hardAttack:number;
    @ParadoxProperty("air_attack", "number")
    private airAttack:number;
    @ParadoxProperty("ap_attack", "number")
    private armorPiercing:number;
    @ParadoxProperty("breakthrough", "number")
    private breakthrough:number;

    @ParadoxProperty("defense", "number")
    private defense:number;
    @ParadoxProperty("max_strength", "number")
    private maxStrength:number;
    @ParadoxProperty("armor_value", "number")
    private armor:number;
    @ParadoxProperty("hardness", "number")
    private hardness:number;
    @ParadoxProperty("entrenchment", "number")
    private entrenchmentModifier:number;

    @ParadoxProperty("movement", "number")
    private movement:number;
    @ParadoxProperty("experience_loss_factor", "number")
    private experienceLossFactor:number;
    @ParadoxProperty("casualty_trickleback", "number")
    private casualtyTrickleback:number;
    @ParadoxProperty("suppression_factor", "number")
    private suppressionFactor:number;
    @ParadoxProperty("reliability_factor", "number")
    private reliabilityFactor:number;
    @ParadoxProperty("recon", "number")
    private reconnaissance:number;
    @ParadoxProperty("initiative", "number")
    private initiative:number;

    public readonly localization_name: string;
    public readonly localization_description:string;

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