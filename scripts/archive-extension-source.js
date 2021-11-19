const sh = require('shelljs')
const zip = require('bestzip')

sh.mkdir('-p', `${__dirname}/../dist/firefox`)

zip({
  source: [
    './app',
    './extension',
    './electron/api',
    './scripts',
    './webpack',
    './tsconfig.json',
    './postcss.config.js',
    '.editorconfig',
    '.prettierrc',
    'LICENSE',
    'package.json',
    'README.md',
    'yarn.lock',
  ],
  destination: `${__dirname}/../dist/firefox/extension-source.zip`,
})
