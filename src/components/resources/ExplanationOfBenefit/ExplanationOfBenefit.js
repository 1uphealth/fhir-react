import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';
import {
  Root,
  Header,
  Title,
  Value,
  Body,
  ValueSection,
  Table,
  TableRow,
  TableCell,
  MissingValue,
  Badge,
} from '../../ui';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import Money from '../../datatypes/Money';
import Reference from '../../datatypes/Reference';
import TotalSum from './TotalSum';

const commonDTO = fhirResource => {
  const disposition = _get(fhirResource, 'disposition');
  const created = _get(fhirResource, 'created');
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

  return {
    totalBenefit,
    totalCost,
    type,
    hasType,
    hasServices,
    services,
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

  // Person can have multiple insurances, but one with focal = true is used to judge this claim
  const insuranceList = _get(fhirResource, 'insurance', []);
  const adjudicationInsurance = insuranceList.filter(item => item.focal)[0];
  const insurance = _get(adjudicationInsurance, 'coverage');

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

const ExplanationOfBenefit = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
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
  } = fhirResourceData;

  return (
    <Root name="ExplanationOfBenefit">
      <Header>
        <Title>{disposition}</Title>
        {resourceStatus && <Badge>{resourceStatus}</Badge>}
      </Header>
      <Body>
        {hasType && (
          <Value label="Type" data-testid="type">
            {type.map((typeItem, i) => (
              <Coding key={`item-${i}`} fhirData={typeItem} />
            ))}
          </Value>
        )}
        {created && (
          <Value label="Created" data-testid="created">
            {created}
          </Value>
        )}
        {hasInsurer && (
          <Value label="Insurer" data-testid="insurer">
            <Reference fhirData={insurer} />
          </Value>
        )}
        {provider && (
          <Value label="Claim provider" data-testid="provider">
            <Reference fhirData={provider} />
          </Value>
        )}
        {totalCost && (
          <Value label="Total cost" data-testid="totalCost">
            <Money fhirData={totalCost} />
          </Value>
        )}
        {totalBenefit && (
          <Value label="Total benefit" data-testid="totalBenefit">
            <Money fhirData={totalBenefit} />
          </Value>
        )}
        {hasTotal && (
          <Value label="Total" data-testid="totalSum">
            <TotalSum fhirData={total} />
          </Value>
        )}
        {useCode && (
          <Value label="Purpose" data-testid="purpose">
            {useCode}
          </Value>
        )}
        {patient && (
          <Value label="Patient" data-testid="patient">
            <Reference fhirData={patient} />
          </Value>
        )}
        {insurance && (
          <Value label="Insurance" data-testid="insurance">
            <Reference fhirData={insurance} />
          </Value>
        )}
        {hasServices && (
          <ValueSection label="Services" data-testid="hasServices">
            <Table>
              <thead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell>Service date</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </thead>
              <tbody>
                {services.map((serviceItem, i) => {
                  const coding = _get(serviceItem, 'service.coding.0');
                  const servicedDate = _get(serviceItem, 'servicedDate');
                  const quantity = _get(serviceItem, 'quantity.value');
                  return (
                    <TableRow key={`serviceItem-${i}`}>
                      <TableCell>
                        <Coding fhirData={coding} />
                      </TableCell>
                      <TableCell>
                        {servicedDate ? (
                          <Date fhirData={_get(serviceItem, 'servicedDate')} />
                        ) : (
                          <MissingValue />
                        )}
                      </TableCell>
                      <TableCell>
                        {!Number.isNaN(quantity) ? quantity : <MissingValue />}
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
                  const infoTitle = _get(informationItem, 'category.coding.0');
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
      </Body>
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
};

export default ExplanationOfBenefit;
