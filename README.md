[![CircleCI](https://circleci.com/gh/1uphealth/fhir-react/tree/master.svg?style=svg)](https://circleci.com/gh/1uphealth/fhir-react/tree/master)
[![Storybook](https://github.com/storybookjs/brand/raw/master/badge/badge-storybook.svg?sanitize=true)](https://fhir-react-lib-test-storybook.s3.amazonaws.com/branch/release-0-3-13/index.html)

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
    <FhirResource
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={fhirIcons}
      withCarinBBProfile
    />
  );
};
```

Optionally custom header icons could be passed as `fhirIcons` props in few different way:

1. As a URL 
```jsx
const MyComponent = () => {
  const fhirResource = JSON.parse(fhirResourceAsJsonString);
  return (
    <FhirResource
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons="https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1"
      withCarinBBProfile
    />
  );
};
````
2. As a ```<img>``` element 
```jsx
const MyComponent = () => {
  const fhirResource = JSON.parse(fhirResourceAsJsonString);
  return (
    <FhirResource
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={<img
        src={require('./dstu2/resources/condition/condition.svg')}
        alt="header icon"
      />}
      withCarinBBProfile
    />
  );
};
````

3. As a React src from import
````jsx
import EncounterIcon from '../../../assets/containers/Encounter/encounter.svg';

const MyComponent = () => {
  const fhirResource = JSON.parse(fhirResourceAsJsonString);
  return (
    <FhirResource
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={EncounterIcon}
      withCarinBBProfile
    />
  );
};
````
or
````jsx
const MyComponent = () => {
  const fhirResource = JSON.parse(fhirResourceAsJsonString);
  return (
    <FhirResource
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={require('./dstu2/resources/condition/condition.svg')}
      withCarinBBProfile
    />
  );
};
````

4. As a ``false`` value to display the placeholder
````jsx
const MyComponent = () => {
  const fhirResource = JSON.parse(fhirResourceAsJsonString);
  return (
    <FhirResource
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      fhirIcons={false}
      withCarinBBProfile
    />
  );
};
````
5. Without a `fhirIcons` props
The resource icon if it exists or a placeholder will be displayed.


6. As the resources object with resource type as the key and image URL or DOM node as the value

```jsx
import React from 'react';

export default {
  Condition: (
    <img
      src={require('./dstu2/resources/condition/condition.svg')}
      alt="header icon"
    />
  ),
  Immunization: (
    <img
      src={require('./dstu2/resources/immunization/immunization.svg')}
      alt="header icon"
    />
  ),
};
```

There is a possibility to overwrite default's Accordion function, by passing a function to onClick variable in a component.

```jsx
const MyComponent = () => {
  const fhirResource = JSON.parse(fhirResourceAsJsonString);
  
  const functionHandler = /*function*/
  
  return (
    <FhirResource
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      onClick={functionHandler}
    />
  );
};
```

User can provide a number that can be assigned at the end of Accordion id. Not providing any number will cause a lodash uniqueId function to be used instead (default functionality up to this point).

```jsx
const MyComponent = () => {
  const fhirResource = JSON.parse(fhirResourceAsJsonString);
  
  return (
    <FhirResource
      fhirResource={fhirResource}
      fhirVersion={fhirVersions.R4}
      customId={id}
    />
  );
};
```

### `FhirResource` component props

| Prop                 | Type                                                       | Default | Description                                                                                                                                                                                               |
| -------------------- | ---------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fhirResource`\*     | Object                                                     | -       | The FHIR resource to be rendered                                                                                                                                                                          |
| `fhirVersion`\*      | `fhirVersions.DSTU2`, `fhirVersions.STU3, fhirVersions.R4` | -       | FHIR resource version                                                                                                                                                                                     |
| `withCarinBBProfile` | Boolean                                                    | `false` | Use Carin BB profile extension on top of the HL7 default FHIR specification https://build.fhir.org/ig/HL7/carin-bb/index.html                                                                             |
| `withDaVinciPDex`    | Boolean                                                    | `false` | Use DaVinci Payer Data Exchange (PDex) profile extension on top of the HL7 default FHIR specification https://hl7.org/fhir/us/davinci-drug-formulary/index.html                                           |
| `thorough`           | Boolean                                                    | `false` | If this is set to `true`, or if it is absent, all array items and supported attributes will be displayed. Otherwise if this is `false` then only the first or otherwise important items will be displayed |

\* required props

### Available `fhirVersions`

- `fhirVersions.DSTU2` - http://hl7.org/fhir/dstu2/index.html
- `fhirVersions.STU3` - http://hl7.org/fhir/stu3/index.html
- `fhirVersions.R4` - http://hl7.org/fhir/r4/

### Available resources

| Resource                   | DSTU2 | STU3  |  R4   | Carin BB Profile | DaVinci PDex |
| -------------------------- | :---: | :---: | :---: | :--------------: | ------------ |
| `AdverseEvent`             | _N/A_ |  ✅   |  ✅   |
| `AllergyIntolerance`       |  ✅   |  ✅   |  ✅   |
| `AdverseEvent`             | _N/A_ |  ✅   |  ✅   |
| `AllergyIntolerance`       |  ✅   |  ✅   |  ✅   |
| `Appointment`              |  ✅   |  ✅   |  ✅   |
| `Bundle`                   |  ✅   |  ✅   |  ✅   |
| `CarePlan`                 |  ✅   |  ✅   |  ✅   |
| `CareTeam`                 | _N/A_ |  ✅   |  ✅   |
| `Claim`                    |  ✅   |  ✅   |  ✅   |
| `ClaimResponse`            |  ✅   |  ✅   |  ✅   |
| `Condition`                |  ✅   |  ✅   |  ✅   |
| `Coverage`                 |  ✅   |  ✅   |  ✅   |
| `Device`                   |  ✅   |  ✅   |  ✅   |
| `DiagnosticReport`         |  ✅   |  ✅   |  ✅   |
| `DocumentReference`        |  ✅   |  ✅   |  ✅   |
| `Encounter`                |  ✅   |  ✅   |  ✅   |
| `ExplanationOfBenefit`     |  ✅   |  ✅   |  ✅   |        ✅        |
| `Goal`                     |  ✅   |  ✅   |  ✅   |
| `Immunization`             |  ✅   |  ✅   |  ✅   |
| `List`                     |  ✅   |  ✅   |  ✅   |                  | ✅           |
| `Location`                 |  ✅   |  ✅   |  ✅   |
| `Medication`               |  ✅   |  ✅   |  ✅   |
| `MedicationAdministration` |  ✅   |  ✅   |  ✅   |
| `MedicationDispense`       |  ✅   |  ✅   |  ✅   |
| `MedicationKnowledge`      | _N/A_ | _N/A_ |  ✅   |                  | ✅           |
| `MedicationRequest`        | _N/A_ |  ✅   |  ✅   |
| `MedicationStatement`      |  ✅   |  ✅   |  ✅   |
| `Observation`              |  ✅   |  ✅   |  ✅   |
| `Organization`             |  ✅   |  ✅   |  ✅   |
| `Patient`                  |  ✅   |  ✅   |  ✅   |
| `Practitioner`             |  ✅   |  ✅   |  ✅   |
| `PractitionerRole`         | _N/A_ |  ✅   |  ✅   |
| `Procedure`                |  ✅   |  ✅   |  ✅   |
| `Questionnaire`            |  ✅   |  ✅   |  ✅   |
| `QuestionnaireResponse`    |  ✅   |  ✅   |  ✅   |
| `ReferralRequest`          |  ✅   |  ✅   | _N/A_ |
| `ResearchStudy`            | _N/A_ |  ✅   |  ✅   |

### Styles update `v0.3`

The 0.3 version of the FHIR React Component library introduces the bootstrap Accordion component as the base of each available resource which provides any data. The RWD support is provided for each component.

All of the changes can be tracked by viewing the current version of the [storybook](https://fhir-react-lib-test-storybook.s3.amazonaws.com/branch/fhir-react-next/index.html?path=/story/condition--default-visualization-dstu-2).

### Available resources `v0.3`


| Resource                   | DSTU2 | STU3  |  R4   | Carin BB Profile | DaVinci PDex |
| -------------------------- | :---: | :---: | :---: | :--------------: | ------------ |
| `Appointment`              |  ✅   |  ✅   |  ✅   |
| `Condition`                |  ✅   |  ✅   |  ✅   |
| `Encounter`                |  ✅   |  ✅   |  ✅   |
| `ExplanationOfBenefit`     |  ✅   |  ✅   |  ✅   |        ✅        |
| `Immunization`             |  ✅   |  ✅   |  ✅   |
| `Observation`              |  ✅   |  ✅   |  ✅   |
| `Patient`                  |  ✅   |  ✅   |  ✅   |
| `Practitioner`             |  ✅   |  ✅   |  ✅   |
| `Procedure`                |  ✅   |  ✅   |  ✅   |

The update does not change the datasets which components are able to handle. It means that user can display the same particulars as in the previous version of the specific component.


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

To publish, [create a new release in GitHub](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).

### Storybook for the changes

When creating a new PR, changes will be available in the storybook at: <br>
http://storybook-fhir-react-lib.s3-website-us-east-1.amazonaws.com/dev/{branch-name}/
