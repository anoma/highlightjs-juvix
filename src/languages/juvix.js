/*
Language: Juvix
Description: Juvix is a high-level programming language for writing privacy-preserving decentralised applications.
Author: Jonathan Cubides <jonathan@heliax.dev>
Category: Functional programming
Website: https://juvix.org
*/

var module = module ? module : {}; // shim for browser use

const kwEnd = 'end';
const kwImport = 'import';
const kwPublic = 'public';
const kwSemicolon = ';';

const MODULE_NAME_RE = /[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)*/;

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

const MODULE_BEGIN = {
  scope: 'keyword',
  beginKeywords: 'module',
  end: hljs.MATCH_NOTHING_RE,
  contains: [
    BLOCK_COMMENT,
    {
      scope: 'title',
      begin: MODULE_NAME_RE,
      end: hljs.MATCH_NOTHING_RE,
      endsParent: true,
      contains: [
        BLOCK_COMMENT,
        {
          scope: 'keyword',
          begin: kwSemicolon,
          endsParent: true,
          contains: []
        }
      ]
    }
  ]
};

const MODULE_END = {
  scope: 'keyword',
  begin: kwEnd,
  end: kwSemicolon
};

const INFIX = {
  beginKeywords: 'infix infixl infixr postfix',
  end: hljs.MATCH_NOTHING_RE,
  contains: [
    COMMENT,
    {
      scope: 'number',
      begin: /\d+/,
      end: hljs.MATCH_NOTHING_RE,
      endsParent: true,
      contains: [
        COMMENT,
        {
          scope: 'symbol',
          begin: /[^\s;\{]+/, // TODO: \{ isnot properly handled
          end: kwSemicolon,
          endScope: 'keyword',
          endsParent: true,
          contains: [COMMENT]
        }
      ]
    }
  ]
};

const IMPORT = {
  beginKeywords: kwImport,
  end: hljs.MATCH_NOTHING_RE,
  contains: [
    COMMENT,
    {
      begin: [MODULE_NAME_RE],
      beginScope: {
        1: 'title'
      },
      end: hljs.MATCH_NOTHING_RE,
      endsParent: true,
      contains: [
        COMMENT,
        {
          scope: 'keyword',
          match: kwSemicolon,
          endsParent: true
        },
        {
          begin: [kwPublic],
          beginScope: {
            1: 'keyword'
          },
          end: hljs.MATCH_NOTHING_RE,
          endsParent: true,
          illegal: /--.*$/,
          contains: [
            COMMENT,
            {
              scope: 'keyword',
              match: kwSemicolon,
              endsParent: true
            }
          ]
        },
        {
          beginKeywords: 'hiding using',
          end: hljs.MATCH_NOTHING_RE,
          endsParent: true,
          contains: [
            COMMENT,
            {
              begin: /\{/,
              beginScope: 'keyword',
              end: /\}/,
              endScope: 'keyword',
              endsParent: true,
              contains: [
                COMMENT,
                {
                  begin: [/[a-zA-Z][a-zA-Z0-9_]*/],
                  beginScope: {
                    1: 'symbol'
                  },
                  contains: [
                    COMMENT,
                    {
                      scope: 'keyword',
                      match: kwSemicolon,
                      contains: [COMMENT]
                    }
                  ]
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
  beginKeywords: 'open',
  end: hljs.MATCH_NOTHING_RE,
  contains: [
    COMMENT,
    // open import .. here we use almost the same mode as import
    // but only one modification is needed: endsParent is set to true
    // REFACTOR: this is a bit hacky
    {
      endsParent: true,
      beginKeywords: kwImport,
      end: hljs.MATCH_NOTHING_RE,
      contains: [
        COMMENT,
        {
          begin: [MODULE_NAME_RE],
          beginScope: {
            1: 'title'
          },
          end: hljs.MATCH_NOTHING_RE,
          endsParent: true,
          contains: [
            COMMENT,
            {
              scope: 'keyword',
              match: kwSemicolon,
              endsParent: true
            },
            {
              begin: [kwPublic],
              beginScope: {
                1: 'keyword'
              },
              end: hljs.MATCH_NOTHING_RE,
              endsParent: true,
              illegal: /--.*$/,
              contains: [
                COMMENT,
                {
                  scope: 'keyword',
                  match: kwSemicolon,
                  endsParent: true
                }
              ]
            },
            {
              beginKeywords: 'hiding using',
              end: hljs.MATCH_NOTHING_RE,
              endsParent: true,
              contains: [
                COMMENT,
                {
                  begin: /\{/,
                  beginScope: 'keyword',
                  end: /\}/,
                  endScope: 'keyword',
                  endsParent: true,
                  contains: [
                    COMMENT,
                    {
                      begin: [/[a-zA-Z][a-zA-Z0-9_]*/],
                      beginScope: {
                        1: 'symbol'
                      },
                      contains: [
                        COMMENT,
                        {
                          scope: 'keyword',
                          match: kwSemicolon,
                          contains: [COMMENT]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    // open M (public)..
    {
      begin: [MODULE_NAME_RE],
      beginScope: {
        1: 'title'
      },
      end: hljs.MATCH_NOTHING_RE,
      endsParent: true,
      contains: [
        {
          scope: 'keyword',
          match: kwSemicolon,
          endsParent: true
        },
        {
          begin: [kwPublic],
          beginScope: {
            1: 'keyword'
          },
          end: hljs.MATCH_NOTHING_RE,
          endsParent: true,
          illegal: /--.*$/,
          contains: [
            COMMENT,
            {
              scope: 'keyword',
              match: kwSemicolon,
              endsParent: true
            }
          ]
        }
      ]
    }
  ]
};

const INDUCTIVE = {
  beginKeywords: 'type',
  end: [kwSemicolon],
  endScope: 'keyword',
  contains: [
    COMMENT,
    {
      begin: [/[a-zA-Z][a-zA-Z0-9_]*/],
      beginScope: {
        1: 'title'
      },
      end: hljs.MATCH_NOTHING_RE,
      endsParent: true,
      contains: [
        COMMENT,
        // ( A : Type ) : Type
        {
          begin: /\(/,
          end: /\)/,
          contains: [COMMENT]
        },
        {
          begin: /:=/,
          beginScope: 'keyword',
          end: kwSemicolon,
          endScope: 'keyword',
          endsParent: true,
          contains: [
            COMMENT
            // | id : typeSignature ;?
          ]
        }
      ]
    }
  ]
};

const STRINGS = {
  scope: 'string',
  variants: [hljs.QUOTE_STRING_MODE]
};

function hljsDefineJuvix(hljs) {
  return {
    name: 'Juvix',
    aliases: ['juvix'],
    case_insensitive: false, // language is case-insensitive
    unicodeRegex: true,
    disableAutodetect: true,
    keywords: {
      keyword: [
        'Type',
        'let',
        'in',
        'print',
        'type',
        'where',
        'Nat',
        'terminating',
        'positive',
        'axiom',
        'builtin'
      ],
      literal: ['true', 'false'],
      built_in: ['print', 'IO', 'if']
    },
    contains: [
      COMMENT,
      STRINGS,
      hljs.C_NUMBER_MODE,
      MODULE_BEGIN,
      MODULE_END,
      INFIX,
      OPEN,
      IMPORT,
      // TODO: refactor this
      { scope: 'keyword', match: /:=/ },
      { scope: 'keyword', match: /:/ },
      { scope: 'keyword', match: /\\/ },
      { scope: 'keyword', match: /->/ },
      { scope: 'keyword', match: /→/ },
      { scope: 'keyword', match: /↦/ },
      { scope: 'keyword', match: /\|/ },
      { scope: 'operator', match: />/ },
      { scope: 'operator', match: /</ },
      { scope: 'operator', match: /=/ },
      { scope: 'operator', match: /≠/ },
      { scope: 'operator', match: /≤/ },
      { scope: 'operator', match: /&&/ },
      { scope: 'operator', match: /\|\|/ },
      { scope: 'operator', match: /<=/ },
      { scope: 'operator', match: /≥/ },
      { scope: 'operator', match: />=/ },
      { scope: 'function', match: /,/ },
      { scope: 'function', match: /::/ }
    ]
  };
}

function hljsDefineJuvixRepl(hljs) {
  return {
    name: 'Juvix REPL',
    aliases: ['jrepl'],
    case_insensitive: false,
    unicodeRegex: true,
    contains: [
      COMMENT,
      hljs.C_NUMBER_MODE,
      {
        begin: [MODULE_NAME_RE, />/],
        beginScope: {
          1: 'title',
          2: 'meta.prompt'
        },
        relevance: 10,
        starts: {
          // // end the highlighting if we are on a new line and the line does not have at
          // // least six spaces in the beginning
          // end: /^(?![ ]{6})/,
          end: /$/,
          subLanguage: 'juvix'
        }
      }
    ]
  };
}

module.exports = function (hljs) {
  hljs.registerLanguage('juvix', hljsDefineJuvix);
  hljs.registerLanguage('jrepl', hljsDefineJuvixRepl);
};
