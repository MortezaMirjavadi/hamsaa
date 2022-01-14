const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ResourceHintWebpackPlugin = require("resource-hints-webpack-plugin");
const env = require("./env");

const cwd = path.resolve(__dirname);

const backendBaseUrl = env._BACKEND_BASE_URL;

const isProduction = env.NODE_ENV !== "production";

if (!isProduction) {
  if (!backendBaseUrl) {
    console.error("Please define BACKEND_BASE_URL in ./config.js file");
    throw new Error("BACKEND_BASE_URL is undefined");
  }
}

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(cwd, "./views/index.ejs") }),
    new ResourceHintWebpackPlugin(),
  ],
  resolve: {
    extensions: [".js", ".css", ".scss"],
  },
  module: {
    rules: [
      {
        test: [path.join(cwd, "app")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: "babel_cache",
          },
        },
      },
    ],
  },
  output: {
    publicPath: "/",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
