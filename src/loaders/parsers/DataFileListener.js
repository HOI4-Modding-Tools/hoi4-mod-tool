// Generated from C:/Users/Damie/IdeaProjects/hoi4-mod-creator/grammars\DataFile.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by DataFileParser.
function DataFileListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

DataFileListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
DataFileListener.prototype.constructor = DataFileListener;

// Enter a parse tree produced by DataFileParser#identifier.
DataFileListener.prototype.enterIdentifier = function(ctx) {
};

// Exit a parse tree produced by DataFileParser#identifier.
DataFileListener.prototype.exitIdentifier = function(ctx) {
};


// Enter a parse tree produced by DataFileParser#declaration.
DataFileListener.prototype.enterDeclaration = function(ctx) {
};

// Exit a parse tree produced by DataFileParser#declaration.
DataFileListener.prototype.exitDeclaration = function(ctx) {
};


// Enter a parse tree produced by DataFileParser#declarationBody.
DataFileListener.prototype.enterDeclarationBody = function(ctx) {
};

// Exit a parse tree produced by DataFileParser#declarationBody.
DataFileListener.prototype.exitDeclarationBody = function(ctx) {
};


// Enter a parse tree produced by DataFileParser#block.
DataFileListener.prototype.enterBlock = function(ctx) {
};

// Exit a parse tree produced by DataFileParser#block.
DataFileListener.prototype.exitBlock = function(ctx) {
};


// Enter a parse tree produced by DataFileParser#blockBody.
DataFileListener.prototype.enterBlockBody = function(ctx) {
};

// Exit a parse tree produced by DataFileParser#blockBody.
DataFileListener.prototype.exitBlockBody = function(ctx) {
};


// Enter a parse tree produced by DataFileParser#value.
DataFileListener.prototype.enterValue = function(ctx) {
};

// Exit a parse tree produced by DataFileParser#value.
DataFileListener.prototype.exitValue = function(ctx) {
};



exports.DataFileListener = DataFileListener;