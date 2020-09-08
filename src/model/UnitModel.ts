
import ModEntityModel from "./ModEntityModel";
import {GroupType} from "./GroupType";
import {ParadoxEntity} from "./decorators/ParadoxEntity";
import ParadoxEntityProperty from "./ParadoxEntityProperty";

@ParadoxEntity("sub_units")
export default class UnitModel extends ModEntityModel {
    public name: string;
    public sourceFilePath: string;
    private mapIconCategory:ParadoxEntityProperty<string> =new ParadoxEntityProperty<string>("map_icon_category", "string")
    private iconPriority:ParadoxEntityProperty<string> =new ParadoxEntityProperty<string>("priority", "number");
    private aiIconPriority:ParadoxEntityProperty<string> =new ParadoxEntityProperty<string>("ai_priority", "number");
    private active:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>("active", "boolean");
    private isCavalry:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>("cavalry", "boolean");
    private isSpecialForces:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>("cavalry", "boolean");
    private isMarines:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>("marines", "boolean");
    private isMountaineers:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>("mountaineers", "boolean");
    private canBeParachuted:ParadoxEntityProperty<boolean> =new ParadoxEntityProperty<boolean>("can_be_parachuted", "boolean");
    private transportEquipmentName:ParadoxEntityProperty<string> =new ParadoxEntityProperty<string>("transport", "string");
    private group:ParadoxEntityProperty<GroupType> =new ParadoxEntityProperty<GroupType>("group", "GroupType");
    private types:ParadoxEntityProperty<string> =new ParadoxEntityProperty<string>("type", "InternalType");
    private categories:ParadoxEntityProperty<string[]> =new ParadoxEntityProperty<string[]>("categories", "string[]");
    private essentialEquipment:ParadoxEntityProperty<string[]> =new ParadoxEntityProperty<string[]>("essential", "string[]");
    private neededEquipment:ParadoxEntityProperty<string[]> =new ParadoxEntityProperty<string[]>("essential", "string[]");

    private maxOrganization:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("max_organization", "number");
    private reliability:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("reliability", "number");
    private weight:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("weight", "number");
    private maximumSpeedMultiplier:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("maximum_speed", "number");
    private supplyConsumption:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("supply_consumption", "number");
    private defaultMorale:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("default_morale", "number");
    private combatWidth:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("combat_width", "number");

    private manpower:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("manpower", "number");
    private trainingTime:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("training_time", "number");

    private firepower:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("attack", "number");
    private softAttack:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("soft_attack", "number");
    private hardAttack:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("hard_attack", "number");
    private airAttack:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("air_attack", "number");
    private armorPiercing:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("ap_attack", "number");
    private breakthrough:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("breakthrough", "number");

    private defense:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("defense", "number");
    private maxStrength:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("max_strength", "number");
    private armor:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("armor_value", "number");
    private hardness:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("hardness", "number");
    private entrenchmentModifier:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("entrenchment", "number");

    private movement:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("movement", "number");
    private experienceLossFactor:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("experience_loss_factor", "number");
    private casualtyTrickleback:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("casualty_trickleback", "number");
    private suppressionFactor:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("suppression_factor", "number");
    private reliabilityFactor:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("reliability_factor", "number");
    private reconnaissance:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("recon", "number");
    private initiative:ParadoxEntityProperty<number> =new ParadoxEntityProperty<number>("initiative", "number");

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