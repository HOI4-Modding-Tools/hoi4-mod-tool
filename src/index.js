const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

const Engine = require("./engine").default;

String.prototype.fromSnakeCaseToCamelCase = function () {
    const matcher = /_(\w)/;
    return this.replace(matcher, function (match, p1) {
        return p1.toUpperCase();
    });
};

String.prototype.fromCamelCaseToSnakeCase = function(){
    const capitalMatcher = /([A-Z])/;
    return this.replace(capitalMatcher, "_$&").toLowerCase();
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.toggleDevTools();

    return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
    const engine = new Engine();
    engine.initialize();
    const mainWindow = createWindow();
    mainWindow.webContents.on("did-finish-load", function () {
        const mods = Object.keys(engine.getMods()).reduce((modMappings, nextMod) => {
            modMappings[nextMod] = engine.getMods()[nextMod].asSimpleObject();
            return modMappings;
        }, {});
        mainWindow.webContents.send("message", {
            type: "UpdateAvailableMods",
            mods
        })
    });

    ipcMain.on("message", function(event, arg){
        console.log(arg);
        const action = JSON.parse(arg);
        switch (action.type) {
            case "DeleteEntity":
                engine.deleteEntity(action.mod, action.category, action.entity);
                break;
            case "SaveEntity":
                engine.replaceEntity(action.mod, action.category, action.entity);
                break;
            case "SaveDescriptor":
                engine.updateDescriptor(action.mod, action.descriptor);
                break;
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.