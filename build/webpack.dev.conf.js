'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

const HOST = 'localhost'
const PORT = 8080

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    hot: true,
    contentBase: 'dist',
    compress: true,
    host: HOST,
    port: PORT,
    open: true,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    //new webpack.HotModuleReplacementPlugin()
  ],

  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  }
})
