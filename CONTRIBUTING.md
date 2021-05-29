## Release instructions

1. bump version number in package.json and package-lock.json manually
1. Create new CHANGELOG.md entry and update links at bottom of file
1. commit changes to `master`
1. `gh-release` (this hydrates the release notes from the CHANGELOG.)
1. `npm publish`
