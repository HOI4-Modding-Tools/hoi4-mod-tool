import * as _ from "lodash";
import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {withRouter} from "react-router";

export class EntityEditComponent extends React.Component {
    validateProps(props) {
        if (props.modName === undefined) {
            throw new Error("Missing required prop 'modName'");
        }
        if (props.entity === undefined) {
            throw new Error("Missing required prop 'entity'");
        }
        if (props.category === undefined) {
            throw new Error("Missing required prop 'category'");
        }
        if (props.entityName === undefined) {
            throw new Error("Missing required prop 'entityName'");
        }
    }

    constructor(props) {
        super(props);
        this.validateProps(props);
        this.state = {
            fieldErrors: {}
        };

        this.saveEntity = () => {
            this.props.save(this.props.entity);
        }

        this.update = (property, validators) => {
            return (event) => {
                const newValue = this.extractValueFromEvent(event, property == "name" ? "text": this.props.uiFields[property].type);
                const valid = !validators || validators.reduce((isValidSoFar, validator) => isValidSoFar && validator(newValue), true);
                const state = {...this.state};
                if (valid) {
                    this.props.entity[property] = newValue;
                    delete state.fieldErrors[property];
                } else {
                    state.fieldErrors[property] = true;
                }
                this.setState(state);

            }
        };

        this.extractValueFromEvent = (e, fieldType) => {
            switch (fieldType) {
                case "boolean":
                    return e.target.checked;
                default:
                    return e.target.value;
            }
        }
    }

    render() {
        return (
            <div id={this.props.category}>
                <h2>{this.props.categoryName}</h2>
                <FormGroup key="name">
                    <FormControl error={this.state.fieldErrors["name"]}>
                        <InputLabel>Name</InputLabel>
                        <Input value={this.props.entity["name"] || ""}
                               onChange={this.update("name")}/>
                    </FormControl>
                </FormGroup>
                {Object.keys(this.props.uiFields).map((fieldId, index) => {
                    const field = this.props.uiFields[fieldId].uiConfig;
                    switch (field.inputType) {
                        case "text":
                            return (
                                <FormGroup key={this.props.entityName + fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <InputLabel>{field.label}</InputLabel>
                                        <Input value={this.props.entity[fieldId] || ""}
                                               onChange={this.update(fieldId, field.validators)}/>
                                        <FormHelperText>{field.helperText}</FormHelperText>
                                    </FormControl>
                                </FormGroup>);
                        case "checkbox":
                            return (
                                <FormGroup key={this.props.entityName + fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <FormControlLabel
                                            control={<Checkbox checked={this.props.entity[fieldId] || false}
                                                               onChange={this.update(fieldId, field.validators)}/>}
                                            label={field.label}/>
                                        <FormHelperText>{field.helperText}</FormHelperText>
                                    </FormControl>
                                </FormGroup>);
                        case "select[string]":
                            if (!field.options) {
                                console.warn("Didn't render property", fieldId, "it was missing required property 'options'");
                            } else {
                                return (
                                    <FormGroup key={this.props.entityName + fieldId}>
                                        <FormControl error={this.state.fieldErrors[fieldId]}>
                                            <InputLabel>{field.label}</InputLabel>
                                            <Select value={this.props.entity[fieldId] || ""}
                                                    onChange={this.update(fieldId, field.validators)}>
                                                {field.options.map(selectOption => {
                                                    return (<MenuItem key={selectOption}
                                                                      value={selectOption}>{selectOption}</MenuItem>)
                                                })}
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                )
                            }
                        case "number":
                            return (
                                <FormGroup key={this.props.entityName + fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <InputLabel>{field.label}</InputLabel>
                                        <Input value={this.props.entity[fieldId] || 0} type="number"
                                               onChange={this.update(fieldId, field.validators)}/>
                                        <FormHelperText>{field.helperText}</FormHelperText>
                                    </FormControl>
                                </FormGroup>);
                        default:
                            console.warn("Failed to render a component of type", field.inputType);
                    }
                })}
                <Button onClick={this.saveEntity} color="primary" variant="contained" key="save-button">
                    Save
                </Button>
            </div>
        );
    }

}

const connected = withRouter(connect((state, ownProps) => {
    const modName = decodeURIComponent(ownProps.match.params.modName);
    const mod = state.mods[modName];
    const category = "_" + ownProps.match.params.category;
    const entity = _.get(mod, [category, ownProps.match.params.entity], {});
    return {
        modName,
        categoryName: _.get(state.uiConfig, [ownProps.match.params.category, "categoryLabel"]),
        category: ownProps.match.params.category,
        uiFields: _.get(state.uiConfig, [ownProps.match.params.category, "entityProperties"], {}),
        entity,
        entityName: ownProps.match.params.entity || "new"
    };
}, (dispatch, ownProps) =>{
    const mod = decodeURIComponent(ownProps.match.params.modName);
    return {
        save: function (entity) {
            dispatch({
                mod,
                category:ownProps.match.params.category,
                type: "SaveEntity",
                entity
            })
        }
    }
})(EntityEditComponent));
export default connected;