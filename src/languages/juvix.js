/*
Language: Juvix
Description: Juvix is a high-level programming language for writing privacy-preserving decentralised applications.
Author: Jonathan Cubides <jonathan@heliax.dev>
Category: Functional programming
Website: https://juvix.org
*/

var module = module ? module : {}; // shim for browser use

function hljsDefineJuvix(hljs) {
  const COMMENT = {
    variants: [
      // hljs.COMMENT('---', '$', { contains: [JUDOC_EXPR] }),
      hljs.COMMENT('--', '$'),
      hljs.COMMENT(/\{-/, /-\}/, { contains: ['self'] })
    ]
  };

  const KEYWORDS = ['module'];

  const BUILT_INS = ['trace'];

  const LITERALS = [];

  const SYMBOLS = [];

  const LANGUAGE_VARIABLES = [];

  return {
    name: 'Juvix',
    aliases: ['juvix'],
    case_insensitive: false, // language is case-insensitive
    keywords: {
      keyword: KEYWORDS,
      built_in: BUILT_INS,
      literal: LITERALS,
      symbol: SYMBOLS,
      'variable.language': LANGUAGE_VARIABLES
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      COMMENT,
      {
        // No markup, relevance booster
        begin: '->|<-'
      }
    ]
  };
}

module.exports = function (hljs) {
  hljs.registerLanguage('juvix', hljsDefineJuvix);
};

module.exports.definer = hljsDefineJuvix;
