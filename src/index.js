const plugin = require("tailwindcss/plugin");

const paddingUtilities = require("./paddingUtilities");
const marginUtilities = require("./marginUtilities");
const floatUtilities = require("./floatUtilities");
const insetUtilities = require("./insetUtilities");
const clearUtilities = require("./clearUtilities");
const borderRadiusUtilities = require("./borderRadiusUtilities");
const borderWidthUtilities = require("./borderWidthUtilities");
const textAlignUtilities = require("./textAlignUtilities");
const transformOriginUtilities = require("./transformOriginUtilities");
const spaceUtilities = require("./spaceUtilities");
const divideUtilities = require("./divideUtilities");

module.exports = plugin((helpers) => {
  const { addUtilities, matchUtilities, theme, variants } = helpers;
  paddingUtilities(helpers);
  marginUtilities(helpers);
  insetUtilities(helpers);
  borderRadiusUtilities(helpers);
  addUtilities(clearUtilities(helpers), variants("clear"));
  addUtilities(floatUtilities(helpers), variants("float"));
  borderWidthUtilities(helpers);
  addUtilities(textAlignUtilities(helpers), variants("textAlign"));
  addUtilities(transformOriginUtilities(), variants("transformOrigin"));
  spaceUtilities(helpers);
  divideUtilities(helpers);
});
