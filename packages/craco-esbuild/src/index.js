const fs = require("fs");
const { loaderByName, removeLoaders, addAfterLoader } = require("@craco/craco");
const { ESBuildPlugin } = require("esbuild-loader");

module.exports = {
  /**
   * To process the js/ts files we replace the babel-loader with the swc-loader
   */
  overrideWebpackConfig: ({
    webpackConfig,
    pluginOptions,
    context: { paths },
  }) => {
    const useTypeScript = fs.existsSync(paths.appTsConfig);

    // add esbuild-loader
    addAfterLoader(webpackConfig, loaderByName("babel-loader"), {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: paths.appSrc,
      loader: require.resolve("esbuild-loader"),
      options:
        pluginOptions && pluginOptions.esbuildLoaderOptions
          ? pluginOptions.esbuildLoaderOptions
          : {
              loader: useTypeScript ? "tsx" : "jsx",
              target: "es2015",
            },
    });

    // remove the babel loaders
    removeLoaders(webpackConfig, loaderByName("babel-loader"));

    webpackConfig.plugins.push(new ESBuildPlugin());

    return webpackConfig;
  },

  /**
   * To process the js/ts files we replace the babel-loader with the swc jest loader
   */
  // overrideJestConfig: ({
  //   jestConfig,
  //   pluginOptions,
  //   context: { env, paths, resolve, rootDir },
  // }) => {
  // // TODO
  //   return jestConfig;
  // },
};
