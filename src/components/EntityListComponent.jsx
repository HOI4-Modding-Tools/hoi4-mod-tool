import React from "react";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withRouter } from "react-router";

export class EntityListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.toggle = () => {
            this.setState({
                open: !this.state.open
            })
        }
        this.routeToUrl = (url) => {
            return () => {
                console.log("Routing to", url);
                this.props.history.push(url);
            }
        }
        this.deleteEntity = (category, entity, event) => {
            event.stopPropagation();
            this.props.deleteEntity(this.props.modName, category, entity);
        }


    }

    render() {
        return (
            <React.Fragment>
                <ListItem button onClick={this.toggle} color="primary">
                    <ListItemText primary={this.props.label}></ListItemText>
                    {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List >
                        {Object.keys(this.props.items).map(item => {
                            return (<ListItem style={{paddingLeft: 20}} button onClick={this.routeToUrl("/mod/" + encodeURIComponent(this.props.modName) + "/" + this.props.category + "/" + item)} key={this.props.category + item}>
                                <ListItemText primary={this.props.items[item].name}/>
                                <IconButton onClick={this.deleteEntity.bind(null, this.props.category, this.props.mod["_" + this.props.category][item])}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>);
                        })}
                        <ListItem style={{paddingLeft: 20}} button onClick={this.routeToUrl("/mod/" + encodeURIComponent(this.props.modName) + "/" + this.props.category + "/")} key={this.props.category}>
                            <ListItemText>Create New</ListItemText>
                        </ListItem>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

const connected = connect((state, ownProps) => {
    const items = state.mods[ownProps.mod] ? state.mods[ownProps.mod]["_" + ownProps.entityCategory] : {};
    return {
        label: ownProps.label,
        mod: state.mods[ownProps.mod],
        modName: ownProps.mod,
        items,
        category: ownProps.entityCategory
    };
}, (dispatch, ownProps) => {
    return {
        deleteEntity: function(modName, category, entity){
            dispatch({
                type: "DeleteEntity",
                mod: modName,
                category: category,
                entity: entity.name
            })
        }
    };
})(withRouter(EntityListComponent));
export default connected;