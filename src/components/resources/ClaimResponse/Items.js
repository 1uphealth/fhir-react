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
            <TableHeader expand>Adjudication</TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {items.map((item, idx) => (
            <Item key={idx} item={item} level={0} parentSequences={[]} />
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

export default Items;
