# Tailwind-dir plugin for Tailwindcss

[![npm package][npm-downloads]][npm]
[![npm package][npm-version]][npm]

## Introduction

**tailwind-dir** adding  **tailwindcss** utilities for creating bidirectional layouts.

## Installation

Install `tailwind-dir' package:

```bash
# Yarn
yarn add tailwind-dir --dev

# NPM
npm install tailwind-dir --save-dev
```

Require `tailwind-dir` in `tailwind.config.js` file:

```javascript
plugins: [
  require('tailwind-dir'),
],
```

## Utilities

**tailwind-dir** adds the *start* and *end* notations as substitue for *left* and *right*.

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

### Inset
| Class     | Description              | LTR Property | RTL Property |
| --------- | ------------------------ | ------------ | ------------ |
| start-[X] | float to start direction | left: [x]    | right: [x]   |
| end-[X]   | float to end direction   | right: [x]   | left: [x]    |

## Usage

Replace all padding, margins, floats and insets utilities with the corresponding utilities.

for example when you create an LTR layout and you would like to add left padding to an element you would normaly use `pl-6`, left is the start direction in LTR so you will replace it with `ps-6`.

Now add  `dir="rtl"` or `dir="ltr"` attribute to your top level layout element:

```html
<body dir="rtl">
```
[npm-version]: https://img.shields.io/npm/v/tailwind-dir.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dw/tailwind-dir?style=flat-square
[npm]: https://www.npmjs.org/package/tailwind-dir
