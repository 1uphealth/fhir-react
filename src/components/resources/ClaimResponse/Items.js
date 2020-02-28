import React from 'react';

import { Table, TableHeader, TableRow, ValueSection } from '../../ui';
import Item from './Item';

const Items = props => {
  const { items } = props;

  return (
    <ValueSection label="Items" data-testid="items">
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader expand>Adjudication</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <Item key={idx} item={item} level={0} parentSequences={[]} />
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

export default Items;
