import React from 'react';

import { TableCell, TableRow } from '../../ui';
import Coding from '../../datatypes/Coding';
import Money from '../../datatypes/Money';
import Item from './Item';

const AddedItem = props => {
  const { addedItem, parentSequences, level } = props;

  const itemSequences = [...parentSequences, addedItem.sequenceLinkId];
  const id = itemSequences.join('.');

  return (
    <>
      <TableRow>
        <TableCell data-testid="addedItems.sequence">{id}</TableCell>
        <TableCell data-testid="addedItems.service">
          {addedItem.service && <Coding fhirData={addedItem.service} />}
        </TableCell>
        <TableCell data-testid="addedItems.fee">
          {addedItem.fee && <Money fhirData={addedItem.fee} />}
        </TableCell>
        <TableCell data-testid="addedItems.adjudication">
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
        <Item
          key={idx}
          addedItem={subItem}
          level={level + 1}
          parentSequences={itemSequences}
        />
      ))}
    </>
  );
};

export default AddedItem;
