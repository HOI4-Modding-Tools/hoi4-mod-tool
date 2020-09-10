// Generated from C:/Users/Damie/IdeaProjects/hoi4-mod-creator/grammars\DataFile.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var DataFileListener = require('./DataFileListener').DataFileListener;
var DataFileVisitor = require('./DataFileVisitor').DataFileVisitor;

var grammarFileName = "DataFile.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u000b;\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0007\u0003\u0012\n\u0003\f\u0003\u000e",
    "\u0003\u0015\u000b\u0003\u0003\u0003\u0003\u0003\u0007\u0003\u0019\n",
    "\u0003\f\u0003\u000e\u0003\u001c\u000b\u0003\u0003\u0003\u0003\u0003",
    "\u0007\u0003 \n\u0003\f\u0003\u000e\u0003#\u000b\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0004\u0003\u0004\u0005\u0004)\n\u0004\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0007\u00060\n\u0006\f\u0006",
    "\u000e\u00063\u000b\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0005\u00079\n\u0007\u0003\u0007\u0002\u0002\b\u0002\u0004\u0006",
    "\b\n\f\u0002\u0002\u0002<\u0002\u000e\u0003\u0002\u0002\u0002\u0004",
    "\u0013\u0003\u0002\u0002\u0002\u0006(\u0003\u0002\u0002\u0002\b*\u0003",
    "\u0002\u0002\u0002\n1\u0003\u0002\u0002\u0002\f8\u0003\u0002\u0002\u0002",
    "\u000e\u000f\u0007\u000b\u0002\u0002\u000f\u0003\u0003\u0002\u0002\u0002",
    "\u0010\u0012\u0007\u0003\u0002\u0002\u0011\u0010\u0003\u0002\u0002\u0002",
    "\u0012\u0015\u0003\u0002\u0002\u0002\u0013\u0011\u0003\u0002\u0002\u0002",
    "\u0013\u0014\u0003\u0002\u0002\u0002\u0014\u0016\u0003\u0002\u0002\u0002",
    "\u0015\u0013\u0003\u0002\u0002\u0002\u0016\u001a\u0005\u0002\u0002\u0002",
    "\u0017\u0019\u0007\u0003\u0002\u0002\u0018\u0017\u0003\u0002\u0002\u0002",
    "\u0019\u001c\u0003\u0002\u0002\u0002\u001a\u0018\u0003\u0002\u0002\u0002",
    "\u001a\u001b\u0003\u0002\u0002\u0002\u001b\u001d\u0003\u0002\u0002\u0002",
    "\u001c\u001a\u0003\u0002\u0002\u0002\u001d!\u0007\u0005\u0002\u0002",
    "\u001e \u0007\u0003\u0002\u0002\u001f\u001e\u0003\u0002\u0002\u0002",
    " #\u0003\u0002\u0002\u0002!\u001f\u0003\u0002\u0002\u0002!\"\u0003\u0002",
    "\u0002\u0002\"$\u0003\u0002\u0002\u0002#!\u0003\u0002\u0002\u0002$%",
    "\u0005\u0006\u0004\u0002%\u0005\u0003\u0002\u0002\u0002&)\u0005\b\u0005",
    "\u0002\')\u0005\f\u0007\u0002(&\u0003\u0002\u0002\u0002(\'\u0003\u0002",
    "\u0002\u0002)\u0007\u0003\u0002\u0002\u0002*+\u0007\u0006\u0002\u0002",
    "+,\u0005\n\u0006\u0002,-\u0007\u0007\u0002\u0002-\t\u0003\u0002\u0002",
    "\u0002.0\u0005\u0004\u0003\u0002/.\u0003\u0002\u0002\u000203\u0003\u0002",
    "\u0002\u00021/\u0003\u0002\u0002\u000212\u0003\u0002\u0002\u00022\u000b",
    "\u0003\u0002\u0002\u000231\u0003\u0002\u0002\u000249\u0007\b\u0002\u0002",
    "59\u0007\n\u0002\u000269\u0007\t\u0002\u000279\u0005\u0002\u0002\u0002",
    "84\u0003\u0002\u0002\u000285\u0003\u0002\u0002\u000286\u0003\u0002\u0002",
    "\u000287\u0003\u0002\u0002\u00029\r\u0003\u0002\u0002\u0002\b\u0013",
    "\u001a!(18"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, "'='", "'{'", "'}'" ];

