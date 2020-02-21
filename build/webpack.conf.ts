import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import WebpackBar from 'webpackbar'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import * as path from 'path'

export default function config(
  env: { [key: string]: string | undefined },
  argv: { [key: string]: string | undefined }
) {
  const config: webpack.Configuration = {
    output: {
      filename: '[name].[hash].bundle.js',
      path: path.resolve(argv.mode === 'production' ? 'prod/' : 'dist/'),
      chunkFilename: '[name].[hash].bundle.js',
      publicPath: '/'
    },
    entry: {
      app: path.resolve('src/main.ts')
    },
    devtool: argv.mode === 'production' ? false : 'eval-source-map',
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      },
      namedModules: true,
      noEmitOnErrors: true
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
        '@': path.resolve('src/')
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'thread-loader',
              options: {
                workers: require('os').cpus().length - 1
              }
            },
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                happyPackMode: true
              }
            }
          ]
        },
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader',
            options: {
              esModule: true,
              cacheBusting: true,
              loaders: {
                scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
                sass: 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax',
                css: 'vue-style-loader!css-loader!postcss-loader'
              }
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'media/[name].[hash:7].[ext]'
            }
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[hash:7].[ext]'
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.styl(us)?$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new WebpackBar({
        color: '#58A6DC',
        profile: true
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('public/index.html'),
        inject: true
      }),
      new VueLoaderPlugin(),
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
      ])
    ]
  }
  return config
}
