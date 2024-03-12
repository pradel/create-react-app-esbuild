# Changelog

## 0.6.1

### Patch Changes

- [#77](https://github.com/pradel/create-react-app-esbuild/pull/77) [`14c3d80`](https://github.com/pradel/create-react-app-esbuild/commit/14c3d80ee8799615d23dd47075c1752fcc1742c4) Thanks [@pradel](https://github.com/pradel)! - Fix invalid craco version in package.json.

## 0.6.0

### Minor Changes

- [#73](https://github.com/pradel/create-react-app-esbuild/pull/73) [`935c2f9`](https://github.com/pradel/create-react-app-esbuild/commit/935c2f9ed35c9ef37ad3750652ad163508c50cb8) Thanks [@Crecket](https://github.com/Crecket)! - Updated esbuild-loader to v4 and craco to v7.

## 0.5.2

### Patch Changes

- [#63](https://github.com/pradel/create-react-app-esbuild/pull/63) [`8aa74cd`](https://github.com/pradel/create-react-app-esbuild/commit/8aa74cdce93d19955ac2050fbf6512981a9eaa0b) Thanks [@jiejasonliu](https://github.com/jiejasonliu)! - Include @craco/craco@7.0.0-alpha.* versions in peerDependencies

## 0.5.1

### Patch Changes

- [#57](https://github.com/pradel/create-react-app-esbuild/pull/57) [`615f523`](https://github.com/pradel/create-react-app-esbuild/commit/615f52337d8661b7307768f0cb5665b7e678559c) Thanks [@ottob](https://github.com/ottob)! - Add craco 7 to peerDependencies

## 0.5.0

### Minor Changes

- [#48](https://github.com/pradel/create-react-app-esbuild/pull/48) [`f276f85`](https://github.com/pradel/create-react-app-esbuild/commit/f276f850732c1faf8e5cb6fd0471f66c691f9ba2) Thanks [@pradel](https://github.com/pradel)! - 🚀 create-react-app 5 is now supported 🚀

  ## Breaking Changes

  - Removed the `enableSvgr` and `svgrOptions` options. Svgr is now working out of the box.
  - Drop support for CRA 3 and 4. As many underlying libraries have changed, CRA 4 and 3 are no longer supported. Check the [CRA changelog](https://github.com/facebook/create-react-app/releases/tag/v5.0.0) to see what changed.

  ## Migrating from 0.4.X to 0.5.X

  - You will first need to migrate your project to CRA 5. See the CRA [Migration guide](https://github.com/facebook/create-react-app/releases/tag/v5.0.0) for more information.
  - Upgrade `craco-esbuild` to version 0.5.0 or higher in your project.
  - If you are using `enableSvgr` or `svgrOptions` you can remove them from the `craco.config.js` file. Svgr is now working out of the box.

## 0.4.5

### Patch Changes

- [#49](https://github.com/pradel/create-react-app-esbuild/pull/49) [`9e09177`](https://github.com/pradel/create-react-app-esbuild/commit/9e09177ca75051749705b9b957c07b01aabfd0b9) Thanks [@pradel](https://github.com/pradel)! - Use require.resolve to import the '@svgr/webpack' loader, this solve an issue that monorepo can have.

## 0.4.4

### Patch Changes

- [#46](https://github.com/pradel/create-react-app-esbuild/pull/46) [`109a742`](https://github.com/pradel/create-react-app-esbuild/commit/109a7429b780c2c6dd1f55d12ae11e3ca72ed36a) Thanks [@pradel](https://github.com/pradel)! - Automate release process.

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.3](https://github.com/pradel/create-react-app-esbuild/compare/v0.4.2...v0.4.3) (2021-12-14)

### Features

- add `svgrOptions` to customize svgr plugin behavior ([#44](https://github.com/pradel/create-react-app-esbuild/issues/44)) ([4ebde9f](https://github.com/pradel/create-react-app-esbuild/commit/4ebde9fd73a0f243531a4570feb7873f8cacc55e))

### [0.4.2](https://github.com/pradel/create-react-app-esbuild/compare/v0.4.1...v0.4.2) (2021-10-12)

### Features

- replace minifier only when used ([#42](https://github.com/pradel/create-react-app-esbuild/issues/42)) ([7453334](https://github.com/pradel/create-react-app-esbuild/commit/745333410391d4bb97fef76d21c0afbc2e65b631))

### [0.4.1](https://github.com/pradel/create-react-app-esbuild/compare/v0.4.0...v0.4.1) (2021-09-22)

### Bug Fixes

- compatability with node 12 ([#40](https://github.com/pradel/create-react-app-esbuild/issues/40)) ([269dd30](https://github.com/pradel/create-react-app-esbuild/commit/269dd3055e59930ca4534aa7ab124f02883823e6))

## [0.4.0](https://github.com/pradel/create-react-app-esbuild/compare/v0.3.4...v0.4.0) (2021-09-06)

### ⚠ BREAKING CHANGES

- add esbuild css minification (#36)

### Features

- add esbuild css minification ([#36](https://github.com/pradel/create-react-app-esbuild/issues/36)) ([35214fb](https://github.com/pradel/create-react-app-esbuild/commit/35214fb9325f52f7a4406afc7c9359650aa820da))

### Miscellaneous Chores

- upgrade deps ([#37](https://github.com/pradel/create-react-app-esbuild/issues/37)) ([2d7079e](https://github.com/pradel/create-react-app-esbuild/commit/2d7079e81269bed793b447d6c854e53dd314afc2))

### [0.3.4](https://github.com/pradel/create-react-app-esbuild/compare/v0.3.3...v0.3.4) (2021-08-16)

### Features

- add `esbuildJestOptions` to override esbuild-jest's options ([#34](https://github.com/pradel/create-react-app-esbuild/issues/34)) ([cbd7d03](https://github.com/pradel/create-react-app-esbuild/commit/cbd7d031011f5ce10f8217c06868998ddf9f5af0))

### Miscellaneous Chores

- prettier ([6b8e8e4](https://github.com/pradel/create-react-app-esbuild/commit/6b8e8e469ed71b9812d8553260b952cee11e2edd))

### [0.3.3](https://github.com/pradel/create-react-app-esbuild/compare/v0.3.2...v0.3.3) (2021-07-25)

### Documentation

- improve example for typescript users ([2517cbc](https://github.com/pradel/create-react-app-esbuild/commit/2517cbcaf965a339002c2fefa7368b12a90ea58c))

### [0.3.2](https://github.com/pradel/create-react-app-esbuild/compare/v0.3.1...v0.3.2) (2021-04-28)

### Miscellaneous Chores

- upgrade deps ([#25](https://github.com/pradel/create-react-app-esbuild/issues/25)) ([f27f4e9](https://github.com/pradel/create-react-app-esbuild/commit/f27f4e9c4ad5dcb5a0e51106e0d667c338bda372))

### [0.3.1](https://github.com/pradel/create-react-app-esbuild/compare/v0.3.0...v0.3.1) (2021-03-16)

### Bug Fixes

- remove ESBuildPlugin import. ([#21](https://github.com/pradel/create-react-app-esbuild/issues/21)) ([2e25db5](https://github.com/pradel/create-react-app-esbuild/commit/2e25db51fd8678fcd8475a7abb5d75140ec0d0bb))

## [0.3.0](https://github.com/pradel/create-react-app-esbuild/compare/v0.2.1...v0.3.0) (2021-03-04)

### Features

- add svgr support ([#14](https://github.com/pradel/create-react-app-esbuild/issues/14)) ([1cac975](https://github.com/pradel/create-react-app-esbuild/commit/1cac975b3e487912e595ad803cf773e5b58de974))

### [0.2.1](https://github.com/pradel/create-react-app-esbuild/compare/v0.2.0...v0.2.1) (2021-02-27)

### Bug Fixes

- upgrade esbuild-jest to support jest mocks ([#16](https://github.com/pradel/create-react-app-esbuild/issues/16)) ([68dae43](https://github.com/pradel/create-react-app-esbuild/commit/68dae4360a01e692461d08b673ce61c8c196b777))

### Miscellaneous Chores

- upgrade esbuild-jest to 0.4 ([#13](https://github.com/pradel/create-react-app-esbuild/issues/13)) ([7db4e35](https://github.com/pradel/create-react-app-esbuild/commit/7db4e35a36f991f9e405d664b510875e2ed08a0c))

### Documentation

- document `includePaths` option ([49a9b1d](https://github.com/pradel/create-react-app-esbuild/commit/49a9b1dc6f10422cc5c413196c496431629cef3b))

## 0.2.0 (2021-01-18)

### Features

- custom include paths and esbuild jest config ([#5](https://github.com/pradel/create-react-app-esbuild/issues/5)) ([3438f09](https://github.com/pradel/create-react-app-esbuild/commit/3438f092f66e454119b03324e6387dbbe5a0261f))
- first version ([#1](https://github.com/pradel/create-react-app-esbuild/issues/1)) ([318ace0](https://github.com/pradel/create-react-app-esbuild/commit/318ace0957961e2482d45e041fc969a6bbaf4282))

### Miscellaneous Chores

- automate release ([#10](https://github.com/pradel/create-react-app-esbuild/issues/10)) ([4b9048c](https://github.com/pradel/create-react-app-esbuild/commit/4b9048cb353d2897b21d4b0fea3bcbfdca7a56f1))
- fix plugin name ([87442e0](https://github.com/pradel/create-react-app-esbuild/commit/87442e01067819b857766dfe9abd787a9ea8c61a))
- improve documentation ([efd3ffe](https://github.com/pradel/create-react-app-esbuild/commit/efd3ffed875aced377970ff36fb0271ce41c69a6))
- update esbuild-loader to 2.8.0 ([#9](https://github.com/pradel/create-react-app-esbuild/issues/9)) ([f5470af](https://github.com/pradel/create-react-app-esbuild/commit/f5470af7298f5a8b078447a20c5991e554b4bdac))
- upgrade deps ([#3](https://github.com/pradel/create-react-app-esbuild/issues/3)) ([682f8c3](https://github.com/pradel/create-react-app-esbuild/commit/682f8c352fe670964e88e05897e9b37bd0c82cbd))
