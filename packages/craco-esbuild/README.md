# 🚀 craco-esbuild 🚀

Use [esbuild](https://github.com/evanw/esbuild) in your [create-react-app](https://create-react-app.dev/) with [craco](https://github.com/gsoft-inc/craco) for faster compilation, development and tests.

## Features

- Replace babel-loader with esbuild during development
- Replace babel-loader with esbuild for faster build time
- Replace terser with esbuild for faster build time
- Use esbuild when running jest

## Installation

Run the following command to install `craco-esbuild` in your project:

```sh
yarn add --dev craco-esbuild @craco/craco

# OR

npm install --save-dev craco-esbuild @craco/craco
```

## Usage

Add this configuration to your `craco.config.js` configuration file:

```js
// craco.config.js
const CracoEsbuildPlugin = require("craco-esbuild");

module.exports = {
  plugins: [{ plugin: CracoEsbuildPlugin }],
};
```

## Configuration

You can configure the options of the plugin by passing an `options` object.

- `esbuildLoaderOptions`: customise the options passed down to the `esbuild` loader. _Note: This will be used only by webpack_

For example add this configuration to your `craco.config.js` configuration file:

```js
// craco.config.js
const CracoEsbuildPlugin = require("craco-esbuild");

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        esbuildLoaderOptions: {
          loader: "jsx",
          target: "es2015",
        },
      },
    },
  ],
};
```

## License

MIT © [Léo Pradel](https://www.leopradel.com/)
