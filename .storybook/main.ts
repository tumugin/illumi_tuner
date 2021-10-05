import path from 'path'
import webpack from 'webpack'

export default {
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
