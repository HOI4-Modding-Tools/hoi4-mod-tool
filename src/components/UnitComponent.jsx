import {connect} from 'react-redux';
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { withRouter } from "react-router-dom";

export class EquipmentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.existingEquipment || {},
            fieldErrors: {}
        };

        this.extractValueFromEvent = (e, fieldType) => {
            switch (fieldType) {
                case "boolean":
                    return e.target.checked;
                default:
                    return e.target.value;
            }
        }

        this.saveEntity = () => {
            this.props.save(this.state.item);
        }

        this.update = (property, validators) => {
            return (event) => {
                const newValue = this.extractValueFromEvent(event, this.fields[property].type);
                const valid = !validators || validators.reduce((isValidSoFar, validator) => isValidSoFar && validator(newValue), true);
                const state = {...this.state};
                if (valid) {
                    state.item[property] = newValue;
                    delete state.fieldErrors[property];
                } else {
                    state.fieldErrors[property] = true;
                }
                this.setState(state);

            }
        }

        this.noWhiteSpace = input => {
            return /^\S*$/.test(input);
        }

        this.fields = {
            name: {
                type: "text",
                label: "Name",
                validators: [this.noWhiteSpace],
                helperText: "Must be a string containing no whitespace."
            },
            isArchetype: {
                type: "boolean",
                label: "Is Archetype"
            },
            archetype: {
                type: "text",
                label: "Archetype",
                when: () => {
                    return !this.state.item.isArchetype
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

    render() {
        return (
            <div>
                {Object.keys(this.fields).map((fieldId, index) => {
                    const field = this.fields[fieldId];
                    const enabled = !field.when || field.when();
                    switch (field.type) {
                        case "text":
                            return (
                                <FormGroup key={fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <InputLabel>{field.label}</InputLabel>
                                        <Input value={this.state.item[fieldId]} disabled={!enabled}
                                               onChange={this.update(fieldId, field.validators)}/>
                                        <FormHelperText>{field.helperText}</FormHelperText>
                                    </FormControl>
                                </FormGroup>);
                        case "boolean":
                            return (
                                <FormGroup key={fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.item[fieldId]} disabled={!enabled}
                                                               onChange={this.update(fieldId, field.validators)}/>}
                                            label={field.label}/>
                                        <FormHelperText>{field.helperText}</FormHelperText>
                                    </FormControl>
                                </FormGroup>);
                        case "select":
                            return (
                                <FormGroup key={fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <InputLabel>{field.label}</InputLabel>
                                        <Select value={this.state.item[fieldId] || ""}
                                                onChange={this.update(fieldId, field.validators)}>
                                            {this.fields[fieldId].options.map(selectOption => {
                                                return (<MenuItem value={selectOption}>{selectOption}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            )
                        case "number":
                            return (
                                <FormGroup key={fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <InputLabel>{field.label}</InputLabel>
                                        <Input value={this.state.item[fieldId]} disabled={!enabled} type="number"
                                               onChange={this.update(fieldId, field.validators)}/>
                                        <FormHelperText>{field.helperText}</FormHelperText>
                                    </FormControl>
                                </FormGroup>);
                    }

                })}
                <Button onClick={this.saveEntity} color="primary" variant="contained">
                    Save
                </Button>
            </div>
        );
    }
}

const connected = connect((state, ownProps) => {
    return {
        existingEquipment: state.activeMod._equipment[ownProps.match.params.equipment]
    }
}, (dispatch) => {
    return {
        save: function(item) {
            console.log("Saving entity");
            dispatch({
                type: "SaveEntity",
                category: "equipment",
                entity: item
            });
        }
    }
})(withRouter(EquipmentComponent));

export default connected;