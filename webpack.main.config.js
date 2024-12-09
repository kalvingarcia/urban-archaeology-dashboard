const rules = require('./webpack.rules');
const {DefinePlugin} = require("webpack");
const {config} = require("dotenv");

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules
  },
  plugins: [
    new DefinePlugin({
      ...Object.entries(config().parsed).reduce((acc, curr) => ({...acc, [`${curr[0]}`]: JSON.stringify(curr[1])}), {})
    })
  ]
};
