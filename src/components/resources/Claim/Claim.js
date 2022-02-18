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
  Title,
  Badge,
  BadgeSecondary,
  Body,
  MissingValue,
  Value,
  ValueSection,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  ValueSectionItem,
} from '../../ui';
import Accordion from '../../containers/Accordion';

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

const CareTeam = props => {
  const { careTeam } = props;

  return (
    <ValueSection label="Care Team" data-testid="careTeam" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Provider</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Qualification</TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {careTeam.map((member, idx) => (
            <TableRow key={idx}>
              <TableCell data-testid="careTeam.provider">
                <Reference fhirData={member.provider} />
              </TableCell>
              <TableCell data-testid="careTeam.role">
                {member.role ? (
                  <Coding fhirData={member.role} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell data-testid="careTeam.qualification">
                {careTeam.qualification ? (
                  <Coding fhirData={member.qualification} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

const Diagnosis = props => {
  const { diagnosis } = props;

  return (
    <ValueSection label="Diagnosis" data-testid="diagnosis" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Diagnosis</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Package code</TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {diagnosis.map((diagnosis, idx) => (
            <TableRow key={idx}>
              <TableCell data-testid="diagnosis.diagnosis">
                {diagnosis.coding ? (
                  <Coding fhirData={diagnosis.coding} />
                ) : diagnosis.refrence ? (
                  <Reference fhirData={diagnosis.reference} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell data-testid="diagnosis.type">
                {diagnosis.typeCoding ? (
                  <Coding fhirData={diagnosis.typeCoding} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell data-testid="diagnosis.packageCode">
                {diagnosis.packageCodeCoding ? (
                  <Coding fhirData={diagnosis.packageCodeCoding} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

const Insurance = props => {
  const { insurance } = props;

  return (
    <ValueSection label="Insurance" data-testid="insurance" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Coverage</TableHeader>
            <TableHeader>Business Arrangement</TableHeader>
            <TableHeader>Claim Response</TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {insurance.map((insurance, idx) => (
            <TableRow key={idx}>
              <TableCell data-testid="insurance.coverage">
                <Reference fhirData={insurance.coverage} />
                {insurance.focal && ' (focal)'}
              </TableCell>
              <TableCell data-testid="insurance.businessArrangement">
                {insurance.businessArrangement ? (
                  insurance.businessArrangement
                ) : (
                  <MissingValue />
                )}
              </TableCell>
              <TableCell data-testid="insurance.claimResponse">
                {insurance.claimResponse ? (
                  <Reference fhirData={insurance.claimResponse} />
                ) : (
                  <MissingValue />
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

const Item = props => {
  const { id, item, parentSequences } = props;

  const itemSequences = [...parentSequences, item.sequence];
  const show_id = itemSequences.join('.');

  const rowData = (
    <TableRow id={id}>
      <TableCell data-testid="items.sequence">{show_id}</TableCell>
      <TableCell data-testid="items.service">
        <Coding fhirData={item.service} />
      </TableCell>
      <TableCell data-testid="items.unitPrice">
        {item.unitPrice ? (
          <Money fhirData={item.unitPrice} />
        ) : (
          <MissingValue />
        )}
        {item.factor != null ? (
          <span>&nbsp;&times;&nbsp;{item.factor}</span>
        ) : null}
      </TableCell>
      <TableCell data-testid="items.quantity">
        {item.quantity != null ? item.quantity : <MissingValue />}
      </TableCell>
      <TableCell data-testid="items.net">
        {item.net ? <Money fhirData={item.net} /> : <MissingValue />}
      </TableCell>
    </TableRow>
  );
  console.log({ test: item.subItems });
  return item.subItems != undefined && item.subItems.length ? (
    <>
      <Accordion
        headerContent={rowData}
        bodyContent={
          <>
            {item.subItems.map((subItem, idx) => (
              <Item key={idx} item={subItem} parentSequences={itemSequences} />
            ))}
          </>
        }
      />
    </>
  ) : (
    <>{rowData}</>
  );

  // return (
  //   <>
  //     <TableRow id={id}>
  //       <TableCell data-testid="items.sequence">{show_id}</TableCell>
  //       <TableCell data-testid="items.service">
  //         <Coding fhirData={item.service} />
  //       </TableCell>
  //       <TableCell data-testid="items.unitPrice">
  //         {item.unitPrice ? (
  //           <Money fhirData={item.unitPrice} />
  //         ) : (
  //           <MissingValue />
  //         )}
  //         {item.factor != null ? (
  //           <span>&nbsp;&times;&nbsp;{item.factor}</span>
  //         ) : null}
  //       </TableCell>
  //       <TableCell data-testid="items.quantity">
  //         {item.quantity != null ? item.quantity : <MissingValue />}
  //       </TableCell>
  //       <TableCell data-testid="items.net">
  //         {item.net ? <Money fhirData={item.net} /> : <MissingValue />}
  //       </TableCell>
  //       <TableCell data-testid="items">
  //         <button
  //           type="button"
  //           data-toggle="collapse"
  //           data-target={`#item-${id ? id : show_id}`}
  //         >
  //           Arrow to open collapsed
  //         </button>
  //       </TableCell>
  //     </TableRow>
  //
  //     {/*<button*/}
  //     {/*  type="button"*/}
  //     {/*  data-target="#demo"*/}
  //     {/*  className="btn btn-primary"*/}
  //     {/*  data-toggle="collapse"*/}
  //     {/*>*/}
  //     {/*  Simple collapsible*/}
  //     {/*</button>*/}
  //     {/*<div id="demo" className="collapse">*/}
  //     {/*  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod*/}
  //     {/*  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim*/}
  //     {/*  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea*/}
  //     {/*  commodo consequat.*/}
  //     {/*</div>*/}
  //
  //     <button
  //       className="collapsed"
  //       type="button"
  //       data-bs-target={`item-${id ? id : show_id}`}
  //       data-bs-toggle="collapse"
  //     >
  //       test button
  //     </button>
  //     <div className="collapse" id={`item-${id ? id : show_id}`}>
  //       <p>test</p>
  //       {/*{item.subItems.map((subItem, idx) => (*/}
  //       {/*  <p>test</p>*/}
  //       {/*  // <Item*/}
  //       {/*  //   class="collapse"*/}
  //       {/*  //   id={id}*/}
  //       {/*  //   key={idx}*/}
  //       {/*  //   item={subItem}*/}
  //       {/*  //   parentSequences={itemSequences}*/}
  //       {/*  // />*/}
  //       {/*))}*/}
  //     </div>
  //   </>
  // );
};

const Items = props => {
  const { items } = props;

  console.log({ items });

  return (
    <ValueSection label="Items" data-testid="items" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Service</TableHeader>
            <TableHeader>Unit price</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {items.map((item, idx) => (
            <Item key={idx} item={item} parentSequences={[]} />
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
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
                {status && (
                  <BadgeSecondary data-testid="status">{status}</BadgeSecondary>
                )}
              </>
            }
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body tableData={tableData1}>
            {/* TODO: add spacing between tableData and this below */}
            {hasCareTeam && <CareTeam careTeam={careTeam} />}
            {hasDiagnosis && <Diagnosis diagnosis={diagnosis} />}
            {tableData2.map(
              /* TODO: spacing here is off too */
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
            {hasInsurance && <Insurance insurance={insurance} />}
            {total && (
              <ValueSectionItem label="Total amount" data-testid="total">
                <Money fhirData={total} />
              </ValueSectionItem>
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
