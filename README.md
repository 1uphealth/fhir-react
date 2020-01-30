[![CircleCI](https://circleci.com/gh/1uphealth/fhir-react/tree/master.svg?style=svg)](https://circleci.com/gh/1uphealth/fhir-react/tree/master)
[![Storybook](https://github.com/storybookjs/brand/raw/master/badge/badge-storybook.svg?sanitize=true)](http://storybook-fhir-react-lib.s3-website-us-east-1.amazonaws.com/)

# fhir-react

A component library for displaying [FHIR](https://1up.health/dev/doc/introduction-to-fhir) data.

## Usage

### Resources

- `this.props.thorough` = if this is set to `true`, or if it is absent, all array items and supported attributes will be displayed. Otherwise if this is `false` then only the first or otherwise important items will be displayed

## Storybook

Run storybook local server with:

`npm run storybook`

Now you can check how a component graphically presents information based on raw data.

## Development

1. run `npm link` in this folder to create the npm package locally
1. in the folder where you are using the package (some other project) run `npm link fhir-react`
1. in that other project import this package as you would normally with `import FhirReact from 'fhir-react'`
1. Finally, in this fhir-react folder run the watch command via `npm start` and start developing.

### Test

`npm run test`


### Lint

```
npm run lint
npm run stylelint
```

### Build

```
npm run build
```

### Publish to NPM Registry

```
npm publish
```