import * as path from 'path'
import * as webpack from 'webpack'
import custom from '../build/webpack.client.conf'

module.exports = async ({ config }: { config: webpack.Configuration }) => {
  config.resolve!.modules = [
    ...(config.resolve!.modules || []),
    path.resolve(__dirname, '../'),
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../node_modules')
  ]
  config.resolve!.extensions!.push('.ts')
  config.plugins!.push(
    new webpack.DefinePlugin({
      IS_STORYSHOT: JSON.stringify(process.env.IS_STORYSHOT)
    })
  )
  return {
    ...config,
    module: { ...config.module, rules: custom({}, { mode: 'development' }).module!.rules }
  }
}
