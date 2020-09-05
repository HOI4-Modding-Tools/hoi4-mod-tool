import {getParadoxPropertyFormat} from "./decorators/ParadoxProperty";
import * as os from "os";
import {getParadoxEntityName} from "./decorators/ParadoxEntity";

export default abstract class ModEntityModel {
    toParadoxFormat(): string {
        const entity = getParadoxEntityName(this);
        let outputString = "";
        for(const property in this) {
            const paradoxPropertyFormat = getParadoxPropertyFormat(this, property)
            if(paradoxPropertyFormat) {
                outputString += "\t\t" + paradoxPropertyFormat + os.EOL;
            }
        }

        return entity + " = {" + os.EOL +
            "\t" + this.name + " = {" + os.EOL +
            outputString +
            "\t}" + os.EOL +
            "}";
    }

    abstract get name():string;
}