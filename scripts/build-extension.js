const { copyExtensionAssets, getPackageVersion, buildExtension } = require('./tasks')

const packageVersion = getPackageVersion()
const channel = process.env.CHANNEL || 'prod'
const release = `worklogtracker@${packageVersion}${channel === 'beta' ? '-beta' : ''}`

process.env.SENTRY_RELEASE = release

const browsers = ['chrome', 'firefox']

try {
  buildExtension()

  browsers.forEach(browser => {
    copyExtensionAssets({ channel, version: packageVersion, browser })
  })
} catch (e) {
  console.log(e.toString())
  process.exit(1)
}
