"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var paths = require("path");
var os = require("os");
var ncp = require("ncp");
var _ = require("lodash");
var ModDescriptor_1 = require("./model/ModDescriptor");
var ModModel_1 = require("./model/ModModel");
var EquipmentModel_1 = require("./model/EquipmentModel");
var events_1 = require("events");
var Hoi4ModCreator = /** @class */ (function (_super) {
    __extends(Hoi4ModCreator, _super);
    function Hoi4ModCreator(configurationObject) {
        var _this = _super.call(this) || this;
        _this.mods = {};
        _this.modStateSnapshots = {};
        _this.on("modUpdated", function (updatedMod) {
            _this.saveModFiles(updatedMod);
        });
        _this.on("configurationChanged", _this.saveConfigurationFile);
        _this.configurationFileLocation = paths.join(os.homedir(), "hoi4-mod-tool-config.json");
        return _this;
    }
    Hoi4ModCreator.prototype.initialize = function () {
        var configFileLocation = paths.join(os.homedir(), "hoi-4-mod-tool-config.json");
        if (fs.existsSync(configFileLocation)) {
            console.log("Existing configuration was found, let's load it.");
            var loadedConfig = JSON.parse(fs.readFileSync(configFileLocation, "utf8"));
            console.log("Based on the loaded configuration, the following properties are set:");
            for (var property in loadedConfig) {
                console.log(property, ":", loadedConfig[property]);
            }
            this.configuration = loadedConfig;
        }
        if (this.configuration.modHomeDirectory) {
            this.loadExistingLocalMods();
        }
    };
    Hoi4ModCreator.prototype.loadExistingLocalMods = function () {
        var localModDirectories = fs.readdirSync(this.configuration.modHomeDirectory);
        for (var _i = 0, localModDirectories_1 = localModDirectories; _i < localModDirectories_1.length; _i++) {
            var directory = localModDirectories_1[_i];
            var file = fs.statSync(paths.join(this.configuration.modHomeDirectory, directory));
            if (file.isDirectory()) {
                this.loadLocalMod(paths.join(this.configuration.modHomeDirectory, directory));
            }
        }
    };
    Hoi4ModCreator.prototype.loadLocalMod = function (directory) {
        var filesInDirectory = fs.readdirSync(directory);
        var modDescriptor = this.processDescriptorFile(directory);
        // Load existing equipment definitions
        var equipmentDir = paths.join(directory, "common", "units", "equipment");
        var equipment = {};
        if (fs.existsSync(equipmentDir)) {
            equipment = this.loadEquipmentDefinitions(equipmentDir);
        }
        this.mods[modDescriptor.name] = new ModModel_1.default(modDescriptor, equipment);
        this.modStateSnapshots[modDescriptor.name] = new ModModel_1.default(modDescriptor, __assign({}, equipment));
    };
    Hoi4ModCreator.prototype.processDescriptorFile = function (directory) {
        return ModDescriptor_1.default.parse(fs.readFileSync(paths.join(directory, "descriptor.mod"), "utf-8"), directory);
    };
    Hoi4ModCreator.prototype.getMods = function () {
        return this.mods;
    };
    Hoi4ModCreator.prototype.getMod = function (modName) {
        return this.mods[modName];
    };
    Hoi4ModCreator.prototype.replaceEntity = function (mod, type, entity) {
        var activeMod = this.mods[mod];
        if (activeMod) {
            switch (type) {
                case "equipment":
                    activeMod.equipment[entity.name] = EquipmentModel_1.default.from(entity);
                    break;
                default:
                    console.error("Entity type " + type + " not supported");
            }
            this.emit("modUpdated", activeMod);
        }
    };
    Hoi4ModCreator.prototype.deleteEntity = function (mod, type, entity) {
        var activeMod = this.mods[mod];
        if (activeMod) {
            var entityCategory = activeMod["_" + type];
            if (entityCategory) {
                delete entityCategory[entity];
                this.emit("modUpdated", activeMod);
            }
        }
    };
    Hoi4ModCreator.prototype.loadEquipmentDefinitions = function (directory) {
        var loadedDefinitions = {};
        for (var _i = 0, _a = fs.readdirSync(directory); _i < _a.length; _i++) {
            var file = _a[_i];
            var fileContent = fs.readFileSync(paths.join(directory, file), "utf8").split(os.EOL);
            var mode = [];
            var inProgressItem = void 0;
            for (var i = 0; i < fileContent.length; i++) {
                var trimmedLine = fileContent[i].trim().substr(0, fileContent[i].indexOf("#") === -1 ? undefined : fileContent[i].trim().indexOf("#"));
                var tokenizedLine = trimmedLine.split(/\s+/);
                if (i == 0) {
                    if (!trimmedLine.startsWith("equipments")) {
                        throw new Error("Equipment files must start with 'equipments = {' on the first line.");
                    }
                    else {
                        continue;
                    }
                }
                if (trimmedLine.length === 0) {
                    continue;
                }
                if (mode.length == 0 && tokenizedLine[1] === "=") {
                    mode.push("equipment");
                    inProgressItem = {
                        name: tokenizedLine[0]
                    };
                    continue;
                }
                if (mode.slice(-1)[0] === "equipment") {
                    switch (tokenizedLine[0]) {
                        case "is_archetype":
                            if (tokenizedLine[2] === "yes") {
                                inProgressItem.isArchetype = true;
                            }
                            else {
                                console.warn("is_archetype doesn't make sense with any value other than 'yes', so it's being skipped.");
                            }
                            break;
                        case "is_buildable":
                            if (tokenizedLine[2] === "no") {
                                inProgressItem.isBuildable = false;
                            }
                            else {
                                console.warn("is_buildable doesn't make sense with any value other than 'no', so it's being skipped.");
                            }
                            break;
                        case "type":
                            if (["infantry", "support", "artillery", "anti_tank", "anti_air", "motorized", "mechanized", "armor", "fighter", "cas", "naval_bomber", "interceptor", "suicide", "tactical_bomber", "strategic_bomber",
                                "air_transport", "missile", "submarine", "screen_ship", "capital_ship", "carrier"].includes(tokenizedLine[2])) {
                                inProgressItem.type = tokenizedLine[2];
                            }
                            else {
                                console.warn("Internal type " + tokenizedLine[2] + " is not valid.");
                            }
                            break;
                        case "upgrades":
                            mode.push("upgrades");
                            break;
                        case "group_by":
                        case "archetype":
                        case "interface_category":
                            inProgressItem[tokenizedLine[0].toCamelCase()] = tokenizedLine[2];
                            break;
                        case "reliability":
                        case "build_cost_ic":
                        case "defense":
                        case "breakthrough":
                        case "max_organization":
                        case "lend_lease_cost":
                        case "maximum_speed":
                        case "soft_attack":
                        case "hard_attack":
                        case "air_attack":
                            inProgressItem[tokenizedLine[0].toCamelCase()] = Number.parseFloat(tokenizedLine[2]);
                            break;
                        case "ap_attack":
                            inProgressItem.armorPenetration = Number.parseFloat(tokenizedLine[2]);
                            break;
                        case "resources":
                            mode.push("resources");
                            break;
                        case "}":
                            loadedDefinitions[inProgressItem.name] = EquipmentModel_1.default.from(inProgressItem);
                            inProgressItem = {};
                            mode
                                .pop();
                            break;
                        default:
                            console.log("Ignoring property "
                                +
                                    tokenizedLine[0]);
                            break;
                    }
                    continue;
                }
                if (mode.slice(-1)[0] === "upgrades") {
                    switch (tokenizedLine[0]) {
                        case "}":
                            mode.pop();
                            break;
                    }
                    continue;
                }
                if (mode.slice(-1)[0] === "resources") {
                    switch (tokenizedLine[0]) {
                        case "}":
                            mode.pop();
                            break;
                    }
                    continue;
                }
            }
        }
        return loadedDefinitions;
    };
    Hoi4ModCreator.prototype.saveModFiles = function (mod) {
        var modSnapshot = this.modStateSnapshots[mod.descriptor.name] || new ModModel_1.default(mod.descriptor, {});
        if (!_.isEqual(mod, modSnapshot)) {
            var tempDirectoryRoot = paths.join(os.tmpdir(), "hoi4-tool", encodeURIComponent(mod.descriptor.name));
            // @ts-ignore
            fs.rmdirSync(tempDirectoryRoot, {
                recursive: true
            });
            // @ts-ignore
            fs.mkdirSync(tempDirectoryRoot, {
                recursive: true
            });
            fs.writeFileSync(paths.join(tempDirectoryRoot, "descriptor.mod"), mod.descriptor.toParadoxFormat());
            // @ts-ignore
            fs.mkdirSync(paths.join(tempDirectoryRoot, "common", "units", "equipment"), {
                recursive: true
            });
            var deletedEquipment = _.difference(Object.keys(modSnapshot.equipment), Object.keys(mod.equipment));
            for (var _i = 0, deletedEquipment_1 = deletedEquipment; _i < deletedEquipment_1.length; _i++) {
                var deleted = deletedEquipment_1[_i];
                fs.unlinkSync(paths.join(mod.descriptor.location, "common", "units", "equipment", deleted + ".txt"));
            }
            for (var equipment in mod.equipment) {
                var paradoxFormatted = mod.equipment[equipment].toParadoxFormat();
                // Write to temp directory
                fs.writeFileSync(paths.join(tempDirectoryRoot, "common", "units", "equipment", equipment + ".txt"), paradoxFormatted, {
                    "encoding": "utf8"
                });
            }
            ncp(tempDirectoryRoot, mod.descriptor.location);
            this.modStateSnapshots[mod.descriptor.name] = new ModModel_1.default(new ModDescriptor_1.default(mod.descriptor.name, mod.descriptor.version, mod.descriptor.tags, mod.descriptor.replacePaths, mod.descriptor.location, mod.descriptor.supportedVersion), __assign({}, mod.equipment));
        }
    };
    Hoi4ModCreator.prototype.saveConfigurationFile = function () {
        var stringifiedConfiguration = JSON.stringify(this.configuration);
        fs.writeFile(this.configurationFileLocation, stringifiedConfiguration, function (err) {
            if (!err) {
                console.log("Updated configuration file");
            }
            else {
                console.error(err);
            }
        });
    };
    return Hoi4ModCreator;
}(events_1.EventEmitter));
exports.default = Hoi4ModCreator;
//# sourceMappingURL=engine.js.map