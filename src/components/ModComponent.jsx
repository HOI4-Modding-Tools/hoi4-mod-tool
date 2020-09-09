import React from "react";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {Route, withRouter} from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import EntityListComponent from "./EntityListComponent";
import ModDefinitionComponent from "./entities/ModDefinitionComponent";
import EntityEditComponent from "./entities/EntityEditComponent";

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
        return (
            <React.Fragment>
                <CssBaseline/>
                <div className={classes.root}>
                    <nav>
                        <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
                            <List component="nav">
                                <ListItem button onClick={this.routeToUrl("/mod/" + modName)}>
                                    <ListItemText primary={modName}/>
                                </ListItem>
                                <ListItem button onClick={this.routeToUrl("/")}>
                                    <ListItemText>Switch Mod</ListItemText>
                                </ListItem>
                                <Divider/>
                                {Object.keys(this.props.uiConfig).map(category => {
                                    return (
                                        <React.Fragment>
                                            <EntityListComponent entityCategory={this.props.uiConfig[category].categoryName}
                                                                 mod={this.props.modName}
                                                                 label={this.props.uiConfig[category].categoryLabel}/>
                                            <Divider/>
                                        </React.Fragment>
                                    )
                                })}
                            </List>
                        </Drawer>
                    </nav>
                    <main className={classes.content}>
                        <Route exact path="/mod/:modName">
                            <ModDefinitionComponent mod={modName}/>
                        </Route>
                        <Route path="/mod/:modName/:category/:entity?">
                            <EntityEditComponent/>
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
        match: ownProps.match,
        uiConfig: state.uiConfig
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