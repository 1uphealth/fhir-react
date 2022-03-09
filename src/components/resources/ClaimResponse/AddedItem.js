import React, { useState } from 'react';

import { Chevron, TableCell, TableRow } from '../../ui';
import Coding from '../../datatypes/Coding';
import Money from '../../datatypes/Money';
import Item from './Item';

const AddedItem = ({
  addedItem,
  parentSequences,
  parentId,
  isCollapse = false,
}) => {
  const itemSequences = [...parentSequences, addedItem.sequenceLinkId];
  const id = itemSequences.join('.');
  const collapseId = parentSequences.length
    ? parentId
    : addedItem.sequenceLinkId;

  const [rotate, setRotate] = useState(false);
  const handleTableExpand = () => setRotate(!rotate);

  const isExpandable =
    parentSequences.length === 0 && addedItem.subItems.length !== 0;

  return (
    <>
      <TableRow
        className={`${isCollapse ? `collapse item-${parentId}` : ''} ${
          isExpandable ? 'fw-bold table-expandable-row border-top' : ''
        }`}
        data-bs-target={`.item-${collapseId}`}
        data-bs-toggle={'collapse'}
        aria-controls={id}
        aria-expanded="false"
        onClick={handleTableExpand}
      >
        <TableCell
          data-testid="addedItems.sequence"
          className="col-md-2"
          notAlignMiddle
        >
          {id}
        </TableCell>
        <TableCell
          data-testid="addedItems.service"
          className="col-md-2"
          notAlignMiddle
        >
          {addedItem.service && <Coding fhirData={addedItem.service} />}
        </TableCell>
        <TableCell
          data-testid="addedItems.fee"
          className="col-md-2"
          notAlignMiddle
        >
          {addedItem.fee && <Money fhirData={addedItem.fee} />}
        </TableCell>
        <TableCell
          data-testid="addedItems.adjudication"
          className="col-md-2"
          notAlignMiddle
        >
          {addedItem.adjudication.map((adjudication, idx) => (
            <div
              key={idx}
              data-testid="addedItems.adjudication.singleAdjudication"
              className="fhir-resource__ClaimResponse-added-item-adjudication"
            >
              <div className="fhir-resource__ClaimResponse-added-item-adjudication-category">
                <Coding fhirData={adjudication.category} />:
              </div>
              {adjudication.amount && <Money fhirData={adjudication.amount} />}
              {adjudication.value != null && adjudication.value}
            </div>
          ))}
        </TableCell>
        {isExpandable ? (
          <TableCell className="col-md-2" notAlignMiddle>
            <button
              className="fhir-container__Accordion__header-button w-100 p-0 border-0 rounded-1 collapsed text-dark bg-transparent shadow-none "
              type="button"
            >
              <div className={` ${rotate ? ' header-rotate' : ''}`}>
                <Chevron strokeColor={rotate ? '#2a6fd7' : '#6f83a9'} />
              </div>
            </button>
          </TableCell>
        ) : (
          <TableCell style={{ width: '64px' }} className="col-md-2" />
        )}
      </TableRow>
      {addedItem.subItems.map((subItem, idx) => (
        <Item
          key={idx}
          addedItem={subItem}
          parentSequences={itemSequences}
          parentId={collapseId}
          isCollapse
        />
      ))}
    </>
  );
};

export default AddedItem;
