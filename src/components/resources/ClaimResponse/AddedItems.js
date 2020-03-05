import React from 'react';

import { Table, TableHeader, TableRow, ValueSection } from '../../ui';
import AddedItem from './AddedItem';

const AddedItems = props => {
  const { addedItems } = props;

  return (
    <ValueSection label="Added Items" data-testid="addedItems">
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Service</TableHeader>
            <TableHeader>Fee</TableHeader>
            <TableHeader expand>Adjudication</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {addedItems.map((item, idx) => (
            <AddedItem
              key={idx}
              addedItem={item}
              level={0}
              parentSequences={[]}
            />
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

export default AddedItems;
