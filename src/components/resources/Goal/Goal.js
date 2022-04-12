import React from 'react';
import PropTypes from 'prop-types';
import Reference from '../../datatypes/Reference';
import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import Accordion from '../../containers/Accordion/Accordion';
import _get from 'lodash/get';
import _has from 'lodash/has';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import fhirVersions from '../fhirResourceVersions';

import { Root, Header, Badge, Body, Value } from '../../ui';

const commonDTO = fhirResource => {
  const title = _get(fhirResource, 'note[0].text', 'Goal');
  const status = _get(fhirResource, 'status', '');
  const hasStatus = _has(fhirResource, 'status');
  const startDate = _get(fhirResource, 'startDate');
  const category = _get(fhirResource, 'category');
  const hasCategory = Array.isArray(category);
  const hasUdi = _has(fhirResource, 'udi');
  const udi = _get(fhirResource, 'udi');
  const addresses = _get(fhirResource, 'addresses');
  const hasAddresses = Array.isArray(addresses);
  const author = _get(fhirResource, 'author');
  const priority = _get(fhirResource, 'priority.coding[0]');
  const subject = _get(fhirResource, 'subject');
  const statusDate = _get(fhirResource, 'statusDate');
  return {
    title,
    status,
    hasStatus,
    startDate,
    hasCategory,
    category,
    hasUdi,
    udi,
    addresses,
    hasAddresses,
    author,
    priority,
    subject,
    statusDate,
  };
};
const dstu2DTO = fhirResource => {
  const description = _get(fhirResource, 'description');
  return {
    description,
  };
};
const stu3DTO = fhirResource => {
  const description = _get(fhirResource, 'description.text', null);
  const title = _get(fhirResource, 'statusReason');
  const outcomeReference = _get(fhirResource, 'outcomeReference');
  return {
    description,
    title,
    outcomeReference,
  };
};
const r4DTO = fhirResource => {
  const description = _get(fhirResource, 'description.text', null);
  const status = _get(fhirResource, 'lifecycleStatus', '');
  const hasStatus = _has(fhirResource, 'lifecycleStatus');
  const achievementStatus = _get(fhirResource, 'achievementStatus.coding[0]');

  return {
    status,
    hasStatus,
    achievementStatus,
    description,
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

const Goal = ({
  fhirResource,
  fhirVersion,
  fhirIcons,
  onClick,
  rawOnClick,
}) => {
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Goal" />;
  }
  const {
    title,
    status,
    hasStatus,
    startDate,
    hasCategory,
    category,
    hasUdi,
    udi,
    addresses,
    hasAddresses,
    author,
    description,
    outcomeReference,
    achievementStatus,
    priority,
    subject,
    statusDate,
  } = fhirResourceData;

  const tableData = [
    {
      label: 'Subject',
      testId: 'subject',
      data: subject && <Reference fhirData={subject} />,
      status: subject,
    },
    {
      label: 'Subject',
      testId: 'statusDate',
      data: statusDate && <Date fhirData={statusDate} />,
      status: statusDate,
    },
    {
      label: 'Description',
      testId: 'description',
      data: description,
      status: description,
    },
    {
      label: 'Category',
      testId: 'category',
      data:
        hasCategory &&
        category.map((item, i) => {
          const coding = _get(item, 'coding', []);
          if (!Array.isArray(coding)) {
            return null;
          }
          return coding.map((codingItem, j) => (
            <Coding key={`coding-item-${j}`} fhirData={codingItem} />
          ));
        }),
      status: hasCategory,
    },
    {
      label: 'Universal Device Identifier',
      testId: 'udi',
      data: udi,
      status: hasUdi,
    },
    {
      label: 'Addresses',
      testId: 'addresses',
      data:
        hasAddresses &&
        addresses.map((address, i) => (
          <Reference key={`address-item-${i}`} fhirData={address} />
        )),
      status: hasAddresses,
    },
    {
      label: 'Priority',
      testId: 'priority',
      data: priority && <Coding fhirData={priority} />,
      status: priority,
    },
    {
      label: 'Author',
      testId: 'author',
      data: author && <Reference fhirData={author} />,
      status: author,
    },
    {
      label: 'Outcome',
      testId: 'outcomeReference',
      data:
        outcomeReference &&
        outcomeReference.map((item, i) => (
          <Reference key={`outcome-reference-item-${i}`} fhirData={item} />
        )),
      status: outcomeReference,
    },
    {
      label: 'Achievement Status',
      testId: 'achievementStatus',
      data: achievementStatus && <Coding fhirData={achievementStatus} />,
      status: achievementStatus,
    },
  ];

  return (
    <Root name="Goal">
      <Accordion
        headerContent={
          <Header
            resourceName="Goal"
            additionalContent={
              startDate && (
                <Value label="Started" data-testid="headerStartDate">
                  <Date fhirData={startDate} isBlack />
                </Value>
              )
            }
            badges={hasStatus && <Badge data-testid="status">{status}</Badge>}
            icon={fhirIcons}
            title={title}
          />
        }
        bodyContent={<Body tableData={tableData} />}
        onClick={onClick}
        rawOnClick={rawOnClick}
      />
    </Root>
  );
};

Goal.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Goal;
