import {InternalType} from "./InternalTypes";
import ModEntityModel from "./ModEntityModel";
import * as util from "util";
import * as os from "os";

export default class EquipmentModel extends ModEntityModel {
    private name: string;
    private year: number;
    private picture: string;
    private isArchetype: boolean;
    private archetype: string;
    private isBuildable: boolean = false;
    /**
     * If this equipment can be built without requiring unlocking with a technology.
     */
    private active: boolean;
    private type: InternalType;
    private groupBy: string;
    private interfaceCategory: string;
    private parent: string;
    private priority: string;
    private visualLevel: string;

    /**
     * Costs
     */
    private lendLeaseCost: number;
    /**
     * How much factory output used to produce.
     */
    private buildCostIc: number;
    /**
     *
     */
    private manpower: number;
    private resources: Map<string, number> = new Map<string, number>();

    private maxOrganization: number;
    private reliability: number;
    private weight: number;
    private maximumSpeed: number = 4;
    private supplyConsumption: number;
    private defaultMorale: number;
    /**
     * Defensive values
     */
    private defense: number;
    private breakthrough: number;
    private armor: number;

    /**
     * Offensive values
     */
    private softAttack: number;
    private hardAttack: number;
    private armorPenetration: number;
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
        const isArchetypeLine = this.isArchetype ? "\t\tis_archetype = yes" + os.EOL : "";
        const archetypeLine = this.simplePropertyLine("archetype", this.archetype);
        const isBuildableLine = this.simplePropertyLine("is_buildable", this.isBuildable);
        const typeLine =  this.simplePropertyLine("type", this.type);
        const groupByLine =  this.simplePropertyLine("group_by", this.groupBy);
        const interfaceCategoryLine =  this.simplePropertyLine("interface_category", this.interfaceCategory);
        const parentLine =  this.simplePropertyLine("parent", this.parent);
        const priorityLine =  this.simplePropertyLine("priority", this.priority);
        const visualLevelLine =  this.simplePropertyLine("visual_level", this.visualLevel);
        const lendLeaseLine =  this.simplePropertyLine("lend_lease_cost", this.lendLeaseCost);
        const buildCostLine =  this.simplePropertyLine("build_cost_ic", this.buildCostIc);
        const manpowerLine =  this.simplePropertyLine("manpower", this.manpower);
        const maxOrganizationLine = this.simplePropertyLine("max_organization", this.maxOrganization);
        const reliabilityLine = this.simplePropertyLine("reliability", this.reliability);
        const weightLine = this.simplePropertyLine("weight", this.weight);
        const maximumSpeedLine = this.simplePropertyLine("maximum_speed", this.maximumSpeed);
        const supplyConsumptionLine = this.simplePropertyLine("supply_consumption", this.supplyConsumption);
        const defaultMoraleLine = this.simplePropertyLine("default_morale", this.defaultMorale);
        const defenseLine = this.simplePropertyLine("defense", this.defense);
        const breakthroughLine = this.simplePropertyLine("breakthrough", this.breakthrough);
        const armorLine = this.simplePropertyLine("armor", this.armor);
        const softAttackLine = this.simplePropertyLine("soft_attack", this.softAttack);
        const hardAttackLine = this.simplePropertyLine("hard_attack", this.hardAttack);
        const armorPenetrationLine = this.simplePropertyLine("ap_attack", this.armorPenetration);
        const airAttackLine = this.simplePropertyLine("air_attack", this.airAttack);
        const resourcesStartLine = this.resources.size > 0 ? "\t\tresources = {\n" : "";
        let resourcesLine = "";
        if(this.resources.size) {
            for(const resource in this.resources.keys()) {
                resourcesLine = resourcesLine + util.format("%s = %s\n", resource, this.resources.get(resource));
            }
        }
        const resourcesEndLine = this.resources.size > 0 ? "\t\t}" : "";
        const resourceFullLine = this.resources.size > 0 ? resourcesStartLine + resourcesLine + resourcesEndLine : "";

        return "equipments = {" + os.EOL +
           "\t" + this.name + " = {" + os.EOL +
            isArchetypeLine +
            archetypeLine +
            isBuildableLine +
            typeLine +
            groupByLine +
            interfaceCategoryLine +
            parentLine +
            priorityLine +
            visualLevelLine +
            lendLeaseLine +
            buildCostLine +
            manpowerLine +
            resourceFullLine +
            maxOrganizationLine +
            reliabilityLine +
            weightLine +
            maximumSpeedLine +
            supplyConsumptionLine +
            defaultMoraleLine +
            defenseLine +
            breakthroughLine +
            armorLine +
            softAttackLine +
            hardAttackLine +
            armorPenetrationLine +
            airAttackLine +
                "\t}" + os.EOL +
            "}";
    }

    private simplePropertyLine(propertyName:string, propertyValue: any) {
        const paradoxValue = typeof propertyValue === "boolean" ? (propertyValue ? "yes" : "no") : propertyValue;
        return util.format(propertyValue !== undefined ? util.format("\t\t%s = %s%s", propertyName, paradoxValue, os.EOL) : "");
    }
}