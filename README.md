# Juvix support for Highlight.js

[![GitHub](https://img.shields.io/github/license/anoma/highlightjs-juvix)](https://github.com/anoma/highlightjs-juvix/blob/main/LICENSE.md)

[![NPM Version](https://badge.fury.io/js/highlightjs-juvix.svg?style=flat)](https://npmjs.org/package/highlightjs-juvix)

[![CDN download](https://badgen.net/badge/jsDelivr/download/blue?icon=jsdelivr)](https://cdn.jsdelivr.net/npm/highlightjs-juvix/dist/juvix.min.js)

## Usage

Simply include the Highlight.js library in your webpage or Node app, then load this module. For more complex usage, see [highlight.js usage](https://github.com/highlightjs/highlight.js#basic-usage).

### Static website or simple usage

Simply load this module after loading Highlight.js. You'll use the minified version found in the `dist` directory. This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/juvix.min.js"></script>
<!-- Use any stylesheet you'd like - though it's best to choose from 
	those in highlightjs core repo -->
<link rel="stylesheet" href="https://unpkg.com/highlightjs/styles/vs.css" />
<script type="text/javascript">
  hljs.registerLanguage('juvix', hljsDefineJuvix); // this might not be needed
  hljs.registerLanguage('juvixRepl', hljsDefineJuvixRepl); // this might not be needed
  hljs.highlightAll();
</script>
```

This will find and highlight code inside `<pre><code>` tags; it tries to detect the language automatically. If automatic detection doesn’t work for you, you can specify the language in the `class` attribute:

```html
<pre>
    <code class="language-juvix">
      module HelloWorld;
      open import Stdlib.Prelude;
      main : IO;
      main := printStringLn "hello world!";
    </code>
</pre>
```

In case you want to highlight sessions with the Juvix REPL, you can use the following.

```html
<pre><code class="language-juvixRepl">
      Stdlib.Prelude> --example of a comment
      Stdlib.Prelude> 3 + 4
    </code></pre>
```

For more details see [Highlight.js main page](https://github.com/highlightjs/highlight.js#highlightjs).

### Using directly from jsDelivr

```html
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"></script>
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/highlightjs-juvix/dist/juvix.min.js"></script>
```

- More info: <https://www.jsdelivr.com/>

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlightjs');
var hljsJuvix = require('highlightjs-juvix');

hljs.registerLanguage('juvix', hljsJuvix);
hljs.highlightAll();
```

## License

Highlight.js is released under the BSD 3-Clause License. See [LICENSE](https://github.com/highlightjs/highlight.js/blob/main/LICENSE) file for details.
Highlightjs-juvix is released under the MIT License. See [LICENSE](/LICENSE.md) file for details.

## Contribution

Feel free to create issues and pull requests to improve this package.

## Links

- Learn more about Juvix: <https://juvix.org/>
- The official site for the Highlight.js library is <https://highlightjs.org/>.
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
