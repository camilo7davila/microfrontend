const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const path = require('path');


const devConfig = {
  entry: path.resolve(__dirname, '../src/boostrap.js'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].[contenthash].js',
    // publicPath: "http://localhost:8084/",
  },
  devServer: {
    port: 8085,
    open: '/',
    hot: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'webProfile',
      library: { type: 'var', name: 'webProfile' },
      filename: 'remoteEntry.js',
      exposes: {
        './WebProfile': './src/boostrap',
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
