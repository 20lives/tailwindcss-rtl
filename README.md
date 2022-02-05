<h1 align="center">
  tailwindcss-rtl
</h1>
<p align="center">
  <a href="https://workcation-rtl.netlify.com/en/" >
    <img src="https://i.imgur.com/QSY8nNU.gif">
  </a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/tailwindcss-rtl"><img src="https://img.shields.io/npm/dt/tailwindcss-rtl.svg" alt="Total Downloads"></a>
  <a href="https://www.npmjs.com/package/tailwindcss-rtl"><img src="https://img.shields.io/npm/v/tailwindcss-rtl.svg" alt="Latest Release"> </a>
</p>


## Introduction

Internationalization in semitic languages needs more than just translating texts, you would also need to mirror the layout horizontally.
This can be done by adding `dir="rtl"` the the layout `body` tag, but this is propably not be enough and you will need to create a different style for RTL.

With **tailwindcss-rtl** plugin you will be able to support both RTL and LTR in the same style.

## Live demo

Full live demo based on the official tailwindcss course project is available here: 

[Workcation live demo](https://workcation-rtl.netlify.app/en/)

[Workcation-nuxt-i18n-rtl](https://github.com/20lives/workcation-nuxt-i18n-rtl)

## Usage

Replace all utilities based on Right/Left with the new utilities specified below.

for example when you create an LTR layout and you would like to add left padding to an element you would normaly use `pl-6`, left is the start direction in LTR so you will replace it with `ps-6`.

Now add  `dir="rtl"` or `dir="ltr"` attribute to your top level layout element:

```html
<body dir="rtl">
```


**Note:** _for all utilities to work as expected adding the **dir** attribute (both "rtl"/"ltr") to a top level tag is mandatory), even when "ltr" is assumed to be default._

## Installation

Install **tailwindcss-rtl** package:

```bash
# Yarn
yarn add tailwindcss-rtl --dev

# NPM
npm install tailwindcss-rtl --save-dev
```

Require `tailwindcss-rtl` in the project `tailwind.config.js` file:

```javascript
plugins: [
  require('tailwindcss-rtl'),
],
```

## Utilities

**tailwindcss-rtl* adds the *start* and *end* notations as substitue for *left* and *right*.

| Class          | Description                               | 
| -------------- | ----------------------------------------- |
| ps-[X]         | padding on start direction                |
| pe-[X]         | padding on end direction                  |
| ms-[X]         | margin on start direction                 |
| me-[X]         | margin on end direction                   |
| text-start     | text aligned at the start direction       |
| text-end      | text aligned at the end direction         |
| float-start    | float to start direction                  |
| float-end      | float to end direction                    |
| start-[X]      | placement of positioned elements on start |
| end-[X]        | placement of positioned elements on end   |
| clear-start    | clear to start direction                  |
| clear-end      | clear to end direction                    |
| rounded-s-[X]  | rounded borders on start direction        |
| rounded-e-[X]  | rounded borders on end direction          |
| rounded-ts-[X] | rounded borders on top start direction    |
| rounded-te-[X] | rounded borders on top end direction      |
| rounded-bs-[X] | rounded borders on bottom start direction |
| rounded-be-[X] | rounded borders on bottom end direction   |
| border-s-[X]   | border width on start direction           |
| border-e-[X]   | bordern width on end direction            |
| space-s-[X]    | space between child                       |
| divide-s-[X]   | border width between child elements       |

[npm-version]: https://img.shields.io/npm/v/tailwindcss-rtl.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dw/tailwindcss-rtl?style=flat-square
[npm]: https://www.npmjs.org/package/tailwindcss-rtl
