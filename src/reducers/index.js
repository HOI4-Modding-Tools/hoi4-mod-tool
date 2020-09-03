import {combineReducers} from "redux";
import { ipcRenderer } from "electron";

const stateReducers = combineReducers({
    mods: function (state, action) {
        if (state === undefined) {
            return {};
        }
        if (action.type === "UpdateAvailableMods") {
            return action.mods;
        }
        return state;
    },
    modDirectory: function (state, action) {
        if (state === undefined) {
            return null;
        }
        return state;
    }
});

export default function (state, action) {
    state = stateReducers(state, action);
    switch (action.type) {
        case "SaveEntity":
        case "DeleteEntity":
            ipcRenderer.send("message", JSON.stringify(action));
            break;
    }
    return state;
};