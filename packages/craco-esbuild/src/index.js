const fs = require('fs');
const {
  loaderByName,
  removeLoaders,
  addAfterLoader,
  addBeforeLoader,
} = require('@craco/craco');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  /**
   * To process the js/ts files we replace the babel-loader with the esbuild-loader
   */
  overrideWebpackConfig: ({
    webpackConfig,
    pluginOptions,
    context: { paths },
  }) => {
    const useTypeScript = fs.existsSync(paths.appTsConfig);
    const esbuildLoaderOptions =
      pluginOptions && pluginOptions.esbuildLoaderOptions;

    // add includePaths custom option, for including files/components in other folders than src
    // Used as in addition to paths.appSrc, optional parameter.
    const optionalIncludes =
      (pluginOptions && pluginOptions.includePaths) || [];

    // add esbuild-loader
    addAfterLoader(webpackConfig, loaderByName('babel-loader'), {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: [paths.appSrc, ...optionalIncludes],
      loader: require.resolve('esbuild-loader'),
      options: esbuildLoaderOptions
        ? esbuildLoaderOptions
        : {
            loader: useTypeScript ? 'tsx' : 'jsx',
            target: 'es2015',
          },
    });

    // handle svg via svgr
    addBeforeLoader(webpackConfig, loaderByName('esbuild-loader'), {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // remove the babel loaders
    removeLoaders(webpackConfig, loaderByName('babel-loader'));

    // Replace terser with esbuild
    webpackConfig.optimization.minimizer[0] = new ESBuildMinifyPlugin(
      pluginOptions && pluginOptions.esbuildLoaderOptions
        ? pluginOptions.esbuildLoaderOptions
        : {
            target: 'es2015',
          }
    );

    webpackConfig.plugins.push(new ESBuildPlugin());

    return webpackConfig;
  },

  /**
   * To process the js/ts files we replace the babel-loader with the esbuild jest loader
   */
  overrideJestConfig: ({ jestConfig }) => {
    const options = {
      loaders: {
        '.js': 'jsx',
        '.test.js': 'jsx',
        '.ts': 'tsx',
        '.test.ts': 'tsx',
      },
    };

    // Replace babel transform with esbuild
    // babelTransform is first transformer key
    /* 
    transform:
      {
        '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'node_modules\\react-scripts\\config\\jest\\babelTransform.js',
        '^.+\\.css$': 'node_modules\\react-scripts\\config\\jest\\cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': 'node_modules\\react-scripts\\config\\jest\\fileTransform.js'
      }
    */
    const babelKey = Object.keys(jestConfig.transform)[0];

    // We replace babelTransform and add loaders to esbuild-jest
    jestConfig.transform[babelKey] = [require.resolve('esbuild-jest'), options];

    // Adds loader to all other transform options (2 in this case: cssTransform and fileTransform)
    // Reason for this is esbuild-jest plugin. It considers only loaders or other options from the last transformer
    // You can see it for yourself in: /node_modules/esbuild-jest/esbuid-jest.js:21 getOptions method
    // also in process method line 32 gives empty loaders, because options is already empty object
    // Issue reported here: https://github.com/aelbore/esbuild-jest/issues/18
    Object.keys(jestConfig.transform).forEach((key) => {
      if (babelKey === key) return; // ebuild-jest transform, already has loader

      // Checks if value is array, usually it's not
      // Our example is above on 70-72 lines. Usually default is: {"\\.[jt]sx?$": "babel-jest"}
      // (https://jestjs.io/docs/en/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object)
      // But we have to cover all the cases
      if (
        Array.isArray(jestConfig.transform[key]) &&
        jestConfig.transform[key].length === 1
      ) {
        jestConfig.transform[key].push(options);
      } else {
        jestConfig.transform[key] = [jestConfig.transform[key], options];
      }
    });

    return jestConfig;
  },
};
