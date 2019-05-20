import * as path from 'path'
import * as fs from 'fs'

// workaround for jest
export const requireContext = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
  // @ts-ignore
  if (typeof require.context !== 'undefined') {
    // @ts-ignore
    return require.context(base, scanSubDirectories, regularExpression)
  }
  const files = {}
  function readDirectory(directory: string) {
    fs.readdirSync(directory).forEach(file => {
      const fullPath = path.resolve(directory, file)

      if (fs.statSync(fullPath).isDirectory()) {
        if (scanSubDirectories) {
          readDirectory(fullPath)
        }
        return
      }
      if (!regularExpression.test(fullPath)) {
        return
      }
      // @ts-ignore
      files[fullPath] = true
    })
  }
  readDirectory(path.resolve(__dirname, base))
  function Module(file: string) {
    return require(file)
  }
  // @ts-ignore
  Module.keys = () => Object.keys(files)
  return Module
}
