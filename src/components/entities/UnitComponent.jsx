import {connect} from 'react-redux';
import React from "react";
import { withRouter } from "react-router-dom";
import EntityEditComponent from "./EntityEditComponent";
import * as _ from "lodash";

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
            mapIconCategory: {
                type: "text",
                label: "Map Icon Category"
            },
            iconPriority: {
                type: "text",
                label:"Priority",
                helperText: "Determines icon to use with multiple subunits together."
            },
            aiIconPriority: {
                type: "text",
                label: "AI Priority"
            },
            active: {
                type: "boolean",
                label: "Active",
                helperText:"If the unit is automatically unlocked; false means it is unlocked by a technology."
            },
            isCavalry: {
                type: "boolean",
                label: "Is Cavalry",
                helperText: "Is this a cavalry unit?"
            },
            isSpecialForces: {
                type: "boolean",
                label: "Is Special Forces",
                helperText: "Is this a special forces unit?"
            },
            isMarines: {
                type: "boolean",
                label: "Is Marines",
                helperText: "Is this a marine unit?"
            },
            isMountaineers: {
                type: "boolean",
                label: "Is Mountaineer",
                helperText: "Is this a mountaineer unit?"
            },
            canBeParachuted: {
                type: "boolean",
                label: "Can Parachute",
                helperText: "Is this a unit that can parachute?"
            },
            transportEquipmentName: {
                type: "string",
                label: "Transport Equipment",
                helperText: "Name of equipment to determine unit speed"
            },
            group: {
                type: "select",
                label: "Group",
                helperText: "Which tab the unit is organized into. Infantry, Support, Mobile, etc.",
                options: [
                    "infantry",
                    "support",
                    "mobile",
                    "armor"
                ]
            },
            type: {
                type: "select",
                label: "Unit Types",
                helperText: "The types of the unit.",
                options: [
                    "infantry",
                    "support",
                    "artillery",
                    "anti_tank",
                    "armor",
                    "fighter",
                    "cas",
                    "naval_bomber",
                    "interceptor",
                    "suicide",
                    "tactical_bomber",
                    "strategic_bomber",
                    "air_transport",
                    "missile",
                    "submarine",
                    "screen_ship",
                    "capital_ship",
                    "carrier"
                ]
            },
            essentialEquipment: {
                type: "map[string, number]",
                label: "Essential Equipment",
            },
            neededEquipment: {
                type: "map[string, number]",
                label: "Needed Equipment"
            },
            maxOrganization: {
                type: "number",
                label: "Max Organization"
            },
            reliability: {
                type: "number",
                label: "Reliability"
            },
            weight: {
                type: "number",
                label: "Weight",
                helperText: "Amount of space taken up on transports."
            },
            maximumSpeedMultiplier: {
                type: "number",
                label: "Maximum Speed",
                helperText: "A speed modifier this unit applies to the speed of their equipment."
            },
            supplyConsumption: {
                type: "number",
                label: "Supply Consumption",
                helperText: "Daily supply usage."
            },
            defaultMorale: {
                type: "number",
                label: "Default Morale"
            },
            combatWidth: {
                type: "number",
                label: "Combat Width"
            },
            manpower: {
                type: "number",
                label: "Manpower"
            },
            trainingTime: {
                type: "number",
                label: "Training Time"
            },
            firepower: {
                type: "number",
                label:"Firepower"
            },
            softAttack: {
                type: "number",
                label: "Soft Attack"
            },
            hardAttack: {
                type: "number",
                label: "Hard Attack"
            },
            airAttack: {
                type: "number",
                label: "Air Attack"
            },
            armorPiercing: {
                type: "number",
                label: "Armor Penetration"
            },
            breakthrough: {
                type: "number",
                label: "Breakthrough"
            },
            defense: {
                type: "number",
                label: "Defense"
            },
            maxStrength: {
                type: "number",
                label: "Max Strength"
            },
            armor: {
                type: "number",
                label: "Armor"
            },
            hardness: {
                type: "number",
                label: "Hardness"
            },
            entrenchmentModifier: {
                type: "number",
                label: "Entrenchment"
            },
            movement: {
                type: "number",
                label: "Movement"
            },
            experienceLossFactor: {
                type: "number",
                label: "Experience Loss Factor",
                helperText: "Percentage of experience lost when replacing losses."
            },
            casualtyTrickleback: {
                type: "number",
                label: "Casualty Trickleback",
                helperText: "Modifiers the amount of casualties recovered and returned to the manpower pool."
            },
            suppressionFactor: {
                type: "number",
                label: "Suppression Factor",
                helperText: "Modifier to resistance suppression."
            },
            reliabilityFactor: {
                type: "number",
                label: "Reliability Factor",
                helperText: "Modifier to equipment reliability of this unit."
            },
            recon: {
                type: "number",
                label: "Reconnaissance"
            },
            initiative: {
                type: "number",
                label: "Initiative"
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
    const category = "units";
    const entity = _.get(state, ["mods", ownProps.mod, "_" + category, ownProps.match.params[category]], {});
    return {
        modName: decodeURIComponent(ownProps.match.params.modName),
        category,
        entity,
        entityName: entity.name || "new"
    }
}, (dispatch) => {
    return {
        save: function(mod, entity) {
            console.log("Saving entity");
            dispatch({
                type: "SaveEntity",
                mod,
                category: "unit",
                entity
            });
        }
    }
})(EquipmentComponent));

export default connected;