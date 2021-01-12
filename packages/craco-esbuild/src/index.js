const fs = require("fs");
const { loaderByName, removeLoaders, addAfterLoader } = require("@craco/craco");
const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");

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
    const { esbuildLoaderOptions } = pluginOptions;

    // add includePaths custom option, for including files/components in other folders than src
    // Used as in addition to paths.appSrc, optional parameter.
    const optionalIncludes = esbuildLoaderOptions && esbuildLoaderOptions.includePaths || [];

    // add esbuild-loader
    addAfterLoader(webpackConfig, loaderByName("babel-loader"), {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: [paths.appSrc, ...optionalIncludes],
      loader: require.resolve("esbuild-loader"),
      options:
        esbuildLoaderOptions
          ? esbuildLoaderOptions
          : {
              loader: useTypeScript ? "tsx" : "jsx",
              target: "es2015",
            },
    });

    // remove the babel loaders
    removeLoaders(webpackConfig, loaderByName("babel-loader"));

    // Replace terser with esbuild
    webpackConfig.optimization.minimizer[0] = new ESBuildMinifyPlugin(
      pluginOptions && pluginOptions.esbuildLoaderOptions
        ? pluginOptions.esbuildLoaderOptions
        : {
            target: "es2015",
          }
    );

    webpackConfig.plugins.push(new ESBuildPlugin());

    return webpackConfig;
  },

  /**
   * To process the js/ts files we replace the babel-loader with the esbuild jest loader
   */
  overrideJestConfig: ({ jestConfig }) => {
    // TODO add back once https://github.com/aelbore/esbuild-jest/issues/7 is fixed
    // // Replace babel transform with esbuild
    // const key = Object.keys(jestConfig.transform)[0];
    // jestConfig.transform[key] = [require.resolve("esbuild-jest")];

    return jestConfig;
  },
};
