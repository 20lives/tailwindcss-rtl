module.exports = ({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "border-s": (value) => ({
        borderInlineStartWidth: value,
      }),
      "border-e": (value) => ({
        borderInlineEndWidth: value,
      }),
    },
    {
      supportsNegativeValues: false,
      values: theme("borderWidth"),
    }
  );
};
