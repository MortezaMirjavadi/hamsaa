const baseConf = require("./webpack.config");
const env = require("./env");

const backendBaseUrl = env._BACKEND_BASE_URL;
const isProduction = env.NODE_ENV !== "production";

if (!isProduction) {
  if (!backendBaseUrl) {
    console.error("Please define BACKEND_BASE_URL in ./config.js file");
    throw new Error("BACKEND_BASE_URL is undefined");
  }
}

const conf = Object.assign({}, baseConf, {
  mode: "development",
  entry: {
    main: ["react-hot-loader/patch", "./app/client.js"],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public",
    publicPath: "/",
    hot: true,
    port: env._NODE_PORT,
    overlay: true,
    historyApiFallback: true,
    open: true,
  },
  resolve: {
    ...baseConf.resolve,
    alias: {
      "react-dom": "@hot-loader/react-dom",
      ...env._webpack_resolvers,
    },
  },
  plugins: [
    ...baseConf.plugins,
  ],
  module: {
    rules: [
      ...baseConf.module.rules,
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
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

module.exports = conf;
