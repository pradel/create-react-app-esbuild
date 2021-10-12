const fs = require('fs');
const { loaderByName, removeLoaders, addAfterLoader } = require('@craco/craco');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const removeMinimizer = (webpackConfig, name) => {
  const idx = webpackConfig.optimization.minimizer.findIndex(
    (m) => m.constructor.name === name
  );
  webpackConfig.optimization.minimizer.splice(idx, 1);
};

const replaceMinimizer = (webpackConfig, name, minimizer) => {
  const idx = webpackConfig.optimization.minimizer.findIndex(
    (m) => m.constructor.name === name
  );
  idx > -1 && webpackConfig.optimization.minimizer.splice(idx, 1, minimizer);
};

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

    /**
     * Enable the svgr plugin
     * svg will not be loaded as a file anymore
     */
    if (pluginOptions && pluginOptions.enableSvgr) {
      webpackConfig.module.rules.unshift({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
    }

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

    // remove the babel loaders
    removeLoaders(webpackConfig, loaderByName('babel-loader'));

    // Replace terser with esbuild
    const minimizerOptions = (pluginOptions || {}).esbuildMinimizerOptions || {
      target: 'es2015',
      css: true,
    };
    replaceMinimizer(
      webpackConfig,
      'TerserPlugin',
      new ESBuildMinifyPlugin(minimizerOptions)
    );
    // remove the css OptimizeCssAssetsWebpackPlugin
    if (minimizerOptions.css) {
      removeMinimizer(webpackConfig, 'OptimizeCssAssetsWebpackPlugin');
    }
    return webpackConfig;
  },

  /**
   * To process the js/ts files we replace the babel-loader with the esbuild jest loader
   */
  overrideJestConfig: ({ jestConfig, pluginOptions }) => {
    if (pluginOptions && pluginOptions.skipEsbuildJest) return jestConfig;

    const defaultEsbuildJestOptions = {
      loaders: {
        '.js': 'jsx',
        '.test.js': 'jsx',
        '.ts': 'tsx',
        '.test.ts': 'tsx',
      },
    };

    const esbuildJestOptions =
      (pluginOptions && pluginOptions.esbuildJestOptions) ||
      defaultEsbuildJestOptions;

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
    jestConfig.transform[babelKey] = [
      require.resolve('esbuild-jest'),
      esbuildJestOptions,
    ];

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
        jestConfig.transform[key].push(esbuildJestOptions);
      } else {
        jestConfig.transform[key] = [
          jestConfig.transform[key],
          esbuildJestOptions,
        ];
      }
    });

    return jestConfig;
  },
};
