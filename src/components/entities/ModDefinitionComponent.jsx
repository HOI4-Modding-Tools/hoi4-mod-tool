import React from "react";
import {connect} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import {withRouter} from "react-router";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as _ from "lodash";
import Button from "@material-ui/core/Button";

export class ModDefinitionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.update = function (path, e) {
            const value = e.target.value;
            if(value === "" || value === null || value == undefined) {
                const arrayPath = path.slice(0, path.length - 1);
                const property = _.get(this.props.descriptor, arrayPath);
               if(_.isArray(property)) {
                   const copy = _.cloneDeep(this.props.descriptor);
                   _.get(copy, arrayPath).splice(e.currentTarget.dataset.index);
                   this.props.dispatch({
                       type: "UpdateDescriptor",
                       mod: this.props.mod,
                       descriptor: copy
                   });
                   return;
               }
            }
            this.props.dispatch({
                type: "UpdateDescriptor",
                mod: this.props.mod,
                descriptor: _.set(_.cloneDeep(this.props.descriptor), path, value)
            });
        }
        this.lastDependencyInput = React.createRef();
        this.lastReplacePathInput = React.createRef();

        this.save = () => {
            this.props.dispatch({
                type: "SaveDescriptor",
                mod: this.props.modName,
                descriptor: this.props.descriptor
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.lastDependencyInput.current &&!_.isEmpty(prevProps.descriptor) &&_.get(prevProps.descriptor, ["dependencies", "length"], 0) !== _.get(this.props.descriptor, ["dependencies", "length"], 0)) {
            this.lastDependencyInput.current.focus();
        }
        if(this.lastReplacePathInput.current && !_.isEmpty(prevProps.descriptor) &&_.get(prevProps.descriptor, ["replacePaths", "length"], 0) !== _.get(this.props.descriptor, ["replacePaths", "length"], 0)) {
            this.lastReplacePathInput.current.focus();
        }
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <FormControl>
                        <InputLabel>Mod Name</InputLabel>
                        <Input value={this.props.descriptor.name}></Input>
                        <FormHelperText>Read only.</FormHelperText>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel>Mod Version</InputLabel>
                        <Input value={this.props.descriptor.version}
                               onChange={this.update.bind(this, "version")}></Input>
                        <FormHelperText>This is the version of the mod itself.</FormHelperText>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel>Supported Game Version</InputLabel>
                        <Input value={this.props.descriptor.supportedVersion}
                               onChange={this.update.bind(this, "supportedVersion")}></Input>
                        <FormHelperText>This is the version of the game the mod supports itself.</FormHelperText>
                    </FormControl>
                </FormGroup>
                <FormGroup>

                    <InputLabel>Dependencies</InputLabel>
                    {(this.props.descriptor.dependencies || []).map((dependency, index) => {
                        return (<FormControl>
                            <Input key={index} value={this.props.descriptor.dependencies[index]}
                                   inputProps={{
                                       "data-index" : index
                                   }}
                                   onChange={this.update.bind(this, ["dependencies", index])}
                                   inputRef={index == _.get(this.props.descriptor, ["dependencies", "length"], 0) - 1 ? this.lastDependencyInput : null}
                            />
                        </FormControl>);
                    })}
                    <FormGroup>
                        <FormControl>
                            <Input value={_.get(this.props.descriptor, ["dependencies", _.get(this.props.descriptor, ["dependencies", "length"])], "")}
                                   onChange={this.update.bind(this, ["dependencies", (this.props.descriptor.dependencies || []).length])}
                                   onFocus={() => {
                                       console.log("Focused new");
                                   }}
                            />
                        </FormControl>
                    </FormGroup>
                    <FormHelperText>Other mods this mod depends on.</FormHelperText>
                </FormGroup>
                <FormGroup>

                    <InputLabel>ReplacePaths</InputLabel>
                    {(this.props.descriptor.replacePaths || []).map((dependency, index) => {
                        return (<FormControl InputProps={{
                            'data-index': index
                        }}>
                            <Input key={index} value={this.props.descriptor.replacePaths[index]}
                                   onChange={this.update.bind(this, ["replacePaths", index])}
                                   inputRef={index == _.get(this.props.descriptor, ["replacePaths", "length"], 0) - 1 ? this.lastReplacePathInput : null}
                            />
                        </FormControl>);
                    })}
                    <FormGroup>
                        <FormControl>
                            <Input value={_.get(this.props.descriptor, ["replacePaths", _.get(this.props.descriptor, ["replacePaths", "length"])], "")}
                                   onChange={this.update.bind(this, ["replacePaths", (this.props.descriptor.replacePaths || []).length])}
                            />
                        </FormControl>
                    </FormGroup>
                    <FormHelperText>Other mods this mod depends on.</FormHelperText>
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.save} color="primary" variant="contained">Save</Button>
                </FormGroup>
            </div>
        );
    }
}

export default withRouter(connect((state, ownProps) => {
    const modName = decodeURIComponent(ownProps.match.params.modName);
    const descriptor = _.get(state, ["mods", modName, "_descriptor"], {
    });
    return {
        modName,
        descriptor
    };
}, (dispatch, ownProps) => {
    return {
        dispatch
    };
})(ModDefinitionComponent));