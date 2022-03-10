import React from 'react';

import { Table, TableHeader, TableRow, ValueSection } from '../../ui';
import Item from './Item';

const Items = props => {
  const { items } = props;

  return (
    <ValueSection label="Items" data-testid="items" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Adjudication</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {items.map((item, idx) => (
            <Item key={idx} item={item} parentSequences={[]} />
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

export default Items;
