import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import Coding from '../../datatypes/Coding';
import DateType from '../../datatypes/Date';
import Money from '../../datatypes/Money';
import Reference from '../../datatypes/Reference';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';

import './Claim.css';

import {
  Root,
  Header,
  Badge,
  Body,
  MissingValue,
  Value,
  ValueSection,
  ValueSectionItem,
} from '../../ui';
import Accordion from '../../containers/Accordion';
import CareTeam from './CareTeam';
import Diagnosis from './Diagnosis';
import Insurance from './Insurance';
import Items from './Items';

const commonDTO = fhirResource => {
  const id = _get(fhirResource, 'id');
  const use = _get(fhirResource, 'use');
  const created = _get(fhirResource, 'created');
  const organization = _get(fhirResource, 'organization');
  return { id, use, created, organization };
};
const dstu2DTO = fhirResource => {
  const status = undefined;
  const typeCoding = {
    code: _get(fhirResource, 'type'),
    system: 'http://hl7.org/fhir/ValueSet/claim-type-link',
  };
  const insurer = _get(fhirResource, 'target');
  const payeeCoding = _get(fhirResource, 'payee.type');
  const payeeParty =
    _get(fhirResource, 'payee.provider') ||
    _get(fhirResource, 'payee.organization') ||
    _get(fhirResource, 'payee.person');
  const careTeam = [];
  const priorityCoding = _get(fhirResource, 'priority');
  const diagnosis = _get(fhirResource, 'diagnosis', []).map(diagnosis => {
    const coding = _get(diagnosis, 'diagnosis');
    const reference = null;
    const typeCoding = null;
    const packageCodeCoding = null;
    return { coding, reference, typeCoding, packageCodeCoding };
  });
  const accidentCoding = _get(fhirResource, 'accidentType');
  const accidentDate = _get(fhirResource, 'accident');
  const accident =
    accidentCoding || accidentDate
      ? { coding: accidentCoding, date: accidentDate }
      : null;
  const insurance = _get(fhirResource, 'coverage', []).map(insurance => {
    const focal = insurance.focal;
    const coverage = insurance.coverage;
    const businessArrangement = insurance.businessArrangement;
    const claimResponse = insurance.claimResponse;
    return { focal, coverage, businessArrangement, claimResponse };
  });
  const employmentImpacted = null;
  const hospitalization = null;
  const total = null;
  function mapItem(item, level) {
    const sequence = _get(item, 'sequence');
    const service = _get(item, 'service');
    const quantity = _get(item, 'quantity.value');
    const factor = _get(item, 'factor');
    const unitPrice = _get(item, 'unitPrice');
    const net = _get(item, 'net');
    let subItemProperty;
    if (level === 0) subItemProperty = 'detail';
    else if (level === 1) subItemProperty = 'subDetail';
    const subItems = subItemProperty
      ? _get(item, subItemProperty, []).map(subItem =>
          mapItem(subItem, level + 1),
        )
      : [];
    return { sequence, service, quantity, factor, unitPrice, net, subItems };
  }
  const items = _get(fhirResource, 'item').map(item => mapItem(item, 0));
  return {
    status,
    typeCoding,
    insurer,
    payee: { coding: payeeCoding, party: payeeParty },
    careTeam,
    priorityCoding,
    diagnosis,
    accident,
    insurance,
    employmentImpacted,
    hospitalization,
    total,
    items,
  };
};
const stu3DTO = fhirResource => {
  const status = _get(fhirResource, 'status');
  const typeCoding = _get(fhirResource, 'type.coding[0]');
  const insurer = _get(fhirResource, 'insurer');
  const payeeCoding = _get(fhirResource, 'payee.type.coding[0]');
  const payeeParty = _get(fhirResource, 'payee.party');
  const careTeam = _get(fhirResource, 'careTeam', []).map(team => {
    const provider = team.provider;
    const role = _get(team, 'role.coding[0]');
    const qualification = _get(team, 'role.coding[0]');
    return { provider, role, qualification };
  });
  const priorityCoding = _get(fhirResource, 'priority.coding[0]');
  const diagnosis = _get(fhirResource, 'diagnosis', []).map(diagnosis => {
    const coding = _get(diagnosis, 'diagnosisCodeableConcept.coding[0]');
    const reference = _get(diagnosis, 'diagnosisReference');
    const typeCoding = _get(diagnosis, 'type[0].coding[0]');
    const packageCodeCoding = _get(diagnosis, 'packageCode.coding[0]');
    return { coding, reference, typeCoding, packageCodeCoding };
  });
  const accidentCoding = _get(fhirResource, 'accident.type.coding[0]');
  const accidentDate = _get(fhirResource, 'accident.date');
  const accident =
    accidentCoding || accidentDate
      ? { coding: accidentCoding, date: accidentDate }
      : null;
  const insurance = _get(fhirResource, 'insurance', []).map(insurance => {
    const focal = insurance.focal;
    const coverage = insurance.coverage;
    const businessArrangement = insurance.businessArrangement;
    const claimResponse = insurance.claimResponse;
    return { focal, coverage, businessArrangement, claimResponse };
  });
  const employmentImpactedStart = _get(
    fhirResource,
    'employmentImpacted.start',
  );
  const employmentImpactedEnd = _get(fhirResource, 'employmentImpacted.end');
  const employmentImpacted =
    employmentImpactedStart || employmentImpactedEnd
      ? { start: employmentImpactedStart, end: employmentImpactedEnd }
      : null;
  const hospitalizationStart = _get(fhirResource, 'hospitalization.start');
  const hospitalizationEnd = _get(fhirResource, 'hospitalization.end');
  const hospitalization =
    hospitalizationStart || hospitalizationEnd
      ? { start: hospitalizationStart, end: hospitalizationEnd }
      : null;
  const total = _get(fhirResource, 'total');
  function mapItem(item, level) {
    const sequence = _get(item, 'sequence');
    const service = _get(item, 'service.coding[0]');
    const quantity = _get(item, 'quantity.value');
    const factor = _get(item, 'factor');
    const unitPrice = _get(item, 'unitPrice');
    const net = _get(item, 'net');
    let subItemProperty;
    if (level === 0) subItemProperty = 'detail';
    else if (level === 1) subItemProperty = 'subDetail';
    const subItems = subItemProperty
      ? _get(item, subItemProperty, []).map(subItem =>
          mapItem(subItem, level + 1),
        )
      : [];
    return { sequence, service, quantity, factor, unitPrice, net, subItems };
  }
  const items = _get(fhirResource, 'item').map(item => mapItem(item, 0));
  return {
    status,
    typeCoding,
    insurer,
    payee: { coding: payeeCoding, party: payeeParty },
    careTeam,
    priorityCoding,
    diagnosis,
    accident,
    insurance,
    employmentImpacted,
    hospitalization,
    total,
    items,
  };
};

