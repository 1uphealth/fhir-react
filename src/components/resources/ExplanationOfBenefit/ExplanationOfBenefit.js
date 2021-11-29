import {
  Badge,
  Body,
  Header,
  MissingValue,
  Root,
  Table,
  TableCell,
  TableRow,
  Value,
  ValueSection,
} from '../../ui';

import CareTeam from './CareTeam';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import Diagnosis from './Diagnosis';
import Identifier from '../../datatypes/Identifier/Identifier';
import Items from './Items';
import Money from '../../datatypes/Money';
import Period from '../../datatypes/Period';
import PropTypes from 'prop-types';
import React from 'react';
import Reference from '../../datatypes/Reference';
import Related from './Related';
import SupportingInfo from './SupportingInfo';
import TotalSum from './TotalSum';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import _get from 'lodash/get';
import fhirVersions from '../fhirResourceVersions';
import Accordion from '../../containers/Accordion';
import TotalGraph from './TotalGraph';
import { parseValueIntoMonetaryValueOfGivenCurrency } from '../../../utils';
import { Title } from '../../ui';

/**
 * @typedef ExplanationOfBenefitServiceItem
 * @property {Object} serviceCoding
 * @property {String} [servicedDate]
 * @property {Number} [quantity]
 * @property {Object} [itemCost]
 */

const commonDTO = fhirResource => {
  const disposition = _get(fhirResource, 'disposition');
  const created = String(_get(fhirResource, 'created')).slice(0, 10);
  const insurer = _get(fhirResource, 'insurer');
  const hasInsurer = _get(fhirResource, 'insurer.reference');
  return {
    disposition,
    created,
    insurer,
    hasInsurer,
  };
};
const dstu2DTO = fhirResource => {
  const insurer = _get(fhirResource, 'organization');
  const hasInsurer = _get(fhirResource, 'organization.reference');
  return { insurer, hasInsurer };
};

const stu3DTO = fhirResource => {
  const totalBenefit = _get(fhirResource, 'totalBenefit');
  const totalCost = _get(fhirResource, 'totalCost');
  const type = _get(fhirResource, 'type.coding', []);
  const hasType = Array.isArray(type) && type.length > 0;
  const services = _get(fhirResource, 'item', []);
  const hasServices = Array.isArray(services) && services.length > 0;
  const information = _get(fhirResource, 'information', []);
  const hasInformation = Array.isArray(information) && information.length > 0;
  const provider = _get(fhirResource, 'provider');

  /**
   *
   * @param {Array} services
   * @returns {ExplanationOfBenefitServiceItem}
   */
  const prepareServiceItem = services =>
    services.map(serviceItem => {
      const coding = _get(serviceItem, 'service.coding.0');
      const servicedDate = _get(serviceItem, 'servicedDate');
      const quantity = _get(serviceItem, 'quantity.value');
      const itemCost = _get(serviceItem, 'net');
      return { coding, servicedDate, quantity, itemCost };
    });

  return {
    totalBenefit,
    totalCost,
    type,
    hasType,
    hasServices,
    services: prepareServiceItem(services),
    information,
    hasInformation,
    provider,
  };
};

const r4DTO = fhirResource => {
  const type = _get(fhirResource, 'type.coding', []);
  const hasType = Array.isArray(type) && type.length > 0;
  const resourceStatus = _get(fhirResource, 'status');
  const useCode = _get(fhirResource, 'use');
  const patient = _get(fhirResource, 'patient');
  const provider = _get(fhirResource, 'provider');
  const total = _get(fhirResource, 'total', []);
  const hasTotal = total.length > 0;
  const services = _get(fhirResource, 'item', []);
  const hasServices = Array.isArray(services) && services.length > 0;
  const information = _get(fhirResource, 'supportingInfo', []);
  const hasInformation = Array.isArray(information) && information.length > 0;

  // Person can have multiple insurances, but one with focal = true is used to judge this claim
  const insuranceList = _get(fhirResource, 'insurance', []);
  const adjudicationInsurance = insuranceList.filter(item => item.focal)[0];
  const insurance = _get(adjudicationInsurance, 'coverage');

  /**
   *
   * @param {Array} services
   * @returns {ExplanationOfBenefitServiceItem}
   */
  const prepareServiceItem = services =>
    services.map(serviceItem => {
      const coding = _get(serviceItem, 'productOrService.coding.0');
      const servicedDate = _get(serviceItem, 'servicedDate');
      const quantity = _get(serviceItem, 'quantity.value');
      const itemCost = _get(serviceItem, 'net');
      return { coding, servicedDate, quantity, itemCost };
    });

  return {
    type,
    hasType,
    resourceStatus,
    useCode,
    patient,
    provider,
    insurance,
    total,
    hasTotal,
    hasServices,
    services: prepareServiceItem(services),
    hasInformation,
    information,
  };
};

