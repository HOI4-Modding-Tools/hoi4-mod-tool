import * as util from "util";
import * as os from "os";

export default class ModDescriptor {
    public readonly name: string;
    public readonly version: string;
    public readonly tags: string[];
    public readonly replacePaths: string[];
    public readonly location: string;
    public readonly supportedVersion: string;
    public readonly dependencies: string[];

    constructor(name: string, version: string, tags: string[], replacePaths: string[], location: string, supportedVersion: string, dependencies: string[]) {
        this.name = name;
        this.version = version;
        this.tags = tags;
        this.replacePaths = replacePaths;
        this.location = location;
        this.supportedVersion = supportedVersion;
        this.dependencies = dependencies;
    }


    static parse(fileContent: string, directoryName: string) {
        const lines = fileContent.split(/\r?\n/);
        let name: string;
        let version: string;
        let tags: string[] = [];
        let replacePaths: string[] = [];
        let supportedVersion:string;
        let dependencies: string[] = [];

        let mode: string = "";
        for (const line of lines) {
            // Multiline modes
            if (mode === "tags") {
                if (line.includes("}")) {
                    mode = "";
                    continue;
                }
                const trimmedLime = line.trim();
                if(!trimmedLime.length) {
                    continue;
                }
                tags.push(trimmedLime.substr(1, trimmedLime.length - 2));
                continue;
            }
            if(mode === "dependencies") {
                if(line.includes("}")) {
                    mode = "";
                    continue;
                }
                const trimmedLime = line.trim();
                if(!trimmedLime.length) {
                    continue;
                }
                dependencies.push(trimmedLime.substr(1, trimmedLime.length - 2));
                continue;
            }

            if(!line.trim().length) {
                continue;
            }

            if (line.includes("name")) {
                const tokenizedLine = line.split("=").map(token => token.trim());
                name = tokenizedLine[1].substr(1, tokenizedLine[1].length - 2);
            } else if (line.includes("version")) {
                const tokenizedLine = line.split("=").map(token => token.trim());
                version = tokenizedLine[1].substr(1, tokenizedLine[1].length - 2);
                continue;
            } else if (line.includes("tags")) { // This is where the tags block starts
                mode = "tags";
                continue;
            } else if (line.includes("replace_path")) {
                const tokenizedLine = line.split("=").map(token => token.trim());
                replacePaths.push(tokenizedLine[1].substr(1, tokenizedLine[1].length - 2));
                continue;
            } else if (line.includes("supported_version")) {
                const tokenizedLine = line.split("=").map(token => token.trim());
                supportedVersion = tokenizedLine[1];
                continue;
            } else if (line.includes("dependencies")) {
                mode = "dependencies";
                continue;
            }
        }
        return new ModDescriptor(name, version, tags, replacePaths, directoryName, supportedVersion, dependencies);
    }

    public toParadoxFormat() {
        const versionLine = util.format("version = \"%s\"%s", this.version, os.EOL);
        const tagsLine = this.tags.length ? util.format("tags = {%s%s%s}%s", os.EOL, this.tags.map(tag => {
            return util.format("\t\"%s\"", tag);
        }).join(os.EOL), os.EOL, os.EOL) : "";
        const replacePathsLine = this.replacePaths.length ? this.replacePaths.map(replacePath => {
            return util.format("replace_path=\"%s\"", replacePath);
        }).join(os.EOL) : "";
        const supportedVersionLine = this.supportedVersion ? util.format("supported_version=\"%s\"", this.supportedVersion) : "";
        const nameLine = util.format("name=\"%s\"", this.name);
        const dependenciesLine = this.dependencies.length ? util.format("dependencies = {%s %s %s}", os.EOL,
            this.dependencies.map(dependency => util.format("\t\"%s\"", dependency)).join(os.EOL), os.EOL) + os.EOL : "";
        return versionLine +
            tagsLine +
            replacePathsLine +
            supportedVersionLine  +
            dependenciesLine +
            nameLine;
    }
}