import {connect} from 'react-redux';
import React from "react";
import { withRouter } from "react-router-dom";
import EntityEditComponent from "./EntityEditComponent";

export class EquipmentComponent extends EntityEditComponent {
    constructor(props) {
        super(props);

        this.noWhiteSpace = input => {
            return /^\S*$/.test(input);
        }

        this.fields = {
            name: {
                type: "text",
                label: "Name",
                validators: [this.noWhiteSpace],
                helperText: "Must be a string containing no whitespace.",
                required: true
            },
            isArchetype: {
                type: "boolean",
                label: "Is Archetype"
            },
            archetype: {
                type: "text",
                label: "Archetype",
                enabledWhen: () => {
                    return !this.props.equipment.isArchetype
                },
                helperText: "The archetype this equipment derives from."
            },
            isBuildable: {
                type: "boolean",
                label: "Is Buildable",
                helperText: "If this equipment is buildable"
            },
            active: {
                type: "boolean",
                label: "Active",
                helperText: "If this equipment is automatically available to build; use false if it is unlocked via a technology."
            },
            type: {
                type: "select",
                label: "Type",
                options: ["infantry", "support", "artillery", "anti_tank", "anti_air", "motorized", "mechanized", "armor", "fighter", "cas", "naval_bomber", "interceptor", "suicide", "tactical_bomber", "strategic_bomber",
                    "air_transport", "missile", "submarine", "screen_ship", "capital_ship", "carrier"],
                helperText: "What type of unit this equipment is for."
            },
            groupBy: {
                type: "select",
                label: "Group By",
                options: ["archetype", "type"],
                helperText: "How the equipment is grouped in the production screen."
            },
            interfaceCategory: {
                type: "select",
                label: "Interface Category",
                options: ["interface_category_land", "interface_category_armor", "interface_category_capital_ships", "interface_category_screen_ships", "interface_category_other_ships", "interface_category_air"],
                helperText: "Which production screen category the equipment appears in"
            },
            parent: {
                type: "text",
                label: "Parent",
                helperText: "The equipment this equipment supercedes."
            },
            priority: {
                type: "number",
                label: "Priority"
            },
            lendLeaseCost: {
                type: "number",
                label: "Lend-Lease Cost"
            },
            buildCostId: {
                type: "number",
                label: "Build Cost IC",
                helperText: "How much factory output is used."
            },
            manpower: {
                type: "number",
                label: "Manpower",
                helperText: "Manpower used to build"
            },
            resources: {
                type: "map",
                label: "Resources",
                helperText: "The resources used to build"
            },
            maxOrganization: {
                type: "number",
                label: "Max Organization"
            },
            reliability: {
                type: "number",
                label: "Reliability",
                helperText: "Determines the difference"
            },
            weight: {
                type: "number",
                label: "Weight",
                helperText: "The number of transports required to carry."
            },
            maximumSpeed: {
                type: "number",
                label: "Max Speed",
                helperText: "The base maximum speed of units using this equipment"
            },
            supplyConsumption: {
                type: "number",
                label: "Supply Consumption",
                helperText: "How much supply is consumed by units using this"
            },
            defaultMorale: {
                type: "number",
                label: "Default Morale",
                helperText: "How much base morale units using this equipment have, affecting how much extra organization is gained outside of combat."
            },
            defense: {
                type: "number",
                label: "Defense",
                helperText: "How much defense is gained by units using this equipment."
            },
            breakthrough: {
                type: "number",
                label: "Breakthrough",
                helperText: "How much breakthrough is gained by units using this equipment."
            },
            armor: {
                type: "number",
                label: "Armor",
                helperText: "If armor is higher than the enemy penetration, their"
            },
            softAttack: {
                type: "number",
                label: "Soft Attack",
                helperText: "Number of attacks against targets with low hardness."
            },
            hardAttack: {
                type: "number",
                label: "Hard Attack",
                helperText: "Number of attacks against targets with high hardness."
            },
            armorPenetration: {
                type: "number",
                label: "Penetration",
                helperText: "Ability to defeat enemy armor"
            },
            airAttack: {
                type: "number",
                label: "Air Attack",
                helperText: "Number of attacks against aircraft."
            }
        }
    }

    static componentDidUpdate(props, state){
        if(state.item.name !== props.equipmentName) {
            return {
                item: {...props.existingEquipment}
            }
        }
    }
}

const connected = withRouter(connect((state, ownProps) => {
    const unit = state.mods[decodeURIComponent(ownProps.match.params.modName)] ? state.mods[decodeURIComponent(ownProps.match.params.modName)]._units[ownProps.match.params.equipment] : {};
    return {
        modName: decodeURIComponent(ownProps.match.params.modName),
        path: ownProps.match.params,
        equipmentName: ownProps.match.params.equipment,
        unit
    }
}, (dispatch) => {
    return {
        save: function(mod, entity) {
            console.log("Saving entity");
            dispatch({
                type: "SaveEntity",
                mod,
                category: "equipment",
                entity
            });
        }
    }
})(EquipmentComponent));

export default connected;