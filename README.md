[![CircleCI](https://circleci.com/gh/1uphealth/fhir-react/tree/master.svg?style=svg)](https://circleci.com/gh/1uphealth/fhir-react/tree/master)
[![Storybook](https://github.com/storybookjs/brand/raw/master/badge/badge-storybook.svg?sanitize=true)](http://storybook-fhir-react-lib.s3-website-us-east-1.amazonaws.com/)

# fhir-react

A React component library for displaying [FHIR](https://1up.health/dev/doc/introduction-to-fhir) data.

## Installation

```
npm install --save fhir-react
```

## Usage

This package has two exports: a `FhirResource` React component and `fhirVersions` object.

```js
import { FhirResource, fhirVersions } from 'fhir-react';
```

Render the component providing the FHIR data as a JavaScript object:

```jsx
const MyComponent = () => {
  const fhirResource = JSON.parse(fhirResourceAsJsonString);
  return (
    <FhirResource fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />
  );
};
```

### `FhirResource` component props

| Prop             | Type                                      | Default | Description                                                                                                                                                                                               |
| ---------------- | ----------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fhirResource`\* | Object                                    | -       | The FHIR resource to be rendered                                                                                                                                                                          |
| `fhirVersion`\*  | `fhirVersions.DSTU2`, `fhirVersions.STU3` | -       | FHIR resource version                                                                                                                                                                                     |
| `thorough`       | Boolean                                   | `false` | If this is set to `true`, or if it is absent, all array items and supported attributes will be displayed. Otherwise if this is `false` then only the first or otherwise important items will be displayed |

\* required props

### Available `fhirVersions`

- `fhirVersions.DSTU2` - http://hl7.org/fhir/dstu2/index.html
- `fhirVersions.STU3` - http://hl7.org/fhir/stu3/index.html

### Available resources

| Resource                   | DSTU2 | STU3 |     |
| -------------------------- | :---: | :--: | :-: |
| `AdverseEvent`             | _N/A_ |  ✅  |     |
| `AllergyIntolerance`       |  ✅   |  ✅  |     |
| `AdverseEvent`             | _N/A_ |  ✅  |     |
| `AllergyIntolerance`       |  ✅   |  ✅  |     |
| `Appointment`              |  ✅   |  ✅  |     |
| `CarePlan`                 |  ✅   |  ✅  |     |
| `CareTeam`                 | _N/A_ |  ✅  |     |
| `Claim`                    |  ✅   |  ✅  |     |
| `ClaimResponse`            |  ✅   |  ✅  |     |
| `Condition`                |  ✅   |  ✅  |     |
| `Coverage`                 |  ✅   |  ✅  |     |
| `Device`                   |  ✅   |  ✅  |     |
| `DiagnosticReport`         |  ✅   |  ✅  |     |
| `DocumentReference`        |  ✅   |  ✅  |     |
| `Encounter`                |  ✅   |  ✅  |     |
| `ExplanationOfBenefit`     |  ✅   |  ✅  |     |
| `Goal`                     |  ✅   |  ✅  |     |
| `Immunization`             |  ✅   |  ✅  |     |
| `Location`                 |  ✅   |  ✅  |     |
| `Medication`               |  ✅   |  ✅  |     |
| `MedicationAdministration` |  ✅   |  ✅  |     |
| `MedicationDispense`       |  ✅   |  ✅  |     |
| `MedicationRequest`        | _N/A_ |  ✅  |     |
| `MedicationStatement`      |  ✅   |  ✅  |     |
| `Observation`              |  ✅   |  ✅  |     |
| `Organization`             |  ✅   |  ✅  |     |
| `Patient`                  |  ✅   |  ✅  |     |
| `Practitioner`             |  ✅   |  ✅  |     |
| `Procedure`                |  ✅   |  ✅  |     |
| `Questionnaire`            |  ✅   |  ✅  |     |
| `QuestionnaireResponse`    |  ✅   |  ✅  |     |
| `ReferralRequest`          |  ✅   |  ✅  |     |
| `ResearchStudy`            | _N/A_ |  ✅  |     |

### Styles

Optional CSS styles are provided with this library. They are split into two files:

- `style.css` with basic styling of the components
- `bootstrap-reboot.min.css` further enhancing those styles

To use provided styles include them in the React component:

```js
import 'fhir-react/build/style.css';
import 'fhir-react/build/bootstrap-reboot.min.css';
```

The working demo example with styles included can be viewed [here](https://codesandbox.io/s/infallible-diffie-r6ln5).

## Storybook

Run storybook local server with:

```
npm run storybook
```

Now you can check how a component graphically presents information based on raw data at http://localhost:63653 .

There's also an online version available at http://storybook-fhir-react-lib.s3-website-us-east-1.amazonaws.com .

## Development

1. run `npm link` in this folder to create the npm package locally
1. in the folder where you are using the package (some other project) run `npm link fhir-react`
1. in that other project import this package as you would normally with `import FhirReact from 'fhir-react'`
1. Finally, in this fhir-react folder run the watch command via `npm start` and start developing.

### Test

```
npm run test
```

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
