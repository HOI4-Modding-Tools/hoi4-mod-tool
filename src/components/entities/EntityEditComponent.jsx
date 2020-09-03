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

export default class extends React.Component{
    constructor(props) {
        super(props);
        if(props.entity === undefined) {
            throw new Error("Missing required prop 'entity'");
        }
        this.state = {
            fieldErrors: {}
        };

        this.saveEntity = () => {
            this.props.save(this.props.modName, this.props.entity);
        }

        this.update = (property, validators) => {
            return (event) => {
                const newValue = this.extractValueFromEvent(event, this.fields[property].type);
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
                {Object.keys(this.fields).map((fieldId, index) => {
                    const field = this.fields[fieldId];
                    const enabled = !field.enabledWhen || field.enabledWhen();
                    switch (field.type) {
                        case "text":
                            return (
                                <FormGroup key={this.props.entityName + fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <InputLabel>{field.label}</InputLabel>
                                        <Input value={this.props.entity[fieldId]} disabled={!enabled}
                                               onChange={this.update(fieldId, field.validators)}/>
                                        <FormHelperText>{field.helperText}</FormHelperText>
                                    </FormControl>
                                </FormGroup>);
                        case "boolean":
                            return (
                                <FormGroup key={this.props.entityName + fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <FormControlLabel
                                            control={<Checkbox checked={this.props.entity[fieldId]} disabled={!enabled}
                                                               onChange={this.update(fieldId, field.validators)}/>}
                                            label={field.label}/>
                                        <FormHelperText>{field.helperText}</FormHelperText>
                                    </FormControl>
                                </FormGroup>);
                        case "select":
                            return (
                                <FormGroup key={this.props.entityName + fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <InputLabel>{field.label}</InputLabel>
                                        <Select value={this.props.entity[fieldId] || ""}
                                                onChange={this.update(fieldId, field.validators)}>
                                            {this.fields[fieldId].options.map(selectOption => {
                                                return (<MenuItem key={selectOption} value={selectOption}>{selectOption}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                            )
                        case "number":
                            return (
                                <FormGroup key={this.props.entityName + fieldId}>
                                    <FormControl error={this.state.fieldErrors[fieldId]}>
                                        <InputLabel>{field.label}</InputLabel>
                                        <Input value={this.props.entity[fieldId]} disabled={!enabled} type="number"
                                               onChange={this.update(fieldId, field.validators)}/>
                                        <FormHelperText>{field.helperText}</FormHelperText>
                                    </FormControl>
                                </FormGroup>);
                    }
                })}
                <Button onClick={this.saveEntity} color="primary" variant="contained" key="save-button">
                    Save
                </Button>
            </div>
        );
    }

}