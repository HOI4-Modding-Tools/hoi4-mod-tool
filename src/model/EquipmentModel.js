"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ModEntityModel_1 = require("./ModEntityModel");
var util = require("util");
var os = require("os");
var EquipmentModel = /** @class */ (function (_super) {
    __extends(EquipmentModel, _super);
    function EquipmentModel(props) {
        var _this = _super.call(this) || this;
        _this.isBuildable = false;
        _this.resources = new Map();
        _this.maximumSpeed = 4;
        for (var property in props) {
            _this[property] = props[property];
        }
        return _this;
    }
    EquipmentModel.from = function (input) {
        return new EquipmentModel(input);
    };
    EquipmentModel.prototype.toParadoxFormat = function () {
        var isArchetypeLine = this.isArchetype ? "\t\tis_archetype = yes" + os.EOL : "";
        var archetypeLine = this.simplePropertyLine("archetype", this.archetype);
        var isBuildableLine = this.simplePropertyLine("is_buildable", this.isBuildable);
        var typeLine = this.simplePropertyLine("type", this.type);
        var groupByLine = this.simplePropertyLine("group_by", this.groupBy);
        var interfaceCategoryLine = this.simplePropertyLine("interface_category", this.interfaceCategory);
        var parentLine = this.simplePropertyLine("parent", this.parent);
        var priorityLine = this.simplePropertyLine("priority", this.priority);
        var visualLevelLine = this.simplePropertyLine("visual_level", this.visualLevel);
        var lendLeaseLine = this.simplePropertyLine("lend_lease_cost", this.lendLeaseCost);
        var buildCostLine = this.simplePropertyLine("build_cost_ic", this.buildCostIc);
        var manpowerLine = this.simplePropertyLine("manpower", this.manpower);
        var maxOrganizationLine = this.simplePropertyLine("max_organization", this.maxOrganization);
        var reliabilityLine = this.simplePropertyLine("reliability", this.reliability);
        var weightLine = this.simplePropertyLine("weight", this.weight);
        var maximumSpeedLine = this.simplePropertyLine("maximum_speed", this.maximumSpeed);
        var supplyConsumptionLine = this.simplePropertyLine("supply_consumption", this.supplyConsumption);
        var defaultMoraleLine = this.simplePropertyLine("default_morale", this.defaultMorale);
        var defenseLine = this.simplePropertyLine("defense", this.defense);
        var breakthroughLine = this.simplePropertyLine("breakthrough", this.breakthrough);
        var armorLine = this.simplePropertyLine("armor", this.armor);
        var softAttackLine = this.simplePropertyLine("soft_attack", this.softAttack);
        var hardAttackLine = this.simplePropertyLine("hard_attack", this.hardAttack);
        var armorPenetrationLine = this.simplePropertyLine("ap_attack", this.armorPenetration);
        var airAttackLine = this.simplePropertyLine("air_attack", this.airAttack);
        var resourcesStartLine = this.resources.size > 0 ? "\t\tresources = {\n" : "";
        var resourcesLine = "";
        if (this.resources.size) {
            for (var resource in this.resources.keys()) {
                resourcesLine = resourcesLine + util.format("%s = %s\n", resource, this.resources.get(resource));
            }
        }
        var resourcesEndLine = this.resources.size > 0 ? "\t\t}" : "";
        var resourceFullLine = this.resources.size > 0 ? resourcesStartLine + resourcesLine + resourcesEndLine : "";
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
    };
    EquipmentModel.prototype.simplePropertyLine = function (propertyName, propertyValue) {
        var paradoxValue = typeof propertyValue === "boolean" ? (propertyValue ? "yes" : "no") : propertyValue;
        return util.format(propertyValue !== undefined ? util.format("\t\t%s = %s%s", propertyName, paradoxValue, os.EOL) : "");
    };
    return EquipmentModel;
}(ModEntityModel_1.default));
exports.default = EquipmentModel;
//# sourceMappingURL=EquipmentModel.js.map