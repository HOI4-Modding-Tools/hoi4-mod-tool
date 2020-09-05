import "reflect-metadata";

const entityProperty = Symbol("ParadoxEntity")

export function ParadoxEntity(categoryName: string){
    return (target) => {
        Reflect.defineMetadata(entityProperty, categoryName, target);
    }

}

export function getParadoxEntityName(target: any) {
    return Reflect.getMetadata(entityProperty, target.constructor);
}