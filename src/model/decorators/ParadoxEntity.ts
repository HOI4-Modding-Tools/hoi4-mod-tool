import "reflect-metadata";
import ModModel from "../ModModel";

export function ParadoxEntity(typeName: string, displayName:string){
    return (target) => {
        Reflect.defineMetadata("ParadoxEntityCategory", typeName, target);
        let paradoxEntities = Reflect.getMetadata("ParadoxEntities", ModModel);
        if(!paradoxEntities) {
            paradoxEntities = {};
            Reflect.defineMetadata("ParadoxEntities", paradoxEntities, ModModel);
        }
        paradoxEntities[typeName] = {
            entityName: typeName,
            displayName,
            constructor: target
        };
    }
}

export function getEntities(): {[type:string]: Function} {
    return Reflect.getMetadata("ParadoxEntities", ModModel);
}