const r4DTO = fhirResource => {
  const status = _get(fhirResource, 'status');
  const typeCoding = _get(fhirResource, 'type.coding[0]');
  const insurer = _get(fhirResource, 'insurer');
  const payeeCoding = _get(fhirResource, 'payee.type.coding[0]');
  const payeeParty = _get(fhirResource, 'payee.party');
  const careTeam = _get(fhirResource, 'careTeam', []).map(team => {
    const provider = team.provider;
    const role = _get(team, 'role.coding[0]');
    const qualification = _get(team, 'role.coding[0]');
    return { provider, role, qualification };
  });
  const priorityCoding = _get(fhirResource, 'priority.coding[0]');
  const diagnosis = _get(fhirResource, 'diagnosis', []).map(diagnosis => {
    const coding = _get(diagnosis, 'diagnosisCodeableConcept.coding[0]');
    const reference = _get(diagnosis, 'diagnosisReference');
    const typeCoding = _get(diagnosis, 'type[0].coding[0]');
    const packageCodeCoding = _get(diagnosis, 'packageCode.coding[0]');
    return { coding, reference, typeCoding, packageCodeCoding };
  });
  const accidentCoding = _get(fhirResource, 'accident.type.coding[0]');
  const accidentDate = _get(fhirResource, 'accident.date');
  const accident =
    accidentCoding || accidentDate
      ? { coding: accidentCoding, date: accidentDate }
      : null;
  const insurance = _get(fhirResource, 'insurance', []).map(insurance => {
    const focal = insurance.focal;
    const coverage = insurance.coverage;
    const businessArrangement = insurance.businessArrangement;
    const claimResponse = insurance.claimResponse;
    return { focal, coverage, businessArrangement, claimResponse };
  });
  const employmentImpactedStart = _get(
    fhirResource,
    'employmentImpacted.start',
  );
  const employmentImpactedEnd = _get(fhirResource, 'employmentImpacted.end');
  const employmentImpacted =
    employmentImpactedStart || employmentImpactedEnd
      ? { start: employmentImpactedStart, end: employmentImpactedEnd }
      : null;
  const hospitalizationStart = _get(fhirResource, 'hospitalization.start');
  const hospitalizationEnd = _get(fhirResource, 'hospitalization.end');
  const hospitalization =
    hospitalizationStart || hospitalizationEnd
      ? { start: hospitalizationStart, end: hospitalizationEnd }
      : null;
  const total = _get(fhirResource, 'total');
  function mapItem(item, level) {
    const sequence = _get(item, 'sequence');
    const service = _get(item, 'productOrService.coding[0]');
    const quantity = _get(item, 'quantity.value');
    const factor = _get(item, 'factor');
    const unitPrice = _get(item, 'unitPrice');
    const net = _get(item, 'net');
    let subItemProperty;
    if (level === 0) subItemProperty = 'detail';
    else if (level === 1) subItemProperty = 'subDetail';
    const subItems = subItemProperty
      ? _get(item, subItemProperty, []).map(subItem =>
          mapItem(subItem, level + 1),
        )
      : [];
    return { sequence, service, quantity, factor, unitPrice, net, subItems };
  }
  const items = _get(fhirResource, 'item').map(item => mapItem(item, 0));
  return {
    status,
    typeCoding,
    insurer,
    payee: { coding: payeeCoding, party: payeeParty },
    careTeam,
    priorityCoding,
    diagnosis,
    accident,
    insurance,
    employmentImpacted,
    hospitalization,
    total,
    items,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }
    case fhirVersions.R4: {
      return {
        ...commonDTO(fhirResource),
        ...r4DTO(fhirResource),
      };
    }
    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const Claim = ({ fhirResource, fhirVersion, fhirIcons }) => {
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Claim" />;
  }
  const {
    id,
    status,
    use,
    typeCoding,
    created,
    insurer,
    organization,
    priorityCoding,
    payee,
    careTeam,
    diagnosis,
    accident,
    insurance,
    employmentImpacted,
    hospitalization,
    items,
    total,
  } = fhirResourceData;
  const hasCareTeam = careTeam.length > 0;
  const hasDiagnosis = diagnosis.length > 0;
  const hasInsurance = insurance.length > 0;

  const tableData1 = [
    {
      label: 'Type',
      testId: 'type',
      data: <Coding fhirData={typeCoding} />,
      status: true,
    },
    {
      label: 'Created at',
      testId: 'created',
      data: created && <DateType fhirData={created} />,
      status: created,
    },
    {
      label: 'Accident',
      testId: 'accident',
      data: accident && (
        <>
          {accident.date && (
            <Value label="Date" data-testid="accident.date">
              <DateType fhirData={accident.date} />
            </Value>
          )}
          {accident.coding && (
            <Value label="Type" data-testid="accident.type">
              <Coding fhirData={accident.coding} />
            </Value>
          )}
        </>
      ),
      status: accident,
    },
    {
      label: 'Employment impacted',
      testId: 'employmentImpacted',
      data: employmentImpacted && (
        <>
          {employmentImpacted.start ? (
            <DateType fhirData={employmentImpacted.start} />
          ) : (
            <MissingValue />
          )}
          {' - '}
          {employmentImpacted.end ? (
            <DateType fhirData={employmentImpacted.end} />
          ) : (
            <MissingValue />
          )}
        </>
      ),
      status: employmentImpacted,
    },
    {
      label: 'Hospitalization',
      testId: 'hospitalization',
      data: hospitalization && (
        <>
          {hospitalization.start ? (
            <DateType fhirData={hospitalization.start} />
          ) : (
            <MissingValue />
          )}
          {' - '}
          {hospitalization.end ? (
            <DateType fhirData={hospitalization.end} />
          ) : (
            <MissingValue />
          )}
        </>
      ),
      status: hospitalization,
    },
  ];

  const tableData2 = [
    {
      label: 'Insurer',
      testId: 'insurer',
      data: insurer && <Reference fhirData={insurer} />,
      status: insurer,
    },
    {
      label: 'Organization',
      testId: 'organization',
      data: organization && <Reference fhirData={organization} />,
      status: organization,
    },
    {
      label: 'Payee',
      testId: 'payee.type',
      data: payee.coding && <Coding fhirData={payee.coding} />,
      status: payee.coding,
    },
    {
      label: 'Payee party',
      testId: 'payee.party',
      data: payee.party && <Reference fhirData={payee.party} />,
      status: payee.party,
    },
    {
      label: 'Priority',
      testId: 'priority',
      data: priorityCoding && <Coding fhirData={priorityCoding} />,
      status: priorityCoding,
    },
  ];

  return (
    <Root name="Claim">
      <Accordion
        headerContent={
          <Header
            resourceName="Claim"
            title={`Claim #${id}`}
            badges={
              <>
                {use && <Badge data-testid="use">{use}</Badge>}
                {status && <Badge data-testid="status">{status}</Badge>}
              </>
            }
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body tableData={tableData1}>
            {hasCareTeam && <CareTeam careTeam={careTeam} />}
            {hasDiagnosis && <Diagnosis diagnosis={diagnosis} />}
            <ValueSection>
              {tableData2.map(
                (item, index) =>
                  item.status && (
                    <ValueSectionItem
                      key={`claim-item-${index}`}
                      label={item.label}
                      data-testid={item.testId}
                    >
                      {item.data}
                    </ValueSectionItem>
                  ),
              )}
            </ValueSection>
            {hasInsurance && <Insurance insurance={insurance} />}
            {total && (
              <ValueSection>
                <ValueSectionItem label="Total amount" data-testid="total">
                  <Money fhirData={total} />
                </ValueSectionItem>
              </ValueSection>
            )}
            {items && <Items items={items} />}
          </Body>
        }
      />
      <Body></Body>
    </Root>
  );
};

Claim.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Claim;