var symbolicNames = [ null, "WS", "ENDLINE", "EQ", "OPEN_BRACE", "CLOSE_BRACE", 
                      "INT", "STRING", "FLOAT", "WORD" ];

var ruleNames =  [ "identifier", "declaration", "declarationBody", "block", 
                   "blockBody", "value" ];

function DataFileParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

DataFileParser.prototype = Object.create(antlr4.Parser.prototype);
DataFileParser.prototype.constructor = DataFileParser;

Object.defineProperty(DataFileParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

DataFileParser.EOF = antlr4.Token.EOF;
DataFileParser.WS = 1;
DataFileParser.ENDLINE = 2;
DataFileParser.EQ = 3;
DataFileParser.OPEN_BRACE = 4;
DataFileParser.CLOSE_BRACE = 5;
DataFileParser.INT = 6;
DataFileParser.STRING = 7;
DataFileParser.FLOAT = 8;
DataFileParser.WORD = 9;

DataFileParser.RULE_identifier = 0;
DataFileParser.RULE_declaration = 1;
DataFileParser.RULE_declarationBody = 2;
DataFileParser.RULE_block = 3;
DataFileParser.RULE_blockBody = 4;
DataFileParser.RULE_value = 5;


function IdentifierContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = DataFileParser.RULE_identifier;
    return this;
}

IdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IdentifierContext.prototype.constructor = IdentifierContext;

IdentifierContext.prototype.WORD = function() {
    return this.getToken(DataFileParser.WORD, 0);
};

IdentifierContext.prototype.enterRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.enterIdentifier(this);
	}
};

IdentifierContext.prototype.exitRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.exitIdentifier(this);
	}
};

IdentifierContext.prototype.accept = function(visitor) {
    if ( visitor instanceof DataFileVisitor ) {
        return visitor.visitIdentifier(this);
    } else {
        return visitor.visitChildren(this);
    }
};




DataFileParser.IdentifierContext = IdentifierContext;

DataFileParser.prototype.identifier = function() {

    var localctx = new IdentifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, DataFileParser.RULE_identifier);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 12;
        this.match(DataFileParser.WORD);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function DeclarationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = DataFileParser.RULE_declaration;
    return this;
}

DeclarationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DeclarationContext.prototype.constructor = DeclarationContext;

DeclarationContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext,0);
};

DeclarationContext.prototype.EQ = function() {
    return this.getToken(DataFileParser.EQ, 0);
};

DeclarationContext.prototype.declarationBody = function() {
    return this.getTypedRuleContext(DeclarationBodyContext,0);
};

DeclarationContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(DataFileParser.WS);
    } else {
        return this.getToken(DataFileParser.WS, i);
    }
};


DeclarationContext.prototype.enterRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.enterDeclaration(this);
	}
};

DeclarationContext.prototype.exitRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.exitDeclaration(this);
	}
};

DeclarationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof DataFileVisitor ) {
        return visitor.visitDeclaration(this);
    } else {
        return visitor.visitChildren(this);
    }
};




DataFileParser.DeclarationContext = DeclarationContext;

DataFileParser.prototype.declaration = function() {

    var localctx = new DeclarationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, DataFileParser.RULE_declaration);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 17;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===DataFileParser.WS) {
            this.state = 14;
            this.match(DataFileParser.WS);
            this.state = 19;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 20;
        this.identifier();
        this.state = 24;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===DataFileParser.WS) {
            this.state = 21;
            this.match(DataFileParser.WS);
            this.state = 26;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 27;
        this.match(DataFileParser.EQ);
        this.state = 31;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===DataFileParser.WS) {
            this.state = 28;
            this.match(DataFileParser.WS);
            this.state = 33;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }

        this.state = 34;
        this.declarationBody();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function DeclarationBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = DataFileParser.RULE_declarationBody;
    return this;
}

DeclarationBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DeclarationBodyContext.prototype.constructor = DeclarationBodyContext;

DeclarationBodyContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};

DeclarationBodyContext.prototype.value = function() {
    return this.getTypedRuleContext(ValueContext,0);
};

DeclarationBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.enterDeclarationBody(this);
	}
};

DeclarationBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.exitDeclarationBody(this);
	}
};

DeclarationBodyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof DataFileVisitor ) {
        return visitor.visitDeclarationBody(this);
    } else {
        return visitor.visitChildren(this);
    }
};




DataFileParser.DeclarationBodyContext = DeclarationBodyContext;

