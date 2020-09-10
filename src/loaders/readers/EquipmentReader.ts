import EntityReader from "./EntityReader";
import EquipmentModel from "../../model/EquipmentModel";
import {DataFileLexer} from "../parsers/DataFileLexer";
import {DataFileParser} from "../parsers/DataFileParser";
import * as antlr4 from "antlr4";
import EntityBuilder from "../builders/EntityBuilder";

export default class EquipmentReader implements EntityReader<EquipmentModel> {
    read(input: string): any {
        const inputStream = new antlr4.InputStream(input);
        const lexer = new DataFileLexer(inputStream);
        const tokenStream = new antlr4.CommonTokenStream(lexer);
        const parser = new DataFileParser(tokenStream);
        parser.buildParseTrees = true;
        const tree = parser.declaration();
        return {
            "equipment": new EntityBuilder(EquipmentModel).buildFrom(tree)
        };
    }
}