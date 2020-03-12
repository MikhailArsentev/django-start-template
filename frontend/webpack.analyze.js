/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: false,
        },
      },
    })],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
