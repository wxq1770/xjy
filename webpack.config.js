/* eslint-disable */
const webpack = require('webpack');
const path = require("path");
const cookieParser = require('cookie-parser');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const OfflinePlugin = require('offline-plugin');
const conf = require('./src/config');
const pkg = require('./package.json');
const p = process.env.NODE_ENV === 'production';

const extractLess = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  allChunks: true,
  disable: !p,
});

const entries = {
  entry: p ? [
    './index.js',
  ] : [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${process.env.PORT || 4686}`,
    'webpack/hot/only-dev-server',
    './index.js',
  ],
};

const commonPlugins = [
  extractLess,
  new HtmlWebpackPlugin({
    title: `${conf.name} ${conf.subname}`,
    chunks: ['entry'],
    template: 'index.ejs',
    filename: 'index.html',
    minify: {
      // removeComments: true,
      collapseWhitespace: true,
    },
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.PUBLIC_PATH': p ? `'/assets/'` : `'/'`,
  }),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb|zh-cn/),
  new webpack.LoaderOptionsPlugin({
    debug: !p,
  }),
  new Visualizer({
    filename: 'analysis.html',
  }),
];
const devPlugins = commonPlugins.concat([
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin(),
]);
const prdPlugins = commonPlugins.concat([
  new webpack.ExtendedAPIPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      // Because uglify reports so many irrelevant warnings.
      warnings: false,
    },
    output: {
      comments: false,
    },
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
      discardComments: { removeAll: true },
      reduceIdents: { keyframes: false },
      discardUnused: { keyframes: false },
    },
  }),
  new OfflinePlugin({
    externals: [
      '/locales/zh-CN.json',
      '/locales/en-US.json',
    ],
  }),
]);

module.exports = {
  devtool: !p ? 'cheap-module-eval-source-map' : '',
  context: path.join(__dirname, ''),
  entry: entries,
  output: {
    path: path.join(__dirname, 'assets/'),
    publicPath: p ? '/assets/' : '/',
    filename: p ? '[name].[hash].js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: p ?
        extractLess.extract({
          fallback: "style-loader",
          use: "css-loader",
        }) :
        [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }],
      },
      {
        test: /\.less$/,
        use: p ?
        extractLess.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
          }, {
            loader: "less-loader",
          }],
        }) :
        [{
          loader: "style-loader",
        }, {
          loader: "css-loader",
        }, {
          loader: "less-loader",
        }],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.(gif|jpe?g|png|woff|woff2|eot|ttf|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: p ?
              '[path][name].[ext]\?[hash]' :
              '[path][name].[ext]',
          },
        },
        // {
        //   loader: 'image-webpack-loader',
        //   query: {
        //     bypassOnDebug: true,
        //     mozjpeg: {
        //       progressive: true,
        //     },
        //     gifsicle: {
        //       interlaced: false,
        //     },
        //     optipng: {
        //       optimizationLevel: 4,
        //     },
        //     pngquant: {
        //       quality: '75-90',
        //       speed: 3,
        //     },
        //   },
        // }
        ],
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
    ],
  },
  plugins: !p ? devPlugins : prdPlugins,
  node: {
    fs: "empty",
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'img'),
      "node_modules",
    ],
    alias: {
      // 在这儿添加依赖的别名
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT || 4686,
    hot: true,
    inline: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: conf.api.origin,
        changeOrigin: true,
        secure: false,
      },
      // 这里添加代理
    },
  },
};
