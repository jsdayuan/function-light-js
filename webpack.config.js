const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: {
    main: './index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      //插件
      template: "index.html"
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}