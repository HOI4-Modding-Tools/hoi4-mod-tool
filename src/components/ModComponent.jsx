import React from "react";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {Route, withRouter} from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import EquipmentComponent from "./entities/EquipmentComponent";
import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import EntityListComponent from "./EntityListComponent";
import UnitComponent from "./entities/UnitComponent";

export class ModComponent extends React.Component {
    constructor(props) {
        super(props);
        this.routeToUrl = (url) => {
            return () => {
                this.props.history.push(url);
            }
        }
    }

    render() {
        const {classes, modName} = this.props;
        console.log(modName + " " + this.props.match.equipment);
        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={classes.root}>
                    <nav>
                        <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
                            <List component="nav">
                                <ListItem>
                                    <ListItemText primary={modName}/>
                                </ListItem>
                                <ListItem button onClick={this.routeToUrl("/")}>
                                    <ListItemText>Switch Mod</ListItemText>
                                </ListItem>
                                <Divider/>
                                <EntityListComponent entityCategory="equipment" label="Equipment"
                                                     mod={this.props.modName}></EntityListComponent>
                                <Divider/>
                                <EntityListComponent entityCategory="units" label="Units"
                                                     mod={this.props.modName}></EntityListComponent>
                                <Divider/>
                            </List>
                        </Drawer>
                    </nav>
                    <main className={classes.content}>
                        <Route path="/mod/:modName/equipment/:equipment?">
                            <EquipmentComponent mod={modName} item={this.props.match.equipment}></EquipmentComponent>
                        </Route>
                        <Route path="/mod/:modName/units/:unit?">
                            <UnitComponent mod={modName} item={this.props.match.unit}></UnitComponent>
                        </Route>
                    </main>
                </div>
            </React.Fragment>
        )
    }
}

export default connect((state, ownProps) => {
    return {
        mod: state.mods[decodeURIComponent(ownProps.match.params.modName)],
        modName: decodeURIComponent(ownProps.match.params.modName),
        match: ownProps.match
    };
})(withStyles(theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        flexShrink: 0,
        width: 250
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        marginLeft: 250,
        padding: 15,
        height: "100vh",
        overflow: "scroll"
    },
    drawerPaper: {
        width: 250
    },
    toolbar: theme.mixins.toolbar
}))(withRouter(ModComponent)));