'use strict';

const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: __dirname,
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      'vue': '@vue/runtime-dom'
    },
    extensions: ['.js', '.json', '.vue', '.tsx', '.ts']
  },
  entry: {
    'index.umd': './src/index.ts',
    'index.umd.min': './src/index.ts',
  },
  externals: [
    'axios',
    'object-to-formdata',
    {
      'vue': {
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue'
      },
    }
  ],
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'LaravelForm',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: false,
          experimentalWatchApi: true,
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true,
    usedExports: false,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        extractComments: false,
        terserOptions: {
          output: {
            beautify: false,
            comments: false,
          },
          compress: {
            drop_console: true
          }
        }
      }),
    ]
  },
  plugins: [
    //
  ],
  devtool: false,
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
    children: false,
    entrypoints: false,
  },
};
