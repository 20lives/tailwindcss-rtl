<p align="center">
<h1>
tailwindcss-rtl
</h1>
<a href="https://workcation-rtl.netlify.com/en/" >
  <img src="https://i.imgur.com/QSY8nNU.gif">
</a>
</a>
<br>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tailwindcss-rtl"><img src="https://img.shields.io/npm/dt/tailwindcss-rtl.svg" alt="Total Downloads"></a>
  <img src="https://img.shields.io/npm/v/tailwindcss-rtl.svg" alt="Latest Release">
</p>

## Introduction

Internationalization in semitic languages needs more than just translating texts, you would also need to mirror the layout horizontally.
This can be done by adding `dir="rtl"` the the layout `body` tag, but this is propably not be enough and you will need to create a diffirect style for RTL.

With **tailwindcss-rtl** plugin you will be able to support both RTL and LTR in the same style.

A full example can be seen here: [workaction-rtl](https://github.com/20lives/workcation-nuxt-i18n-rtl)

This plugin was inspired by [Elad Shechter's medium article](https://medium.com/@elad/the-best-way-to-rtl-your-website-with-sass-105e34a4298a) tackling the same issue with Sass.

## Installation

Install **tailwindcss-rtl** package:

```bash
# Yarn
yarn add tailwindcss-rtl --dev

# NPM
npm install tailwindcss-rtl --save-dev
```

Require `tailwindcss-rtl` in `tailwind.config.js` file:

```javascript
plugins: [
  require('tailwindcss-rtl'),
],
```

## Utilities

**tailwindcss-rtl* adds the *start* and *end* notations as substitue for *left* and *right*.

### Padding
| Class   | Description                 | LTR Property          | RTL Property          |
| ------- | --------------------------- | --------------------- | --------------------- |
| ps-[X]  | padding on start direction  | padding-left: [x]rem  | pedding-right: [x]rem |
| pe-[X]  | padding on end direction    | padding-right: [x]rem | pedding-left: [x]rem  |

[Padding docs](https://tailwindcss.com/docs/padding)

### Margin
| Class   | Description                 | LTR Property          | RTL Property          |
| ------- | --------------------------- | --------------------- | --------------------- |
| ms-[X]  | margin on start direction   | margin-left: [x]rem   | margin-right: [x]rem  |
| me-[X]  | margin on end direction     | margin-right: [x]rem  | margin-left: [x]rem   |

[Margin docs](https://tailwindcss.com/docs/margin)

### Float
| Class       | Description              | LTR Property | RTL Property |
| ----------- | ------------------------ | ------------ | ------------ |
| float-start | float to start direction | float: left  | float: right |
| float-end   | float to end direction   | float: right | float: left  |

[Float docs](https://tailwindcss.com/docs/margin)

### Right/Left
| Class     | Description              | LTR Property | RTL Property |
| --------- | ------------------------ | ------------ | ------------ |
| start-[X] | float to start direction | left: [x]    | right: [x]   |
| end-[X]   | float to end direction   | right: [x]   | left: [x]    |

[Right/Left docs](https://tailwindcss.com/docs/top-right-bottom-left)

### Clear
| Class       | Description              | LTR Property | RTL Property |
| ----------- | ------------------------ | ------------ | ------------ |
| clear-start | clear to start direction | clear: left  | clear: left  |
| clear-end   | clear to end direction   | clear: right | clear: right |

[Clear docs](https://tailwindcss.com/docs/clear)

### Border Radius
| Class          | LTR Property                                                     | RTL Property                                                      |
| -------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| rounded-s-[X]  | border-top-left-radius: [x] <br> border-bottom-left-radius: [x]  | border-top-right-radius: [x] <br> border-bottom-right-radius: [x] |
| rounded-e-[X]  | border-top-right-radius: [x] <br> border-bottom-right-radius: [x]| border-top-left-radius: [x] <br> border-bottom-left-radius: [x]   |
| rounded-ts-[X] | border-top-left-radius: [x]                                      | border-top-right-radius: [x]                                      |
| rounded-te-[X] | border-top-right-radius: [x]                                     | border-top-left-radius: [x]                                       |
| rounded-bs-[X] | border-bottom-right-radius: [x]                                  | border-top-right-radius: [x]                                      |
| rounded-be-[X] | border-bottom-left-radius: [x]                                   | border-top-left-radius: [x]                                       |

[Border radius docs](https://tailwindcss.com/docs/border-radius)

## Usage

Replace all padding, margins, floats and insets utilities with the corresponding utilities.

for example when you create an LTR layout and you would like to add left padding to an element you would normaly use `pl-6`, left is the start direction in LTR so you will replace it with `ps-6`.

Now add  `dir="rtl"` or `dir="ltr"` attribute to your top level layout element:

```html
<body dir="rtl">
```
[npm-version]: https://img.shields.io/npm/v/tailwindcss-rtl.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dw/tailwindcss-rtl?style=flat-square
[npm]: https://www.npmjs.org/package/tailwindcss-rtl
