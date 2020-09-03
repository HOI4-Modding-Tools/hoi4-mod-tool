"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var os = require("os");
var ModDescriptor = /** @class */ (function () {
    function ModDescriptor(name, version, tags, replacePaths, location, supportedVersion) {
        this.name = name;
        this.version = version;
        this.tags = tags;
        this.replacePaths = replacePaths;
        this.location = location;
        this.supportedVersion = supportedVersion;
    }
    ModDescriptor.parse = function (fileContent, directoryName) {
        var lines = fileContent.split(/\r?\n/);
        var name;
        var version;
        var tags = [];
        var replacePaths = [];
        var supportedVersion;
        var mode = "";
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            // Multiline modes
            if (mode === "tags") {
                if (line.includes("}")) {
                    mode = "";
                    continue;
                }
                var trimmedLime = line.trim();
                if (!trimmedLime.length) {
                    continue;
                }
                tags.push(trimmedLime.substr(1, trimmedLime.length - 2));
                continue;
            }
            if (!line.trim().length) {
                continue;
            }
            if (line.includes("name")) {
                var tokenizedLine = line.split("=").map(function (token) { return token.trim(); });
                name = tokenizedLine[1].substr(1, tokenizedLine[1].length - 2);
            }
            else if (line.includes("version")) {
                var tokenizedLine = line.split("=").map(function (token) { return token.trim(); });
                version = tokenizedLine[1].substr(1, tokenizedLine[1].length - 2);
                continue;
            }
            else if (line.includes("tags")) { // This is where the tags block starts
                mode = "tags";
                continue;
            }
            else if (line.includes("replace_path")) {
                var tokenizedLine = line.split("=").map(function (token) { return token.trim(); });
                replacePaths.push(tokenizedLine[1].substr(1, tokenizedLine[1].length - 2));
                continue;
            }
            else if (line.includes("supported_version")) {
                var tokenizedLine = line.split("=").map(function (token) { return token.trim(); });
                supportedVersion = tokenizedLine[1];
                continue;
            }
        }
        return new ModDescriptor(name, version, tags, replacePaths, directoryName, supportedVersion);
    };
    ModDescriptor.prototype.toParadoxFormat = function () {
        var versionLine = util.format("version = \"%s\"%s", this.version, os.EOL);
        var tagsLine = this.tags.length ? util.format("tags = {%s%s%s}%s", os.EOL, this.tags.map(function (tag) {
            return util.format("\t\"%s\"", tag);
        }).join(os.EOL), os.EOL, os.EOL) : "";
        var replacePathsLine = this.replacePaths.length ? this.replacePaths.map(function (replacePath) {
            return util.format("replace_path=\"%s\"", replacePath);
        }).join(os.EOL) : "";
        var supportedVersionLine = this.supportedVersion ? util.format("supported_version=\"%s\"", this.supportedVersion) : "";
        var nameLine = util.format("name=\"%s\"", this.name);
        return versionLine +
            tagsLine +
            replacePathsLine +
            supportedVersionLine +
            nameLine;
    };
    return ModDescriptor;
}());
exports.default = ModDescriptor;
//# sourceMappingURL=ModDescriptor.js.map