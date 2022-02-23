import React, { useState } from 'react';
import { Chevron, MissingValue, TableCell, TableRow } from '../../ui';
import Coding from '../../datatypes/Coding';
import Money from '../../datatypes/Money';

const Item = ({ item, parentSequences, parentId, isCollapse = false }) => {
  const itemSequences = [...parentSequences, item.sequence];
  const id = itemSequences.join('.');
  const collapseId = parentSequences.length ? parentId : item.sequence;

  const [rotate, setRotate] = useState(false);
  const handleTableExpand = () => setRotate(!rotate);

  const isExpandable =
    parentSequences.length === 0 && item.subItems.length !== 0;

  return (
    <>
      <TableRow
        className={`${isCollapse ? `collapse item-${parentId}` : ''} ${
          isExpandable ? 'fw-bold table-expandable-row border-top' : ''
        }`}
      >
        <TableCell data-testid="items.sequence" className="col-md-2">
          {id}
        </TableCell>
        <TableCell data-testid="items.service" className="col-md-2">
          <Coding fhirData={item.service} />
        </TableCell>
        <TableCell data-testid="items.unitPrice" className="col-md-2">
          {item.unitPrice ? (
            <Money fhirData={item.unitPrice} />
          ) : (
            <MissingValue />
          )}
          {item.factor != null ? (
            <span>&nbsp;&times;&nbsp;{item.factor}</span>
          ) : null}
        </TableCell>
        <TableCell data-testid="items.quantity" className="col-md-2">
          {item.quantity != null ? item.quantity : <MissingValue />}
        </TableCell>
        <TableCell data-testid="items.net" className="col-md-2">
          {item.net ? <Money fhirData={item.net} /> : <MissingValue />}
        </TableCell>
        {isExpandable ? (
          <TableCell className="col-md-2">
            <button
              className="fhir-container__Accordion__header-button w-100 p-0 border-0 rounded-1 collapsed text-dark bg-transparent shadow-none point"
              type="button"
              data-bs-target={`.item-${collapseId}`}
              data-bs-toggle={'collapse'}
              aria-controls={id}
              aria-expanded="false"
              onClick={handleTableExpand}
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
      {item.subItems.map((subItem, idx) => (
        <Item
          key={idx}
          item={subItem}
          parentSequences={itemSequences}
          parentId={collapseId}
          isCollapse
        />
      ))}
    </>
  );
};

export default Item;
