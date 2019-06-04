# Local Development
1. run  `npm link` in this folder to create the npm package locally
1. in the folder where you are using the package (some other project) run  `npm link fhir-react`
1. in that other project import this package as you would normally with `import FhirReact from 'fhir-react'`
1. Finally, in this fhir-react folder run the watch command via `npm start` and start developing.

# Build
`npm run build`
