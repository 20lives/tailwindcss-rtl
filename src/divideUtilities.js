module.exports = ({ matchUtilities, addUtilities, theme }) => {
  matchUtilities(
    {
      "divide-s": (value) => ({
        "> :not([hidden]) ~ :not([hidden])": {
          "--tw-divide-s-reverse": "0",
          borderInlineEndWidth: `calc(${value} * var(--tw-divide-s-reverse))`,
          borderInlineStartWidth: `calc(${value} * calc(1 - var(--tw-divide-s-reverse)))`,
        },
      }),
    },
    {
      supportsNegativeValues: true,
      values: theme("divideWidth"),
    }
  );
  addUtilities({
    ".divide-s-reverse > :not([hidden]) ~ :not([hidden])": {
      "--tw-divide-s-reverse": "1",
    },
  });
};
