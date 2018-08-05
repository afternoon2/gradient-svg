# gradient-svg.js

This module creates svg gradient output for gradient.js modules.

[![License](https://img.shields.io/npm/l/gradient-svg.svg?style=flat)](https://github.com/afternoon2/gradient-svg/blob/master/LICENSE)&nbsp;&nbsp;
[![Travis build](https://img.shields.io/travis/afternoon2/gradient-svg.svg?style=flat)](https://travis-ci.org/afternoon2/gradient-css)&nbsp;&nbsp;[![Codecov](https://img.shields.io/codecov/c/github/afternoon2/gradient-svg.svg?style=flat)](https://codecov.io/gh/afternoon2/gradient-css)

## Table of contents
* [gradient.js](#gradient.js)
* [Usage](#usage)
* [Options](#options)

---
## gradient.js
### Gradient creation library running in the browser 🖌🌈

gradient.js is a javascript module that takes your source colors array and configuration object, and returns a gradient suitable for your needs.

---


## Usage

```javascript
const svg = new Svg()

const gradient = svg.get([
    [100, 34, 230, 0.5],
    [10, 33, 20, 0.6],
    [1, 12, 12, 0.3]
],{
    base: {
        interpolation: 'linear',
        mode: 'rgb',
        samples: 40,
        lightnessCorrection: true
    },
    svg: {
        type: 'radial',
        cx: 0.5,
        cy: 0.5,
        r: 0.3,
        spreadMethod: 'reflect'
    }
})
```

## Options

```typescript
{
    type: 'linear' | 'radial'
    id: sting // gradient's unique identifier
    angle?: number // between 0 and 359
    x1?: number // linear gradient's first point's position on the x axis
    y1?: number // linear gradient's first point's position on the y axis
    x2? number // linear gradient's second point's position on the x axis
    y2?: number // linear gradient's second point's position on the y axis
    cx?: number // radial gradient's center point position on the x axis
    cy?: number // radial gradient's center point position on the y axis
    r?: number // radial gradient's radius
    fx?: number // radial gradient's focal point position on the x axis
    fy?: number // radial gradient's focal point position on the y axis
    spreadMethod?: 'pad' | 'repeat' | 'reflect'
    gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse'
}
```