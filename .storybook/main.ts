import path from 'path'
import webpack from 'webpack'
import { StorybookConfig } from '@storybook/core-common'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|mdx|ts)'],
  addons: ['@storybook/addon-knobs'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (baseConfig: webpack.Configuration) => {
    if (baseConfig.resolve?.modules) {
      baseConfig.resolve.modules = [...baseConfig.resolve.modules, path.resolve('./')]
    }
    baseConfig.module?.rules?.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    })
    baseConfig.plugins?.push(
      new webpack.DefinePlugin({
        IS_STORYSHOT: process.env.IS_STORYSHOT ?? false,
        IS_PRODUCTION: false,
        IS_SERVER: false,
      })
    )
    return baseConfig
  },
}

// export default ではなく module.exportsを使用する必要がある(Jestのstoryshotが正常に動作しない)
// https://github.com/storybookjs/storybook/issues/10876#issuecomment-932991476
module.exports = config
