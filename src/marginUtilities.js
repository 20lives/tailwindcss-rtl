module.exports = ({ matchUtilities, theme }) => {
  matchUtilities(
    {
      ms: (value) => ({
        marginInlineStart: value,
      }),
      me: (value) => ({
        marginInlineEnd: value,
      }),
    },
    {
      supportsNegativeValues: true,
      values: theme("margin"),
    }
  );
};
