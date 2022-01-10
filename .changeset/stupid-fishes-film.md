---
'craco-esbuild': minor
---

🚀 create-react-app 5 is now supported 🚀

## Breaking Changes

- Removed the `enableSvgr` and `svgrOptions` options. Svgr is now working out of the box.
- Drop support for CRA 3 and 4. As many underlying libraries have changed, CRA 4 and 3 are no longer supported. Check the [CRA changelog](https://github.com/facebook/create-react-app/releases/tag/v5.0.0) to see what changed.

## Migrating from 0.4.X to 0.5.X

- You will first need to migrate your project to CRA 5. See the CRA [Migration guide](https://github.com/facebook/create-react-app/releases/tag/v5.0.0) for more information.
- Upgrade `craco-esbuild` to version 0.5.0 or higher in your project.
- If you are using `enableSvgr` or `svgrOptions` you can remove them from the `craco.config.js` file. Svgr is now working out of the box.