const c4bbDTO = fhirResource => {
  const diagnosis = _get(fhirResource, 'diagnosis', []);
  const hasDiagnosis = diagnosis.length > 0;
  const supportingInfo = _get(fhirResource, 'supportingInfo', []);
  const hasSupportingInfo = supportingInfo.length > 0;
  const items = _get(fhirResource, 'item', []);
  const hasItems = items.length > 0;
  const total = _get(fhirResource, 'total', []);
  const hasTotal = total.length > 0;
  const payment = _get(fhirResource, 'payment.amount');
  const billablePeriod = _get(fhirResource, 'billablePeriod');
  const identifier = _get(fhirResource, 'identifier');
  const outcome = _get(fhirResource, 'outcome');
  const careTeam = _get(fhirResource, 'careTeam', []);
  const hasCareTeam = careTeam.length > 0;
  const payeeType = _get(fhirResource, 'payee.type');
  const payeeParty = _get(fhirResource, 'payee.party');
  const related = _get(fhirResource, 'related');

  return {
    diagnosis,
    hasDiagnosis,
    supportingInfo,
    hasSupportingInfo,
    items,
    hasItems,
    total,
    hasTotal,
    payment,
    billablePeriod,
    identifier,
    outcome,
    careTeam,
    hasCareTeam,
    payeeType,
    payeeParty,
    related,
  };
};

