import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import Coding from '../../datatypes/Coding';
import Date from '../../datatypes/Date';
import Reference from '../../datatypes/Reference';
import Accordion from '../../containers/Accordion';
import { Root, Header, MissingValue, Badge, Body } from '../../ui';

export function getId(fhirResource) {
  return _get(fhirResource, 'id');
}

export function getType(fhirResource) {
  return _get(fhirResource, 'type');
}

export function getStatus(fhirResource) {
  return _get(fhirResource, 'status');
}

export function getCollection(fhirResource) {
  return _get(fhirResource, 'collection');
}

export function getSubject(fhirResource) {
  return _get(fhirResource, 'subject');
}

function Specimen(props) {
  const {
    fhirResource,
    fhirVersion,
    fhirIcons,
    onClick,
    rawOnClick,
    customId,
  } = props;

  const id = getId(fhirResource);
  const type = getType(fhirResource);
  const status = getStatus(fhirResource);
  const collection = getCollection(fhirResource);
  const subject = getSubject(fhirResource);
  const receivedTime = _get(fhirResource, 'receivedTime');
  const note = _get(fhirResource, 'note[0].text');

  const tableData = [
    {
      label: 'Type',
      testId: 'specimenType',
      data: type && <Coding fhirData={type} />,
      status: type,
    },
    {
      label: 'Status',
      testId: 'specimenStatus',
      data: status,
      status: status,
    },
    {
      label: 'Subject',
      testId: 'specimenSubject',
      data: subject && <Reference fhirData={subject} />,
      status: subject,
    },
    {
      label: 'Collection',
      testId: 'specimenCollection',
      data: collection && (
        <div>
          {collection.collector && (
            <div>
              <strong>Collector: </strong>
              <Reference fhirData={collection.collector} />
            </div>
          )}
          {collection.collectedDateTime && (
            <div>
              <strong>Collected: </strong>
              <Date fhirData={collection.collectedDateTime} />
            </div>
          )}
        </div>
      ),
      status: collection,
    },
    {
      label: 'Received Time',
      testId: 'specimenReceivedTime',
      data: receivedTime && <Date fhirData={receivedTime} />,
      status: receivedTime,
    },
    {
      label: 'Note',
      testId: 'specimenNote',
      data: note || <MissingValue />,
      status: note,
    },
  ];

  return (
    <Root name="Specimen">
      <Accordion
        headerContent={
          <Header
            resourceName="Specimen"
            additionalContent={
              type && (
                <span className="text-gray-600">
                  <Coding fhirData={type} />
                </span>
              )
            }
            icon={fhirIcons}
            badges={status && <Badge data-testid="status">{status}</Badge>}
            title={`Specimen ${id || ''}`}
            titleTestID="specimenTitle"
          />
        }
        bodyContent={<Body tableData={tableData} />}
        onClick={onClick}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </Root>
  );
}

Specimen.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Specimen;
