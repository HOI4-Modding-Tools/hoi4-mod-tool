import "reflect-metadata";
import ModEntityModel from "../../model/ModEntityModel";
import {DataFileLexer} from "../parsers/DataFileLexer";
import {DataFileParser} from "../parsers/DataFileParser";
import * as antlr4 from "antlr4";

export default abstract class EntityReader<T extends ModEntityModel> {
    abstract read(input:string):T;

    protected generateTree(input: string) {
        const inputStream = new antlr4.InputStream(input);
        const lexer = new DataFileLexer(inputStream);
        const tokenStream = new antlr4.CommonTokenStream(lexer);
        const parser = new DataFileParser(tokenStream);
        parser.buildParseTrees = true;
        return parser.declaration();
    }
}