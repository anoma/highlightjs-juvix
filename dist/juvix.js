(() => {
  'use strict';
  var e = {
      d: (n, a) => {
        for (var i in a)
          e.o(a, i) &&
            !e.o(n, i) &&
            Object.defineProperty(n, i, { enumerable: !0, get: a[i] });
      },
      o: (e, n) => Object.prototype.hasOwnProperty.call(e, n),
      r: (e) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }
    },
    n = {};
  function a(e) {
    const n = {
        variants: [
          e.COMMENT('--', '$'),
          e.COMMENT(/\{-/, /-\}/, { contains: ['self'] })
        ]
      },
      a = { className: 'type', begin: "\\b[A-Z][\\w']*", relevance: 0 },
      i = {
        begin: '\\(',
        end: '\\)',
        illegal: '"',
        contains: [
          {
            className: 'type',
            begin: '\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?'
          },
          e.inherit(e.TITLE_MODE, { begin: "[_a-z][\\w']*" }),
          n
        ]
      },
      s = '([0-9]_*)+',
      t = '([0-9a-fA-F]_*)+',
      o = {
        className: 'number',
        relevance: 0,
        variants: [
          { match: `\\b(${s})(\\.(${s}))?([eE][+-]?(${s}))?\\b` },
          { match: `\\b0[xX]_*(${t})(\\.(${t}))?([pP][+-]?(${s}))?\\b` },
          { match: '\\b0[oO](([0-7]_*)+)\\b' },
          { match: '\\b0[bB](([01]_*)+)\\b' }
        ]
      };
    return {
      name: 'Juvix',
      aliases: ['juvix'],
      keywords:
        'let in if then else case of where do module open import public type data infix ',
      contains: [
        {
          beginKeywords: 'module',
          end: '',
          keywords: 'module end',
          contains: [i, n],
          illegal: '\\W\\.|;'
        },
        {
          begin: '\\bimport\\b',
          end: '$',
          keywords: 'import qualified as hiding',
          contains: [i, n],
          illegal: '\\W\\.|;'
        },
        {
          className: 'class',
          begin: '^(\\s*)?(class|instance)\\b',
          end: 'where',
          keywords: 'class family instance where',
          contains: [a, i, n]
        },
        {
          className: 'class',
          begin: '\\b(data|(new)?type)\\b',
          end: '$',
          keywords: 'data family type newtype deriving',
          contains: [PRAGMA, a, i, RECORD, n]
        },
        { beginKeywords: 'default', end: '$', contains: [a, i, n] },
        {
          beginKeywords: 'infix infixl infixr',
          end: '$',
          contains: [e.C_NUMBER_MODE, n]
        },
        {
          begin: '\\bforeign\\b',
          end: '$',
          keywords:
            'foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe',
          contains: [a, e.QUOTE_STRING_MODE, n]
        },
        {
          className: 'meta',
          begin: '#!\\/usr\\/bin\\/env runhaskell',
          end: '$'
        },
        PRAGMA,
        PREPROCESSOR,
        {
          scope: 'string',
          begin: /'(?=\\?.')/,
          end: /'/,
          contains: [{ scope: 'char.escape', match: /\\./ }]
        },
        e.QUOTE_STRING_MODE,
        o,
        a,
        e.inherit(e.TITLE_MODE, { begin: "^[_a-z][\\w']*" }),
        n,
        { begin: '->|<-' }
      ]
    };
  }
  e.r(n), e.d(n, { default: () => a }), (module.exports = n);
})();