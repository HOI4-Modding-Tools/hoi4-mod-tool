// Generated from C:/Users/Damie/IdeaProjects/hoi4-mod-creator/grammars\DataFile.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by DataFileParser.

function DataFileVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

DataFileVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
DataFileVisitor.prototype.constructor = DataFileVisitor;

// Visit a parse tree produced by DataFileParser#identifier.
DataFileVisitor.prototype.visitIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by DataFileParser#declaration.
DataFileVisitor.prototype.visitDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by DataFileParser#declarationBody.
DataFileVisitor.prototype.visitDeclarationBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by DataFileParser#block.
DataFileVisitor.prototype.visitBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by DataFileParser#blockBody.
DataFileVisitor.prototype.visitBlockBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by DataFileParser#value.
DataFileVisitor.prototype.visitValue = function(ctx) {
  return this.visitChildren(ctx);
};



exports.DataFileVisitor = DataFileVisitor;