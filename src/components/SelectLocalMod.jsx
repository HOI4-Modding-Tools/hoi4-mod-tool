import {connect} from 'react-redux';
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import withRouter from "react-router/modules/withRouter";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

export class SelectLocalMod extends React.Component {
    constructor(props) {
        super(props);
        this.routeToUrl = (url) => {
            return () => {
                console.log("Routing to", url);
                this.props.history.push(url);
            }
        }
    }


    render() {
        const list = Object.keys(this.props.mods).map(mod => {
            const linkTo = "/mod/" + encodeURIComponent(this.props.mods[mod]._descriptor.name);
            return (
                <ListItem key={this.props.mods[mod]._descriptor.location} button onClick={this.routeToUrl(linkTo)}>
                    <ListItemText align="center">
                        {this.props.mods[mod]._descriptor.name}
                    </ListItemText>
                </ListItem>)
        });
        if (list.length) {
            return (
                <div>
                    <h1 style={{textAlign: "center"}}>
                        Available Local Mods
                    </h1>
                    <List>
                        {list}
                    </List>
                    <div style={{textAlign: "center"}}>To create new mods, use the built-in tools in the Paradox Launcher.</div>
                </div>)
        } else {
            return (
                <div>
                    <div>
                        Available Local Mods
                    </div>
                    <div>No local mods found in your mod directory: {this.props.modDirectory}</div>
                    <div>To create new mods, use the built-in tools in the Paradox Launcher.</div>
                </div>)
        }

    }
}

const connected = connect((state, ownProps) => {
    return {
        mods: state.mods
    };
})(/*withRouter(*/SelectLocalMod/*)*/);

export default connected;