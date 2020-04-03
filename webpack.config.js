const
  path = require('path'),
  webpack = require('webpack'),
  lib = './public/lib/';

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = NODE_ENV === 'development';

module.exports = {
  mode: NODE_ENV,

  entry: {
    'universal': `${lib}js/src/universal.js`,
    'home': `${lib}js/src/home.js`,
  },

  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, `${lib}js/dist/`),
    filename: '[name].bundle.js',
  },

  watch: IS_DEV,
  watchOptions: {
    poll: true, // keep watching // https://github.com/webpack/webpack/issues/2297
  },

  resolve: {
    extensions: ['*', '.js', '.es6', '.ts', '.tsx', '.scss', '.css'],
    modules: [
      path.resolve(__dirname, `${lib}`),
      'node_modules',
    ],
  },

  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: true,
  },

  module: {
    rules: [
      {
        test: /\.(es6|js)$/,
        include: [
          path.resolve(__dirname, `${lib}js/custom/`),
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['es2015'],
          },
        }],
      },
    ],
  },

  plugins: [],
};
