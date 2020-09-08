
import ModEntityModel from "./ModEntityModel";
import {GroupType} from "./GroupType";
import {ParadoxEntity} from "./decorators/ParadoxEntity";
import ParadoxEntityProperty from "./ParadoxEntityProperty";

@ParadoxEntity("sub_units")
export default class UnitModel extends ModEntityModel {
    public name: string;
    public sourceFilePath: string;
    private mapIconCategory:ParadoxEntityProperty<string> =new ParadoxEntityProperty<string>(this, "map_icon_category", "string")
    private iconPriority:ParadoxEntityProperty<string> =new ParadoxEntityProperty<string>(this, "priority", "number");
    private aiIconPriority:ParadoxEntityProperty<string> =new ParadoxEntityProperty<string>(this, "ai_priority", "number");
    private active:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>(this, "active", "boolean");
    private isCavalry:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>(this, "cavalry", "boolean");
    private isSpecialForces:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>(this, "cavalry", "boolean");
    private isMarines:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>(this, "marines", "boolean");
    private isMountaineers:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>(this, "mountaineers", "boolean");
    private canBeParachuted:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>(this, "can_be_parachuted", "boolean");
    private transportEquipmentName:ParadoxEntityProperty<string> =new ParadoxEntityProperty<string>(this, "transport", "string");
    private group:ParadoxEntityProperty<GroupType> =new ParadoxEntityProperty<GroupType>(this, "group", "GroupType");
    private types:ParadoxEntityProperty<string> =new ParadoxEntityProperty<string>(this, "type", "InternalType");
    private categories:ParadoxEntityProperty<string[]> =new ParadoxEntityProperty<string[]>(this, "categories", "string[]");
    private essentialEquipment:ParadoxEntityProperty<string[]> =new ParadoxEntityProperty<string[]>(this, "essential", "string[]");
    private neededEquipment:ParadoxEntityProperty<string[]> =new ParadoxEntityProperty<string[]>(this, "essential", "string[]");

    private maxOrganization:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "max_organization", "number");
    private reliability:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "reliability", "number");
    private weight:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "weight", "number");
    private maximumSpeedMultiplier:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "maximum_speed", "number");
    private supplyConsumption:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "supply_consumption", "number");
    private defaultMorale:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "default_morale", "number");
    private combatWidth:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "combat_width", "number");

    private manpower:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "manpower", "number");
    private trainingTime:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "training_time", "number");

    private firepower:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "attack", "number");
    private softAttack:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "soft_attack", "number");
    private hardAttack:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "hard_attack", "number");
    private airAttack:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "air_attack", "number");
    private armorPiercing:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "ap_attack", "number");
    private breakthrough:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "breakthrough", "number");

    private defense:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "defense", "number");
    private maxStrength:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "max_strength", "number");
    private armor:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "armor_value", "number");
    private hardness:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "hardness", "number");
    private entrenchmentModifier:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "entrenchment", "number");

    private movement:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "movement", "number");
    private experienceLossFactor:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "experience_loss_factor", "number");
    private casualtyTrickleback:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "casualty_trickleback", "number");
    private suppressionFactor:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "suppression_factor", "number");
    private reliabilityFactor:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "reliability_factor", "number");
    private reconnaissance:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "recon", "number");
    private initiative:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>(this, "initiative", "number");

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