module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react",
        "react-native",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/forbid-prop-types": 0,
      "no-use-before-define": 0, // stick to the common practice of defining styles after the component
      "no-underscore-dangle": 0
    }
};
