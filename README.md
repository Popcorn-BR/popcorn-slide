<p align="center"><img width="200" src="https://firebasestorage.googleapis.com/v0/b/imagens-da997.appspot.com/o/popcorn-slide%2FPopcorn-logo.png?alt=media&token=cfcd67f0-d790-4563-843b-7b6cdc869d63" alt="Popcorn Slide Logo"></p>

# Popcorn Slide

[![Build Status](https://travis-ci.com/dennerrondinely/popcorn-slide.svg?branch=master)](https://travis-ci.com/dennerrondinely/popcorn-slide) [![Coverage Status](https://coveralls.io/repos/github/dennerrondinely/popcorn-slide/badge.svg?branch=dependabot/npm_and_yarn/eslint-4.18.2)](https://coveralls.io/github/dennerrondinely/popcorn-slide?branch=dependabot/npm_and_yarn/eslint-4.18.2)
![npm](https://img.shields.io/npm/dt/popcorn-slide) ![npm](https://img.shields.io/npm/v/popcorn-slide) ![GitHub](https://img.shields.io/github/license/dennerrondinely/popcorn-slide)

Popcorn-slide is a javascript component for creating image slides with the canvas without the need for css or html.

# Preview
<p align="center">
  <img width="900" src="https://raw.githubusercontent.com/dennerrondinely/popcorn-slide/feature/documentation/gif/1.gif" alt="Exemplo gif">
</p>
<p align="center">
  <img width="900" src="https://raw.githubusercontent.com/dennerrondinely/popcorn-slide/feature/documentation/gif/2.gif" alt="Exemplo gif">
</p>
<p align="center">
  <img width="900" src="https://raw.githubusercontent.com/dennerrondinely/popcorn-slide/feature/documentation/gif/3.gif" alt="Exemplo gif">
</p>

## Browser Support

![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png) | ![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) |
--- | --- | --- | --- | --- |
39+ ✔ | 42+ ✔ | 29+ ✔ | 10.1+ ✘ | Nope ✘ |


## Installation

```sh
$ npm install popcorn-canvas --save
```

## How to use

### ES6

```js
// to import a specific method
import PopcornSlide from 'popcorn-slide';

const canvas = document.getElementById('canvas')
const config = {
  canvas,
  list: [
    { url: 'image-1' },
    { url: 'image-2' },
    { url: 'image-3' },

  ],
  width: 1400,
  height: 662
}

const popcorn = new PopcornSlide(config);

```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## Authors

| ![Denner Rondinely](https://avatars0.githubusercontent.com/u/14242874?s=460&v=4)|
|:---------------------:|
|  [Denner Rondinely](https://github.com/dennerrondinely/)   |

See also the list of [contributors](https://github.com/dennerrondinely/popcorn-slide/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
