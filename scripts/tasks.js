require('shelljs/global')
const fs = require('fs')

exports.copyExtensionAssets = ({ channel, version, browser }) => {
  const distFolder = channel === 'dev' ? './dev' : `./build/extension/${browser}`
  const assetsFolder = `${distFolder}/img`

  rm('-rf', distFolder)
  mkdir('-p', distFolder)
  mkdir('-p', assetsFolder)
  cp('-R', `extension/assets/${channel}/*`, assetsFolder)
  exec(`pug -O "{ channel: '${channel}' }" -o ${distFolder} extension/views/`)

  const manifestJsonContent = fs.readFileSync(`extension/manifest.${channel}.json`)
  const manifestJson = JSON.parse(String(manifestJsonContent))
  manifestJson.version = version

  if (browser === 'firefox') {
    manifestJson.permissions.push('webRequest', 'webRequestBlocking')
  }

  fs.writeFileSync(`${distFolder}/manifest.json`, JSON.stringify(manifestJson, null, 2))

  if (channel !== 'dev') {
    cp('-R', `./build/dist/*`, distFolder)
  }
}

exports.buildExtension = () => {
  const result = exec(
    `webpack --config webpack/prod.extension.config.js --progress --profile --colors`,
  )

  if (result.code !== 0) {
    throw new Error('Build failed')
  }
}

exports.getPackageVersion = () => {
  const packageJsonContent = fs.readFileSync('package.json')
  const packageJson = JSON.parse(String(packageJsonContent))

  return packageJson.version
}

