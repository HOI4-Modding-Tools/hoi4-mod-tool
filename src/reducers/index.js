import {combineReducers} from "redux";
import { ipcRenderer } from "electron";
import * as _ from "lodash";

const stateReducers = combineReducers({
    mods: function (state, action) {
        if (state === undefined) {
            return {};
        }
        if (action.type === "UpdateAvailableMods") {
            return {...action.mods};
        }
        return state;
    },
    modDirectory: function (state, action) {
        if (state === undefined) {
            return null;
        }
        return state;
    },
    uiConfig: function(state, action) {
        if(action.type === 'UiConfiguration') {
            return action.config;
        }
        if(state === undefined) {
            return {};
        }
        return state;
    }
});

export default function (state, action) {
    state = _.cloneDeep(stateReducers(state, action));
    switch (action.type) {
        case "SaveEntity":
        case "DeleteEntity":
        case "SaveDescriptor":
            ipcRenderer.send("message", JSON.stringify(action));
            break;
        case "UpdateDescriptor":
            state.mods[action.mod]._descriptor = action.descriptor;
            break;
    }
    return state;
};