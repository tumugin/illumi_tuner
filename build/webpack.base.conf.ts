import * as webpack from 'webpack'
import * as path from 'path'
import { VueLoaderPlugin } from 'vue-loader'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default function config(
  env: { [key: string]: string | undefined },
  argv: { [key: string]: string | undefined },
  options?: { isSSR: boolean }
) {
  const isProduction = argv.mode === 'production'
  // production => cssを別途出力
  // debug => SSRでなければstyle-loaderを使用、SSRビルドでは使用できないためnull-loader
  const styleLoader = isProduction ? MiniCssExtractPlugin.loader : options?.isSSR ? 'null-loader' : 'style-loader'
  const config: webpack.Configuration = {
    output: {
      filename: 'static/[name].[hash].bundle.js',
      path: path.resolve(isProduction ? 'prod/' : 'dist/'),
      chunkFilename: 'static/[name].[hash].bundle.js',
      publicPath: '/'
    },
    devtool: isProduction ? false : 'source-map',
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
                happyPackMode: true,
                compilerOptions: {
                  module: 'esnext'
                }
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
              },
              extractCSS: isProduction
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
          use: [styleLoader, 'css-loader', 'postcss-loader']
        },
        {
          test: /\.styl(us)?$/,
          use: [styleLoader, 'css-loader', 'postcss-loader', 'stylus-loader']
        },
        {
          test: /\.scss$/,
          use: [styleLoader, 'css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
    },
    plugins: [new VueLoaderPlugin(), new MiniCssExtractPlugin({ filename: 'common.[chunkhash].css' })]
  }
  return config
}
