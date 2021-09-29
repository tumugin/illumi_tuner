import path from 'path'
import webpack from 'webpack'

export default {
  stories: ['../**/*.stories.vue'],
  addons: [],
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
    return baseConfig
  },
}
