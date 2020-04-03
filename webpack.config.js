const
  path = require('path'),
  webpack = require('webpack'),
  libPath = './public/lib/';

const API_URL = {
  production: JSON.stringify('https://covidnow.com/'),
  development: JSON.stringify('http://localhost:8012/'),
};

const API_URL_NEWS = {
  production: JSON.stringify('https://covidnow.com/'),
  development: JSON.stringify('http://localhost:8013/'),
};

const API_URL_USA = {
  production: JSON.stringify('https://covidnow.com/'),
  development: JSON.stringify('http://localhost:8014/'),
};

const API_URL_GLOBAL = {
  production: JSON.stringify('https://covidnow.com/'),
  development: JSON.stringify('http://localhost:8015/'),
};

const API_URL_LOCAL = {
  production: JSON.stringify('https://covidnow.com/'),
  development: JSON.stringify('http://localhost:8016/'),
};

// check environment mode
const enviro = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode: 'development',

  entry: {
    // 'vendor': [
    //   'whatwg-fetch', // fetch polyfill
    //   'babel-polyfill', // async, await
    // ],
    'universal': `${libPath}js/custom/universal.js`,
    'home': `${libPath}js/custom/home.js`,
    'states': `${libPath}js/custom/states.js`,
    'read': `${libPath}js/custom/read.js`,
    'markets': `${libPath}js/custom/markets.js`,
  },

  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, `${libPath}js/dist/`),
    filename: '[name].bundle.js',
  },

  watch: true,
  watchOptions: {
    poll: true, // keep watching // https://github.com/webpack/webpack/issues/2297
  },

  resolve: {
    extensions: ['*', '.js', '.es6', '.ts', '.tsx', '.scss', '.css'],
    modules: [
      path.resolve(__dirname, `${libPath}`),
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
          path.resolve(__dirname, `${libPath}js/custom/`),
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['es2015'],
          },
        }],
      },
      // {
      //   test: /\.scss$/,
      //   use: [{
      //     loader: 'style-loader', // creates style nodes from JS strings
      //   }, {
      //     loader: 'css-loader', // translates CSS into CommonJS
      //   }, {
      //     loader: 'sass-loader', // compiles Sass to CSS
      //     options: {
      //       includePath: path.resolve(__dirname, `${libPath}lib/style/`),
      //     },
      //   }],
      // },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': API_URL[enviro],
      'process.env.API_URL_NEWS': API_URL_NEWS[enviro],
      'process.env.API_URL_USA': API_URL_USA[enviro],
      'process.env.API_URL_GLOBAL': API_URL_GLOBAL[enviro],
      'process.env.API_URL_LOCAL': API_URL_LOCAL[enviro],
    }),
  ],
};
