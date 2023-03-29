/*
Language: Juvix
Description: Juvix is a high-level programming language for writing privacy-preserving decentralised applications.
Author: Jonathan Cubides <jonathan@heliax.dev>
Category: Functional programming
Website: https://juvix.org
*/

var module = module ? module : {}; // shim for browser use

const kwAssign = '(:=)';
const kwAt = '@';
const kwAxiom = 'axiom';
const kwCase = 'case';
const kwColon = ':';
const kwEnd = 'end';
const kwHiding = 'hiding';
const kwHole = '_';
const kwImport = 'import';
const kwIn = 'in';
const kwInductive = 'type';
const kwInfix = 'infix';
const kwInfixl = 'infixl';
const kwInfixr = 'infixr';
const kwLambda = '(\\|λ)';
const kwLet = 'let';
const kwModule = 'module';
const kwOpen = 'open';
const kwPipe = '|';
const kwPostfix = 'postfix';
const kwPublic = 'public';
const kwRightArrow = '(->|→)';
const kwSemicolon = ';';
const kwType = 'Type';
const kwUsing = 'using';
const kwWildcard = '_';
const kwPositive = 'positive';
const kwTerminating = 'terminating';
const kwMapsTo = '(->|↦)';

const SYMBOLS = [
  '->',
  ':=',
  ':',
  '\\',
  '→',
  '↦',
  '>',
  '<',
  '=',
  '≠',
  '≤',
  '<=',
  '≥',
  '>=',
  '>>',
  '<<',
  '||',
  '&&'
];

const KEYWORDS = [
  '->',
  ':=',
  ':',
  '\\',
  '→',
  '↦',
  'axiom',
  'builtin',
  'case',
  'end',
  'hiding',
  'import',
  'in',
  // 'infix',
  // 'infixl',
  // 'infixr',
  'let',
  'module',
  'open',
  'positive',
  // 'postfix',
  'public',
  'terminating',
  'type',
  'Type',
  'using',
  'λ'
];

const MODULE_NAME_RE = /[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)*/;

function hljsDefineJuvix(hljs) {
  const INLINE_COMMENT = {
    scope: 'comment',
    begin: /--/,
    end: /$/
  };

  const BLOCK_COMMENT = {
    scope: 'comment',
    begin: /\{-/,
    end: /-\}/,
    relevance: 1
  };

  const COMMENT = {
    scope: 'comment',
    contains: ['self'],
    variants: [INLINE_COMMENT, BLOCK_COMMENT]
  };

  const NUMBER = {
    scope: 'number',
    variants: [
      { begin: "\\b(0b[01']+)" },
      {
        begin:
          "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
      },
      {
        begin:
          "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
      }
    ],
    relevance: 0
  };

  const IDEN = {
    scope: 'symbol',
    match: '.*'
  };

  const INFIX = {
    begin : [
      /(infix|infixl|infixr|postfix)/,
      /\s+/,
      /\d+/,
      /\s+/,
      /[^;]+/,
  ],
  beginScope: {
    1: 'keyword',
    3: 'number',
    5: 'symbol',
  },
  end: [/\s*/,
    /;/, /\s+/],
  endScope: {
    2: 'keyword',
  },
  contains: []
  };

  const SYMBOL_LIST = {
    scope: 'symbol_list',
    begin: /\{/,
    beginScope: 'keyword',
    end: /\}/,
    endScope: 'keyword',
    contains: [
      COMMENT,
      {
        end: kwSemicolon,
        endScope: 'keyword',
        endsWithParent: true,
        contains: [INFIX, COMMENT]
      }
    ]
  };

  // const QUALIFIED_ID = {
  //   scope: 'title',
  //   match: MODULE_NAME_RE
  // };


  return {
    name: 'Juvix',
    aliases: ['juvix'],
    case_insensitive: false, // language is case-insensitive
    unicodeRegex: true,
    disableAutodetect: true,
    keywords: KEYWORDS,
    // keywords: {
    //   keyword: KEYWORDS,
    // //   built_in: BUILT_INS,
    // //   literal: LITERALS,
    //   symbol: SYMBOLS,
    // //   'variable.language': LANGUAGE_VARIABLES
    // },
    contains: [COMMENT
      , INFIX
      , {'scope': 'keyword', 'match': kwAssign}
      // , SYMBOL_LIST
    ]
  };
}

module.exports = function (hljs) {
  hljs.registerLanguage('juvix', hljsDefineJuvix);
};

module.exports.definer = hljsDefineJuvix;
