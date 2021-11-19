const sh = require('shelljs')
const zip = require('bestzip')

const browsers = ['chrome', 'firefox']

browsers.forEach(browser => {
  sh.mkdir('-p', `${__dirname}/../dist/${browser}`)
  sh.cd(`${__dirname}/../build/extension/${browser}`)

  zip({
    source: '*',
    destination: `${__dirname}/../dist/${browser}/extension.${
      browser === 'firefox' ? 'xpi' : 'zip'
    }`,
  })
})
