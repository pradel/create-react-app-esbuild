---
'craco-esbuild': patch
---

Use require.resolve to import the '@svgr/webpack' loader, this solve an issue that monorepo can have.
