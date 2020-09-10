import "reflect-metadata";
import ModEntityModel from "../../model/ModEntityModel";

export default interface EntityReader<T extends ModEntityModel> {
    read(input:string):T;
}