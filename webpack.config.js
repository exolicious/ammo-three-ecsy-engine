const path = require("path");

module.exports = {
  entry: {
    "main": path.resolve(__dirname, "source", "main.js")
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      "ecsy-three": path.resolve(__dirname, "src", "index.js")
    }
  },
  output: {
    path: path.resolve(__dirname, "source", "scripts"),
    filename: "[name].js",
  },
  devServer: {
    publicPath: "/scripts",
    contentBase: path.resolve(__dirname, "source"),
  },

};