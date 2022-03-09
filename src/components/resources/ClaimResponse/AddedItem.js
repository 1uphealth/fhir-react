import React from 'react';

import { TableCell, TableRow } from '../../ui';
import Coding from '../../datatypes/Coding';
import Money from '../../datatypes/Money';
import Item from './Item';

const AddedItem = ({ addedItem, parentSequences }) => {
  const itemSequences = [...parentSequences, addedItem.sequenceLinkId];
  const id = itemSequences.join('.');

  return (
    <>
      <TableRow>
        <TableCell
          data-testid="addedItems.sequence"
          className="col-md-2"
          notAlignMiddle
        >
          {id}
        </TableCell>
        <TableCell
          data-testid="addedItems.service"
          className="col-md-3"
          notAlignMiddle
        >
          {addedItem.service && <Coding fhirData={addedItem.service} />}
        </TableCell>
        <TableCell
          data-testid="addedItems.fee"
          className="col-md-3"
          notAlignMiddle
        >
          {addedItem.fee && <Money fhirData={addedItem.fee} />}
        </TableCell>
        <TableCell
          data-testid="addedItems.adjudication"
          className="col-md-3"
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
      </TableRow>
      {addedItem.subItems.map((subItem, idx) => (
        <Item key={idx} addedItem={subItem} parentSequences={itemSequences} />
      ))}
    </>
  );
};

export default AddedItem;
