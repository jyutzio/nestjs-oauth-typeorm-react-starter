const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV, // Production for smaller bundle.
  entry: path.join(__dirname, 'src', 'frontend', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.join(__dirname, 'src', 'frontend'),
        exclude: /node_modules/,
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
      // {
      //   test: /\.svg$/,
      //   use: 'url-loader',
      // },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: 'url-loader',
      // },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  devServer: {
    port: 4200,
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
