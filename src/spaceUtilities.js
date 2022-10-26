module.exports = ({ matchUtilities, addUtilities, theme }) => {
  matchUtilities(
    {
      "space-s": (value) => ({
        "> :not([hidden]) ~ :not([hidden])": {
          "--tw-space-s-reverse": "0",
          marginInlineEnd: `calc(${value} * var(--tw-space-s-reverse))`,
          marginInlineStart: `calc(${value} * calc(1 - var(--tw-space-s-reverse)))`,
        },
      }),
    },
    {
      supportsNegativeValues: true,
      values: theme("space"),
    }
  );
  addUtilities({
    ".space-s-reverse > :not([hidden]) ~ :not([hidden])": {
      "--tw-space-s-reverse": "1",
    },
  });
};
