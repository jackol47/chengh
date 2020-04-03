const path = require('path');

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BUILD_PATH = path.resolve(__dirname, 'dist');

const SRC_PATH = path.resolve('./src');

const aliasObj = {
  react: path.join(__dirname, 'node_modules', 'react'),
};

const config = {
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.png'],
    alias: aliasObj,
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'prop-types'],
  },
  output: {
    filename: '[name].[hash].js',
    path: BUILD_PATH
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/],
        use: ['babel-loader?cacheDirectory=true'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, SRC_PATH)
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'Img/[name].[ext]',
          fallback: 'file-loader'
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, SRC_PATH)
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin([BUILD_PATH], { verbose: false }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.resolve(__dirname, './index.html'),
      inject: 'body',
      chunks: ['vendor', 'main', 'manifest'],
    })
  ],
};

module.exports = config;
