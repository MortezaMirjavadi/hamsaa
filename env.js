const defaults = require("./defaultEnv");
const path = require("path");

const finalENV = {
  _NODE_PORT: process.env._NODE_PORT || defaults.env._NODE_PORT,
  NODE_ENV: process.env.NODE_ENV || defaults.env.NODE_ENV,
  _BACKEND_BASE_URL:
    process.env._BACKEND_BASE_URL || defaults.env._BACKEND_BASE_URL,
  _webpack_resolvers: {
    "@Root": path.resolve("./"),
    "@App": path.resolve("app"),
    "@Components": path.resolve("app/components/"),
    "@Libs": path.resolve("app/libs"),
    "@Utils": path.resolve("app/utils"),
    "@Helpers": path.resolve("app/helpers"),
    "@Routes": path.resolve("app/routes"),
    "@Config": path.resolve("app/config"),
    "@Screens": path.resolve("app/screens/"),
    "@Store": path.resolve("app/store/"),
    "@Assets": path.resolve("assets"),
  },
};

if (finalENV.NODE_ENV === "production") {
  finalENV._I_BACKEND_BASE_URL =
    process.env._I_BACKEND_BASE_URL ||
    finalENV._I_BACKEND_BASE_URL ||
    defaults._I_BACKEND_BASE_URL;
  if (typeof window === "undefined" && !finalENV._I_BACKEND_BASE_URL) {
    console.error(
      ">>>>>> _I_BACKEND_BASE_URL ENV var must be defined in production mode"
    );
  }
  if (typeof window === "undefined" && !process.env._BASE_URL) {
    console.error(
      ">>>>>> _BASE_URL ENV var must be defined in production mode"
    );
  }
} else {
  finalENV._I_BACKEND_BASE_URL =
    process.env._I_BACKEND_BASE_URL ||
    finalENV._I_BACKEND_BASE_URL ||
    defaults._I_BACKEND_BASE_URL ||
    finalENV._BACKEND_BASE_URL;
}

module.exports = finalENV;

