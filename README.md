# mosaic-github-path-changed-check
Verified if there were any changes under a path since the selected tag/commit.

## Inputs

### `path`

**Required** Path to verify for changes.

### `git-point`

Point from which action verifies if there were any changes. Either a git tag or commit hash. Will use latest tag or first commit if not provided. Default `latest tag starting with 'v'`.

## Outputs

### `path-changed`

Flag if there were any changes for the path

## Example usage

```
uses: advancedcsg-open/mosaic-github-path-changed-check@v1.0
with:
    path: 'projects'
    git-point: 'v1.0.0'
```