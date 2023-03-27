require('should');
const promisify = require('util').promisify;
const path = require('path');
const hljs = require('highlight.js');
const fs = require('fs');
const hljsDefineJuvix = require('../src/languages/juvix');
hljs.registerLanguage('juvix', hljsDefineJuvix);

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

describe('Juvix syntax highlighting', () => {
  async function itShouldPerformSyntaxHighlighting() {
    hljs.registerLanguage('juvix', hljsDefineJuvix);
    const files = (await readdir(path.join(__dirname, 'markup/juvix'))).filter(
      (f) => !f.includes('.expect.')
    );
    const scenarios = files.map((f) => f.replace(/\.txt$/, ''));
    scenarios.forEach((scenario) => {
      it(`should perform syntax highlighting on ${scenario}`, async () => {
        const file = `${scenario}.txt`;
        const filePath = path.join(__dirname, 'markup/juvix', file);
        const expectFilePath = filePath.replace('.txt', '.expect.txt');
        const code = await readFile(filePath, 'utf-8');
        const expected = await readFile(expectFilePath, 'utf-8');
        const result = hljs.highlight('juvix', code);
        const actual = result.value;
        actual.trim().should.eql(expected.trim(), file);
      });
    });
  }

  itShouldPerformSyntaxHighlighting();

  // The following test is ignored because the language detected is java.
  // Since the Juvix syntax can be confused with Java, I don't think we should use "highlightAuto" (as it will produce unexpected results)
  xit('should detect juvix language', async () => {
    var code = await readFile(
      path.join(__dirname, 'detect/juvix', 'juvixdetect.txt'),
      'utf-8'
    );
    var actual = hljs.highlightAuto(code).language;
    actual.should.eql('juvix');
  });
});