DataFileParser.prototype.declarationBody = function() {

    var localctx = new DeclarationBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, DataFileParser.RULE_declarationBody);
    try {
        this.state = 38;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case DataFileParser.OPEN_BRACE:
            this.enterOuterAlt(localctx, 1);
            this.state = 36;
            this.block();
            break;
        case DataFileParser.INT:
        case DataFileParser.STRING:
        case DataFileParser.FLOAT:
        case DataFileParser.WORD:
            this.enterOuterAlt(localctx, 2);
            this.state = 37;
            this.value();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function BlockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = DataFileParser.RULE_block;
    return this;
}

BlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BlockContext.prototype.constructor = BlockContext;

BlockContext.prototype.OPEN_BRACE = function() {
    return this.getToken(DataFileParser.OPEN_BRACE, 0);
};

BlockContext.prototype.blockBody = function() {
    return this.getTypedRuleContext(BlockBodyContext,0);
};

BlockContext.prototype.CLOSE_BRACE = function() {
    return this.getToken(DataFileParser.CLOSE_BRACE, 0);
};

BlockContext.prototype.enterRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.enterBlock(this);
	}
};

BlockContext.prototype.exitRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.exitBlock(this);
	}
};

BlockContext.prototype.accept = function(visitor) {
    if ( visitor instanceof DataFileVisitor ) {
        return visitor.visitBlock(this);
    } else {
        return visitor.visitChildren(this);
    }
};




DataFileParser.BlockContext = BlockContext;

DataFileParser.prototype.block = function() {

    var localctx = new BlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, DataFileParser.RULE_block);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 40;
        this.match(DataFileParser.OPEN_BRACE);
        this.state = 41;
        this.blockBody();
        this.state = 42;
        this.match(DataFileParser.CLOSE_BRACE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function BlockBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = DataFileParser.RULE_blockBody;
    return this;
}

BlockBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BlockBodyContext.prototype.constructor = BlockBodyContext;

BlockBodyContext.prototype.declaration = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(DeclarationContext);
    } else {
        return this.getTypedRuleContext(DeclarationContext,i);
    }
};

BlockBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.enterBlockBody(this);
	}
};

BlockBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.exitBlockBody(this);
	}
};

BlockBodyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof DataFileVisitor ) {
        return visitor.visitBlockBody(this);
    } else {
        return visitor.visitChildren(this);
    }
};




DataFileParser.BlockBodyContext = BlockBodyContext;

DataFileParser.prototype.blockBody = function() {

    var localctx = new BlockBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, DataFileParser.RULE_blockBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 47;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===DataFileParser.WS || _la===DataFileParser.WORD) {
            this.state = 44;
            this.declaration();
            this.state = 49;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = DataFileParser.RULE_value;
    return this;
}

ValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValueContext.prototype.constructor = ValueContext;

ValueContext.prototype.INT = function() {
    return this.getToken(DataFileParser.INT, 0);
};

ValueContext.prototype.FLOAT = function() {
    return this.getToken(DataFileParser.FLOAT, 0);
};

ValueContext.prototype.STRING = function() {
    return this.getToken(DataFileParser.STRING, 0);
};

ValueContext.prototype.identifier = function() {
    return this.getTypedRuleContext(IdentifierContext,0);
};

ValueContext.prototype.enterRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.enterValue(this);
	}
};

ValueContext.prototype.exitRule = function(listener) {
    if(listener instanceof DataFileListener ) {
        listener.exitValue(this);
	}
};

ValueContext.prototype.accept = function(visitor) {
    if ( visitor instanceof DataFileVisitor ) {
        return visitor.visitValue(this);
    } else {
        return visitor.visitChildren(this);
    }
};




DataFileParser.ValueContext = ValueContext;

DataFileParser.prototype.value = function() {

    var localctx = new ValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, DataFileParser.RULE_value);
    try {
        this.state = 54;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case DataFileParser.INT:
            this.enterOuterAlt(localctx, 1);
            this.state = 50;
            this.match(DataFileParser.INT);
            break;
        case DataFileParser.FLOAT:
            this.enterOuterAlt(localctx, 2);
            this.state = 51;
            this.match(DataFileParser.FLOAT);
            break;
        case DataFileParser.STRING:
            this.enterOuterAlt(localctx, 3);
            this.state = 52;
            this.match(DataFileParser.STRING);
            break;
        case DataFileParser.WORD:
            this.enterOuterAlt(localctx, 4);
            this.state = 53;
            this.identifier();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.DataFileParser = DataFileParser;
