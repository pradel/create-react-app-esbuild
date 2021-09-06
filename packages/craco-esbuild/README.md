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
const CracoEsbuildPlugin = require('craco-esbuild');

module.exports = {
  plugins: [{ plugin: CracoEsbuildPlugin }],
};
```

To use `craco` instead of `react-scripts` to manage our application, edit the `scripts` section of your `package.json`.

```diff
/* package.json */

"scripts": {
-   "start": "react-scripts start",
+   "start": "craco start",
-   "build": "react-scripts build",
+   "build": "craco build"
-   "test": "react-scripts test",
+   "test": "craco test"
}
```

## Configuration

You can configure the options of the plugin by passing an `options` object.

- `esbuildLoaderOptions`: customise the options passed down to the `esbuild` loader. _Note: This will be used only by webpack_
- `esbuildMinimizerOptions`: customise the options passed down to `ESBuildMinifyPlugin`. _Note: This will be used only by webpack_
- `includePaths`: include external directories in loader.
- `enableSvgr`: enable the svgr webpack plugin. SVGs are loaded as separate files by default. Enabling this options allow you to import SVGs as React components. See [CRA documentation](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs) for more detailed explanation.
- `skipEsbuildJest`: Avoid using `esbuild-jest` for jest configuration. Could be useful to avoid compatibility issues with transpiling tests.
- `esbuildJestOptions`: customise the [options](https://github.com/aelbore/esbuild-jest#setting-up-jest-config-file-with-transformoptions) passed down to the `esbuild-jest` transformer.

For example add this configuration to your `craco.config.js` configuration file:

```js
// craco.config.js
const CracoEsbuildPlugin = require('craco-esbuild');

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        includePaths: ['/external/dir/with/components'], // Optional. If you want to include components which are not in src folder
        enableSvgr: true, // Optional.
        esbuildLoaderOptions: {
          // Optional. Defaults to auto-detect loader.
          loader: 'jsx', // Set the value to 'tsx' if you use typescript
          target: 'es2015',
        },
        esbuildMinimizerOptions: {
          // Optional. Defaults to:
          target: 'es2015',
          css: true, // if true, OptimizeCssAssetsWebpackPlugin will also be replaced by esbuild.
        },
        skipEsbuildJest: false, // Optional. Set to true if you want to use babel for jest tests,
        esbuildJestOptions: {
          loaders: {
            '.ts': 'ts',
            '.tsx': 'tsx',
          },
        },
      },
    },
  ],
};
```

## License

MIT © [Léo Pradel](https://www.leopradel.com/)
