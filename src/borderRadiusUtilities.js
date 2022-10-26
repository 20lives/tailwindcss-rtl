module.exports = ({ matchUtilities, theme }) => {
  matchUtilities(
    {
      "rounded-e": (value) => ({
        '[dir="ltr"] &': {
          borderTopRightRadius: value,
          borderBottomRightRadius: value,
        },
        '[dir="rtl"] &': {
          borderTopLeftRadius: value,
          borderBottomLeftRadius: value,
        },
      }),
      "rounded-s": (value) => ({
        '[dir="ltr"] &': {
          borderTopLeftRadius: value,
          borderBottomLeftRadius: value,
        },
        '[dir="rtl"] &': {
          borderTopRightRadius: value,
          borderBottomRightRadius: value,
        },
      }),
      "rounded-te": (value) => ({
        '[dir="rtl"] &': {
          borderTopLeftRadius: value,
        },
        '[dir="ltr"] &': {
          borderTopRightRadius: value,
        },
      }),
      "rounded-ts": (value) => ({
        '[dir="ltr"] &': {
          borderTopLeftRadius: value,
        },
        '[dir="rtl"] &': {
          borderTopRightRadius: value,
        },
      }),
      "rounded-be": (value) => ({
        '[dir="ltr"] &': {
          borderBottomRightRadius: value,
        },
        '[dir="rtl"] &': {
          borderBottomLeftRadius: value,
        },
      }),
      "rounded-bs": (value) => ({
        '[dir="rtl"] &': {
          borderBottomRightRadius: value,
        },
        '[dir="ltr"] &': {
          borderBottomLeftRadius: value,
        },
      }),
    },
    {
      supportsNegativeValues: false,
      values: theme("inset"),
    }
  );
};
