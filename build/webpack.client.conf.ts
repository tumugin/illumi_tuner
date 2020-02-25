import baseConfig from './webpack.base.conf'
import * as webpack from 'webpack'
import * as path from 'path'
import WebpackBar from 'webpackbar'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'

export default function config(
  env: { [key: string]: string | undefined },
  argv: { [key: string]: string | undefined }
) {
  const base = baseConfig(env, argv)
  const config: webpack.Configuration = {
    ...base,
    entry: {
      app: path.resolve('src/main.ts')
    },
    plugins: [
      ...(base.plugins || []),
      new WebpackBar({
        color: '#7adad6',
        profile: true,
        name: 'client'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('public/index.html'),
        inject: true
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve('static/img'),
          to: path.resolve('dist/static/img'),
          toType: 'dir'
        },
        {
          from: path.resolve('static/img'),
          to: path.resolve('prod/static/img'),
          toType: 'dir'
        }
      ]),
      new VueSSRClientPlugin()
    ]
  }
  return config
}
