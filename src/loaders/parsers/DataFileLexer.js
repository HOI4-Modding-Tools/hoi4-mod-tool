// Generated from C:/Users/Damie/IdeaProjects/hoi4-mod-creator/grammars\DataFile.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u000bL\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0005",
    "\u0003\u001f\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0007\u0003\u0007\u0003\b\u0006\b.\n\b\r\b\u000e\b/\u0003\t\u0003",
    "\t\u0007\t4\n\t\f\t\u000e\t7\u000b\t\u0003\t\u0003\t\u0003\n\u0006\n",
    "<\n\n\r\n\u000e\n=\u0003\n\u0003\n\u0006\nB\n\n\r\n\u000e\nC\u0003\u000b",
    "\u0003\u000b\u0003\f\u0006\fI\n\f\r\f\u000e\fJ\u00035\u0002\r\u0003",
    "\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\u0002\u000f\b\u0011",
    "\t\u0013\n\u0015\u0002\u0017\u000b\u0003\u0002\u0005\u0004\u0002\u000b",
    "\u000b\"\"\u0003\u00022;\u0006\u0002//C\\aac|\u0002O\u0002\u0003\u0003",
    "\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003",
    "\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003",
    "\u0002\u0002\u0002\u0002\u000f\u0003\u0002\u0002\u0002\u0002\u0011\u0003",
    "\u0002\u0002\u0002\u0002\u0013\u0003\u0002\u0002\u0002\u0002\u0017\u0003",
    "\u0002\u0002\u0002\u0003\u0019\u0003\u0002\u0002\u0002\u0005\u001e\u0003",
    "\u0002\u0002\u0002\u0007$\u0003\u0002\u0002\u0002\t&\u0003\u0002\u0002",
    "\u0002\u000b(\u0003\u0002\u0002\u0002\r*\u0003\u0002\u0002\u0002\u000f",
    "-\u0003\u0002\u0002\u0002\u00111\u0003\u0002\u0002\u0002\u0013;\u0003",
    "\u0002\u0002\u0002\u0015E\u0003\u0002\u0002\u0002\u0017H\u0003\u0002",
    "\u0002\u0002\u0019\u001a\t\u0002\u0002\u0002\u001a\u001b\u0003\u0002",
    "\u0002\u0002\u001b\u001c\b\u0002\u0002\u0002\u001c\u0004\u0003\u0002",
    "\u0002\u0002\u001d\u001f\u0007\u000f\u0002\u0002\u001e\u001d\u0003\u0002",
    "\u0002\u0002\u001e\u001f\u0003\u0002\u0002\u0002\u001f \u0003\u0002",
    "\u0002\u0002 !\u0007\f\u0002\u0002!\"\u0003\u0002\u0002\u0002\"#\b\u0003",
    "\u0002\u0002#\u0006\u0003\u0002\u0002\u0002$%\u0007?\u0002\u0002%\b",
    "\u0003\u0002\u0002\u0002&\'\u0007}\u0002\u0002\'\n\u0003\u0002\u0002",
    "\u0002()\u0007\u007f\u0002\u0002)\f\u0003\u0002\u0002\u0002*+\t\u0003",
    "\u0002\u0002+\u000e\u0003\u0002\u0002\u0002,.\u0005\r\u0007\u0002-,",
    "\u0003\u0002\u0002\u0002./\u0003\u0002\u0002\u0002/-\u0003\u0002\u0002",
    "\u0002/0\u0003\u0002\u0002\u00020\u0010\u0003\u0002\u0002\u000215\u0007",
    "$\u0002\u000224\u000b\u0002\u0002\u000232\u0003\u0002\u0002\u000247",
    "\u0003\u0002\u0002\u000256\u0003\u0002\u0002\u000253\u0003\u0002\u0002",
    "\u000268\u0003\u0002\u0002\u000275\u0003\u0002\u0002\u000289\u0007$",
    "\u0002\u00029\u0012\u0003\u0002\u0002\u0002:<\u0005\u000f\b\u0002;:",
    "\u0003\u0002\u0002\u0002<=\u0003\u0002\u0002\u0002=;\u0003\u0002\u0002",
    "\u0002=>\u0003\u0002\u0002\u0002>?\u0003\u0002\u0002\u0002?A\u00070",
    "\u0002\u0002@B\u0005\u000f\b\u0002A@\u0003\u0002\u0002\u0002BC\u0003",
    "\u0002\u0002\u0002CA\u0003\u0002\u0002\u0002CD\u0003\u0002\u0002\u0002",
    "D\u0014\u0003\u0002\u0002\u0002EF\t\u0004\u0002\u0002F\u0016\u0003\u0002",
    "\u0002\u0002GI\u0005\u0015\u000b\u0002HG\u0003\u0002\u0002\u0002IJ\u0003",
    "\u0002\u0002\u0002JH\u0003\u0002\u0002\u0002JK\u0003\u0002\u0002\u0002",
    "K\u0018\u0003\u0002\u0002\u0002\t\u0002\u001e/5=CJ\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function DataFileLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

DataFileLexer.prototype = Object.create(antlr4.Lexer.prototype);
DataFileLexer.prototype.constructor = DataFileLexer;

Object.defineProperty(DataFileLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

DataFileLexer.EOF = antlr4.Token.EOF;
DataFileLexer.WS = 1;
DataFileLexer.ENDLINE = 2;
DataFileLexer.EQ = 3;
DataFileLexer.OPEN_BRACE = 4;
DataFileLexer.CLOSE_BRACE = 5;
DataFileLexer.INT = 6;
DataFileLexer.STRING = 7;
DataFileLexer.FLOAT = 8;
DataFileLexer.WORD = 9;

DataFileLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

DataFileLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

DataFileLexer.prototype.literalNames = [ null, null, null, "'='", "'{'", 
                                         "'}'" ];

DataFileLexer.prototype.symbolicNames = [ null, "WS", "ENDLINE", "EQ", "OPEN_BRACE", 
                                          "CLOSE_BRACE", "INT", "STRING", 
                                          "FLOAT", "WORD" ];

DataFileLexer.prototype.ruleNames = [ "WS", "ENDLINE", "EQ", "OPEN_BRACE", 
                                      "CLOSE_BRACE", "DIGIT", "INT", "STRING", 
                                      "FLOAT", "CHARACTER", "WORD" ];

DataFileLexer.prototype.grammarFileName = "DataFile.g4";


exports.DataFileLexer = DataFileLexer;

