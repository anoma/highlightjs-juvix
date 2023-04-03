/*
Language: Juvix Description: 

The following is specifically tailored for compatibility with HighlightJS
10.1.1, which is used in MdBook. Support for the latest version of HighlightJS,
v11.7, can be found at the following repository:
https://github.com/anoma/highlightjs-juvix 

Author: Jonathan Cubides <jonathan@heliax.dev> 
Category: Functional programming
Website: https://juvix.org
*/

var module = module ? module : {}; // shim for browser use
var MATCH_NOTHING_RE = /$^/; // to force a mode to never match

var INLINE_COMMENT = {
  className: 'comment',
  begin: /--/,
  end: /$/
};

var BLOCK_COMMENT = {
  className: 'comment',
  begin: /\{-/,
  end: /-\}/,
  relevance: 1
};

var COMMENT = {
  scope: 'comment',
  contains: ['self'],
  variants: [INLINE_COMMENT, BLOCK_COMMENT]
};

var STRINGS = {
  className: 'string',
  variants: [hljs.QUOTE_STRING_MODE]
};

var NUMBERS = hljs.C_NUMBER_MODE;

var MODULE_NAME_RE = /[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)*/;
var IDEN_RE = /[^(\s|;|\{|\}|\(|\)|@)]+/;

var OTHER_SYMBOLS_AND_OPERATORS = [
  {
    className: 'keyword',
    begin: /(@|:=|->|↦|;|\||\{|\}|\\|λ|\_)/,
    endsSameBegin: true
  },
  {
    className: 'operator',
    begin: /(\*|==|>>|=?>|<=?|-|\+)/,
    endsSameBegin: true
  },
  { className: 'punctuation', begin: /(\(|\))/, endsSameBegin: true }
];

