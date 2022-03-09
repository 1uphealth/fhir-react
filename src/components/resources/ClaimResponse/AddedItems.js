import React from 'react';

import { Table, TableHeader, TableRow, ValueSection } from '../../ui';
import AddedItem from './AddedItem';

const AddedItems = props => {
  const { addedItems } = props;

  return (
    <ValueSection label="Added Items" data-testid="addedItems" marginTop>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Service</TableHeader>
            <TableHeader>Fee</TableHeader>
            <TableHeader>Adjudication</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody className="border-top-0">
          {addedItems.map((item, idx) => (
            <AddedItem key={idx} addedItem={item} parentSequences={[]} />
          ))}
        </tbody>
      </Table>
    </ValueSection>
  );
};

export default AddedItems;
