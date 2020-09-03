import {connect} from 'react-redux';
import React from "react";
import { Link } from "react-router-dom";

export class SelectLocalMod extends React.Component {

    render() {
        const list = Object.keys(this.props.mods).map(mod => {
            const linkTo = "/mod/" + encodeURIComponent(this.props.mods[mod]._descriptor.name);
            return (<li key={this.props.mods[mod]._descriptor.location}><Link to={linkTo}>{this.props.mods[mod]._descriptor.name}</Link></li>)
        });
        if(list.length) {
            return (
                <div>
                    <div>
                        Available Local Mods
                    </div>
                    <ul>
                        {list}
                    </ul>
                    <div>To create new mods, use the built-in tools in the Paradox Launcher.</div>
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
}, (dispatch, ownProps) => {
    return {};
})(SelectLocalMod);

export default connected;