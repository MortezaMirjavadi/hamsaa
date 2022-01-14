export const keys = ["xxs", "xs", "sm", "md", "lg", "xlg"];
const values = {
  xxs: 320,
  xs: 520,
  sm: 768,
  md: 960,
  lg: 1024,
  xlg: 1366,
};
const unit = "px";
const step = 5;
export const upWithoutMedia = (key) => {
  const value = typeof values[key] === "number" ? values[key] : key;
  return `(min-width:${value}${unit})`;
};
export const downWithoutMedia = (key) => {
  const index = keys.indexOf(key);

  if (index === keys.length - 1) return upWithoutMedia("xxs");

  const value = typeof values[key] === "number" ? values[key] : key;
  return `(max-width:${value - step / 100}${unit})`;
};

export default {
  palette: {
    primary: {
      light: "#586bda",
      main: "#334cd2",
      dark: "#293fbc",
    },
    secondary: {
      light: "#0bda87",
      main: "#0ab571",
      dark: "#08915a",
      darkThick: "#00B15F",
    },
    third: {
      light: "#696969",
      main: "#5f5f5f",
      dark: "#555",
    },
    error: {
      light: "#fa6b6b",
      main: "#f93737",
      dark: "#f70808",
    },
    warning: {
      light: "#ffe2af",
      main: "#ffbe49",
      dark: "#e29100",
      secondMain: "#ffab49",
    },
    text: {
      dark: "#333333",
      light: "#969696",
    },
  },
  menu: {
    light: "#3041d0",
    dark: "#2541d0",
  },
  shadows: {
    input: "0.5px 0.5px 1px rgba(0, 0, 0, 0.15);",
    specialShadowInput: "1.5px 1.5px 1.5px rgb(0 0 0 / 25%)",
  },
  borderRadius: {
    input: 3,
    button: 3,
  },
  fontFamily: "IRANYekan",
  breakPoints: {
    xxs: 320,
    xs: 520,
    sm: 768,
    md: 960,
    lg: 1024,
    xlg: 1366,
  },
  spacing: {
    unit: 10,
  },
  direction: "rtl",
};
