const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const env = require("./env");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const baseConf = require("./webpack.config");

const cwd = path.resolve(__dirname);

const conf = Object.assign({}, baseConf, {
  mode: "production",
  entry: {
    main: ["./app/client.js"],
  },
  output: {
    publicPath: "/",
  },
  plugins: [
    ...baseConf.plugins,
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new CompressionPlugin(),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    ...baseConf.resolve,
    alias: env._webpack_resolvers,
  },
  module: {
    rules: [
      ...baseConf.module.rules,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: [
          /\.(png|jpg|gif|mp4|ogv|ogg|webm|eot|svg|ttf|woff2?)$/i,
          /assets\/animations\/.*.json$/,
        ],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
});

conf.devtool = false;

conf.output.filename = "[name].[hash].bundle.js";
conf.output.chunkFilename = "[name].[hash].bundle.js";

module.exports = conf;