const resourceDTO = (fhirVersion, fhirResource, withCarinBBProfile) => {
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
      const dto = {
        ...commonDTO(fhirResource),
        ...r4DTO(fhirResource),
      };

      if (withCarinBBProfile) {
        return {
          ...dto,
          ...c4bbDTO(fhirResource),
        };
      }

      return {
        ...commonDTO(fhirResource),
        ...r4DTO(fhirResource),
      };
    }
    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const ExplanationOfBenefit = props => {
  const { fhirResource, fhirVersion, withCarinBBProfile = false } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(
      fhirVersion,
      fhirResource,
      withCarinBBProfile,
    );
  } catch (error) {
    console.warn(error.message);
    return (
      <UnhandledResourceDataStructure resourceName="ExplanationOfBenefit" />
    );
  }

  const {
    disposition,
    created,
    insurer,
    totalBenefit,
    totalCost,
    hasInsurer,
    hasType,
    type,
    hasServices,
    services,
    information,
    hasInformation,
    resourceStatus,
    useCode,
    patient,
    provider,
    insurance,
    total,
    hasTotal,
    diagnosis,
    hasDiagnosis,
    supportingInfo,
    hasSupportingInfo,
    items,
    hasItems,
    payment,
    billablePeriod,
    identifier,
    outcome,
    careTeam,
    hasCareTeam,
    payeeType,
    payeeParty,
    related,
  } = fhirResourceData;

  const getRowItem = item =>
    ('isLoaded' in item ? item.isLoaded : item.data) && (
      <div className="col-12 col-sm-6 col-md-4 text-wrap mb-4">
        {item.noWrapWithValue ? (
          item.data
        ) : (
          <Value label={item.label} data-testid={item.testId} dirColumn>
            {item.data}
          </Value>
        )}
      </div>
    );

  const getHeaderPrice = () => {
    if (totalCost && totalBenefit)
      return (
        <Title testId="headerPrice">
          {parseValueIntoMonetaryValueOfGivenCurrency(
            totalCost.value,
            totalCost.code,
          )}
        </Title>
      );
  };

  const EOBRowData = [
    {
      label: 'Type',
      testId: 'type',
      data:
        hasType &&
        type.map((typeItem, i) => (
          <Coding key={`item-${i}`} fhirData={typeItem} />
        )),
      isLoaded: hasType,
    },
    {
      label: 'Identifier',
      testId: 'identifier',
      data:
        identifier &&
        identifier.map((id, index) => (
          <div key={`identifier-${index}`}>
            <Identifier fhirData={id} />
          </div>
        )),
      isLoaded: identifier,
    },
    {
      label: 'Outcome',
      testId: 'outcome',
      data: outcome,
    },
    {
      label: 'Insurer',
      testId: 'insurer',
      data: <Reference fhirData={insurer} />,
      isLoaded: hasInsurer,
    },
    {
      label: 'Claim provider',
      testId: 'provider',
      data: <Reference fhirData={provider} />,
      isLoaded: provider,
    },
    {
      label: 'Total',
      testId: 'totalSum',
      data: <TotalSum fhirData={total} />,
      isLoaded: hasTotal,
    },
    {
      label: 'Payment',
      testId: 'payment',
      data: <Money fhirData={payment} />,
      isLoaded: payment,
    },
    {
      label: 'Payee',
      testId: 'payee',
      data: (
        <>
          {payeeType && <CodeableConcept fhirData={payeeType} />}
          {payeeParty && <Reference fhirData={payeeParty} />}
        </>
      ),
      isLoaded: payeeType || payeeParty,
    },
    {
      label: 'Billable period',
      testId: 'billablePeriod',
      data: <Period fhirData={billablePeriod} />,
      isLoaded: billablePeriod,
    },
    {
      label: 'Purpose',
      testId: 'purpose',
      data: useCode,
    },
    {
      label: 'Patient',
      testId: 'patient',
      data: <Reference fhirData={patient} />,
      isLoaded: patient,
    },
    {
      label: 'Insurance',
      testId: 'insurance',
      data: <Reference fhirData={insurance} />,
      isLoaded: insurance,
    },
    {
      label: 'Related',
      testId: 'related',
      data: <Related fhirData={related} />,
      isLoaded: related,
    },
    {
      data: <Diagnosis fhirData={diagnosis} />,
      isLoaded: hasDiagnosis,
      noWrapWithValue: true,
    },
    {
      data: <SupportingInfo fhirData={supportingInfo} />,
      isLoaded: hasSupportingInfo,
      noWrapWithValue: true,
    },
  ];

  return (
    <Root name="ExplanationOfBenefit">
      <Accordion
        headerContent={
          <Header
            resourceName="ExplanationOfBenefit"
            title={
              disposition ? disposition : `Explanation Of Benefit (default)`
            }
            badges={getHeaderPrice()}
            rightAdditionalContent={
              resourceStatus && <Badge>{resourceStatus}</Badge>
            }
            additionalContent={
              created &&
              created !== 'undefined' && (
                <div>
                  <span className="text-secondary pe-2">Start date</span>
                  <Date testId="created" isBlack fhirData={created} />
                </div>
              )
            }
          />
        }
        bodyContent={
          <Body>
            <ValueSection label="Details" data-testid="details">
              <div className="row">{EOBRowData.map(x => getRowItem(x))}</div>
            </ValueSection>
            {totalCost && totalBenefit && (
              <TotalGraph fhirData={{ totalCost, totalBenefit }} />
            )}

            {hasServices && (
              <ValueSection label="Services" data-testid="hasServices">
                <Table>
                  <thead>
                    <TableRow>
                      <TableCell>Service</TableCell>
                      <TableCell>Service date</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Item cost</TableCell>
                    </TableRow>
                  </thead>
                  <tbody>
                    {services.map((serviceItem, i) => {
                      return (
                        <TableRow key={`serviceItem-${i}`}>
                          <TableCell data-testid="explanation.service">
                            <Coding fhirData={serviceItem.coding} />
                          </TableCell>
                          <TableCell data-testid="explanation.servicedDate">
                            {serviceItem.servicedDate ? (
                              <Date fhirData={serviceItem.servicedDate} />
                            ) : (
                              <MissingValue />
                            )}
                          </TableCell>
                          <TableCell data-testid="explanation.quantity">
                            {Number.isFinite(Number(serviceItem.quantity)) ? (
                              serviceItem.quantity
                            ) : (
                              <MissingValue />
                            )}
                          </TableCell>
                          <TableCell data-testid="explanation.itemCost">
                            {Number.isFinite(
                              Number(_get(serviceItem, 'itemCost.value')),
                            ) ? (
                              <Money fhirData={serviceItem.itemCost} />
                            ) : (
                              <MissingValue />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </tbody>
                </Table>
              </ValueSection>
            )}
            {hasInformation && (
              <ValueSection label="Information" data-testid="hasInformation">
                <Table>
                  <thead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </thead>
                  <tbody>
                    {information.map((informationItem, i) => {
                      const infoTitle = _get(
                        informationItem,
                        'category.coding.0',
                      );
                      const infoStatus = _get(informationItem, 'code.coding.0');

                      return (
                        <TableRow key={`serviceItem-${i}`}>
                          <TableCell>
                            {infoTitle ? (
                              <Coding fhirData={infoTitle} />
                            ) : (
                              <MissingValue />
                            )}
                          </TableCell>
                          <TableCell>
                            {infoStatus ? (
                              <Coding fhirData={infoStatus} />
                            ) : (
                              <MissingValue />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </tbody>
                </Table>
              </ValueSection>
            )}
            {hasItems && <Items fhirData={items} />}
            {hasCareTeam && <CareTeam fhirData={careTeam} />}
          </Body>
        }
      />
    </Root>
  );
};

ExplanationOfBenefit.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
  withCarinBBProfile: PropTypes.bool,
};

export default ExplanationOfBenefit;