function hljsDefineJuvix(hljs) {
  const JUVIX_KEYWORDS = {
    // The keywords not covered by the other modes are included here
    keyword: 'let in print terminating positive axiom builtin',
    built_in: 'trace IO if',
    literal: 'true false'
  };

  const MODULE_BEGIN = {
    className: 'keyword',
    begin: /module/,
    end: /;/,
    contains: [
      BLOCK_COMMENT,
      {
        className: 'title',
        begin: MODULE_NAME_RE,
        endsParent: true,
        contains: [BLOCK_COMMENT]
      }
    ]
  };

  const PUBLIC = {
    className: 'keyword',
    begin: /public/,
    end: /;/,
    endsParent: true,
    contains: [COMMENT]
  };

  const MODULE_END = {
    className: 'keyword',
    begin: /end/,
    end: /;/
  };

  const INFIX = {
    className: 'keyword',
    begin: /((infix(l|r)?)|postfix)/,
    end: MATCH_NOTHING_RE,
    contains: [
      COMMENT,
      {
        className: 'number',
        begin: /\d+/,
        end: MATCH_NOTHING_RE,
        endsParent: true,
        contains: [
          COMMENT,
          {
            className: 'symbol',
            begin: IDEN_RE,
            end: /;/,
            endsParent: true,
            contains: [COMMENT]
          }
        ]
      }
    ]
  };

  const IMPORT = {
    className: 'keyword',
    begin: /import/,
    end: MATCH_NOTHING_RE,
    endsParent: true,
    contains: [
      COMMENT,
      {
        className: 'title',
        begin: MODULE_NAME_RE,
        end: MATCH_NOTHING_RE,
        endsParent: true,
        contains: [
          COMMENT,
          PUBLIC,
          {
            className: 'keyword',
            begin: /;/,
            endsParent: true
          },
          {
            className: 'keyword',
            begin: /(hiding|using)/,
            end: MATCH_NOTHING_RE,
            contains: [
              COMMENT,
              {
                className: 'keyword',
                begin: /\{/,
                end: /\}/,
                endsParent: true,
                contains: [
                  COMMENT,
                  {
                    className: 'symbol',
                    begin: IDEN_RE,
                    contains: [COMMENT, PUBLIC]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const OPEN = {
    className: 'keyword',
    begin: /open/,
    end: MATCH_NOTHING_RE,
    contains: [
      COMMENT,
      IMPORT,
      {
        className: 'title',
        begin: MODULE_NAME_RE,
        end: MATCH_NOTHING_RE,
        endsParent: true,
        contains: [
          COMMENT,
          PUBLIC,
          {
            className: 'keyword',
            begin: /;/,
            endsParent: true
          }
        ]
      }
    ]
  };

  const INDUCTIVE = {
    className: 'inductive',
    begin: /type/,
    end: MATCH_NOTHING_RE,
    keywords: 'type',
    contains: [
      COMMENT,
      {
        className: 'symbol',
        begin: IDEN_RE,
        end: MATCH_NOTHING_RE,
        endsParent: true,
        contains: [
          COMMENT,
          // Type paramenters are skipt atm
          {
            //  ( A : Type )
            begin: /\(/,
            end: /\)/,
            contains: [
              COMMENT,
              {
                className: 'symbol',
                begin: IDEN_RE,
                end: MATCH_NOTHING_RE,
                endsParent: true,
                contains: [
                  COMMENT,
                  {
                    // type annotation
                    className: 'keyword',
                    begin: /:/,
                    end: /Type/,
                    endsParent: true
                  }
                ]
              }
            ]
          },
          {
            className: 'keyword',
            begin: /:[^=]/,
            end: /Type/
          },
          {
            className: 'keyword',
            begin: /:=/,
            end: /;/,
            endsParent: true,
            contains: [
              COMMENT,
              {
                // className: "keyword",
                begin: /\|/, // not mandatory but better to have it
                end: MATCH_NOTHING_RE,
                endsParent: true,
                contains: [
                  COMMENT,
                  'self',
                  {
                    // constructor name
                    className: 'aqui1',
                    begin: /[^(\s|;|\{|\}|\(|\)|@)]+(?=\s:\s)/,
                    end: MATCH_NOTHING_RE,
                    contains: [
                      COMMENT,
                      {
                        className: 'keyword',
                        begin: /:[^=]/,
                        end: /(\||;)/,
                        contains: [
                          COMMENT,
                          {
                            className: 'keyword',
                            begin: /(:|\{|\}|->|→|Type)/,
                            end: /\s*/
                          },
                          {
                            className: 'symbol',
                            begin: IDEN_RE,
                            contains: [COMMENT]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    className: 'keyword',
                    begin: /;/,
                    endsParent: true
                  }
                ]
              },
              {
                className: 'keyword',
                begin: /;/,
                endsParent: true
              }
            ]
          }
        ]
      }
    ]
  };

  const FUNCTION_SIGNATURE = {
    className: 'function',
    begin: /[^(\s|;|\{|\}|\(|\)|@)]+(?=\s+:\s+[^:=]*;)/,
    end: /;/,
    contains: [
      COMMENT,
      {
        className: 'keyword',
        begin: /:[^=]/,
        endsWithParent: true,
        contains: [
          COMMENT,
          {
            className: 'keyword',
            begin: /(:|\{|\}|->|→|Type)/,
            end: /\s+/
          },
          {
            className: 'symbol',
            begin: IDEN_RE,
            contains: [COMMENT]
          }
        ]
      }
    ]
  };

  var OPTS = [
    MODULE_BEGIN,
    MODULE_END,
    OPEN,
    IMPORT,
    INFIX,
    INDUCTIVE,
    FUNCTION_SIGNATURE,
    // In case the previous modes don't match, we try to match the rest of the
    // file with the following modes.
    COMMENT,
    NUMBERS,
    STRINGS,
    OTHER_SYMBOLS_AND_OPERATORS
  ];

  return {
    name: 'Juvix',
    aliases: ['juvix'],
    keywords: JUVIX_KEYWORDS,
    contains: OPTS.concat([
      {
        className: 'keyword',
        begin: /:(?=\s)/,
        end: MATCH_NOTHING_RE,
        contains: [
          COMMENT,
          {
            begin: /(:=|\)|\})/,
            className: 'keyword',
            endsParent: true
          },
          {
            className: 'keyword',
            begin: /(:|\{|\}|->|→|Type)/,
            end: /\s+/
          },
          {
            className: 'symbol',
            begin: IDEN_RE,
            contains: [COMMENT]
          }
        ]
      }
    ])
  };
}

function hljsDefineJuvixRepl(hljs) {
  var REPL_COMMANDS = {
    className: 'meta-prompt-command',
    begin: /:([a-z]+)/,
    contains: [
      {
        subLanguage: 'juvix',
        endsParent: true
      }
    ]
  };
  var REPL_EXPRESSION = [
    COMMENT,
    NUMBERS,
    STRINGS,
    REPL_COMMANDS,
    OTHER_SYMBOLS_AND_OPERATORS
  ];

  return {
    name: 'Juvix REPL',
    aliases: ['jrepl'],
    case_insensitive: false,
    unicodeRegex: true,
    keywords: {
      keyword: 'let in'
    },
    contains: REPL_EXPRESSION.concat([
      {
        className: 'meta-prompt',
        begin: /([a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*))*>/,
        contains: REPL_EXPRESSION.concat([
          {
            subLanguage: 'juvix',
            endsParent: true
          }
        ])
      }
    ])
  };
}

module.exports = function (hljs) {
  hljs.registerLanguage('juvix', hljsDefineJuvix);
  hljs.registerLanguage('jrepl', hljsDefineJuvixRepl);
};
