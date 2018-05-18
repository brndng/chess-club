// module.exports = {
//     "extends": "airbnb-base"
// };

module.exports = {
  "extends": "airbnb",
  "rules": {
    "func-names": ["error", "never"],
    "import/extensions": "off",
    "import/no-unresolved": "off"
  },
  "env": {
      "browser": true,
      "node": true
  }
}