const webpack = require('webpack');
const path = require('path');

const config = require('./webpack.base.config');
const SRC_PATH = path.resolve('./src');

config.entry.main = [
  'webpack/hot/only-dev-server',
  path.resolve(__dirname, `${SRC_PATH}/index`),
];

config.devServer = {
  open: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  host: '0.0.0.0',
  port: '8088',
  proxy: {},
  compress: true,
  hot: true,
  // disableHostCheck: true
};

config.devtool = 'eval-source-map';

config.module.rules.push(
  {
    test: [/\.less$/, /\.css$/],
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          module: true,
          camelCase: true,
          localIdentName: '[name]_[local]_[hash:base64:5]',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require('autoprefixer')({
              browsers: [
                'last 2 versions',
                'iOS >= 8',
                'Safari >= 8',
                'Android >= 4',
                '> 1%',
              ]
            }),
            require('postcss-pxtorem')({
              rootValue: 100,
              propWhiteList: [],
              selectorBlackList: [/^html$/, /^\.px-/],
            }),
          ]
        }
      },
      { loader: 'less-loader' }
    ],
    exclude: /node_modules/,
    include: path.resolve(__dirname, SRC_PATH)
  },
)

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)

config.mode = 'development';

module.exports = config
