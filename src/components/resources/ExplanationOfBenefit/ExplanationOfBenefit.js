import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import Reference from '../../datatypes/Reference';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirTypes from '../fhirResourceTypes';
import {
  Root,
  Header,
  Title,
  Value,
  Body,
  ValueSection,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  MissingValue,
} from '../../ui';
import Date from '../../datatypes/Date';
import Coding from '../../datatypes/Coding';

const commonDTO = fhirResource => {
  const disposition = _get(fhirResource, 'disposition');
  const created = _get(fhirResource, 'created');
  const insurer = _get(fhirResource, 'organization');
  const hasInsurer = _get(fhirResource, 'organization.reference');
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
  return {
    totalBenefit,
    totalCost,
    type,
    hasType,
    hasServices,
    services,
    information,
    hasInformation,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirTypes.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirTypes.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
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
  } = fhirResourceData;

  return (
    <Root name="explanationOfBenefit">
      <Header>
        <Title>{disposition}</Title>
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
        {totalCost && (
          <Value label="Total cost" data-testid="totalCost">
            {totalCost.value || ''}&nbsp;{totalCost.code}
          </Value>
        )}
        {totalBenefit && (
          <Value label="Total benefit" data-testid="totalBenefit">
            {totalBenefit.value || ''}&nbsp;{totalBenefit.code}
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
  fhirVersion: PropTypes.oneOf([fhirTypes.DSTU2, fhirTypes.STU3]).isRequired,
};

export default ExplanationOfBenefit;
