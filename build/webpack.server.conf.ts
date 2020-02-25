import * as webpack from 'webpack'
import baseConfig from './webpack.base.conf'
import * as path from 'path'
import WebpackBar from 'webpackbar'
import { VueLoaderPlugin } from 'vue-loader'
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin'
import nodeExternals from 'webpack-node-externals'

export default function config(
  env: { [key: string]: string | undefined },
  argv: { [key: string]: string | undefined }
) {
  const base = baseConfig(env, argv, { isSSR: true })
  const config: webpack.Configuration = {
    ...base,
    entry: { app: path.resolve('src/server-main.ts') },
    target: 'node',
    output: {
      path: path.resolve(argv.mode === 'production' ? 'prod-server/' : 'dist-server/'),
      libraryTarget: 'commonjs2'
    },
    optimization: undefined,
    externals: nodeExternals({
      whitelist: /\.css$/
    }),
    plugins: [
      ...(base.plugins || []),
      new WebpackBar({
        color: '#f7a1ba',
        profile: true,
        name: 'server'
      }),
      new VueSSRServerPlugin()
    ]
  }
  return config
}
