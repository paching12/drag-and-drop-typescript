const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/app.ts"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
  },
  devtool: "inline-source-map",
  devServer: {
    open: true,
    port: 3000,
    static: path.join(__dirname, "/"),
    hot: true,
    historyApiFallback: { index: "index.html" },
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
