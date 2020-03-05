import React from 'react';

import { TableCell, TableRow } from '../../ui';
import Coding from '../../datatypes/Coding';
import Money from '../../datatypes/Money';

const Item = props => {
  const { item, parentSequences, level } = props;

  const itemSequences = [...parentSequences, item.sequenceLinkId];
  const id = itemSequences.join('.');

  return (
    <>
      <TableRow>
        <TableCell data-testid="items.sequence">{id}</TableCell>
        <TableCell data-testid="items.adjudication">
          {item.adjudication.map((adjudication, idx) => (
            <div
              key={idx}
              data-testid="items.adjudication.singleAdjudication"
              className="fhir-resource__ClaimResponse-item-adjudication"
            >
              <div className="fhir-resource__ClaimResponse-item-adjudication-category">
                <Coding fhirData={adjudication.category} />:
              </div>
              {adjudication.amount && <Money fhirData={adjudication.amount} />}
              {adjudication.value != null && adjudication.value}
            </div>
          ))}
        </TableCell>
      </TableRow>
      {item.subItems.map((subItem, idx) => (
        <Item
          key={idx}
          item={subItem}
          level={level + 1}
          parentSequences={itemSequences}
        />
      ))}
    </>
  );
};

export default Item;
