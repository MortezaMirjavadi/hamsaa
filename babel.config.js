function plugins() {
  const defaultPlugins = [
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-transform-runtime",
  ];

  if (process.env.NODE_ENV === "production") {
    defaultPlugins.push(["transform-remove-console", { exclude: ["error"] }]);
  }

  return defaultPlugins;
}

module.exports = {
  presets: [
    "@babel/preset-flow",
    "@babel/env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
  plugins: plugins(),
};
