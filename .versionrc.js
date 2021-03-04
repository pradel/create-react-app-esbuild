module.exports = {
  // Where we read the current version
  packageFiles: 'packages/craco-esbuild/package.json',
  // Empty array as we update the version in the release bash script
  bumpFiles: [
    {
      filename: 'packages/craco-esbuild/package.json',
      type: 'json',
    },
  ],
  scripts: {
    postbump: 'yarn && git add yarn.lock && yarn prettier',
  },
  // Configuration passed down to the preset
  types: [
    {
      type: 'feat',
      section: 'Features',
    },
    {
      type: 'fix',
      section: 'Bug Fixes',
    },
    {
      type: 'perf',
      section: 'Performance Improvements',
    },
    {
      type: 'revert',
      section: 'Reverts',
    },
    {
      type: 'docs',
      section: 'Documentation',
    },
    {
      type: 'chore',
      section: 'Miscellaneous Chores',
    },
    {
      type: 'refactor',
      section: 'Code Refactoring',
    },
    {
      type: 'test',
      section: 'Tests',
    },
    {
      type: 'build',
      section: 'Build System',
    },
    {
      type: 'ci',
      section: 'Continuous Integration',
    },
  ],
};
