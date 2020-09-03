import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import SelectLocalMod from "./components/SelectLocalMod";
import ActiveMod from "./components/ModComponent";
import Reducer from "./reducers";
import { ipcRenderer } from "electron";

const store = createStore(Reducer);
ipcRenderer.on("message", (event, args) => {
    store.dispatch(args);
});

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Route exact path="/" component={SelectLocalMod} />
                    <Route path="/mod/:modName" component={ActiveMod}></Route>
                </HashRouter>
            </Provider>);
    }
}
