'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const path = require('path')
const utils = require('./utils')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {
  output: {
    path: resolve('prod')
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
    }),
    new CopyWebpackPlugin([
      {
        from: utils.resolve('static/img'),
        to: utils.resolve('prod/static/img'),
        toType: 'dir'
      }
    ])
  ]
})
