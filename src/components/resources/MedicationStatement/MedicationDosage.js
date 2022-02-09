import { ValueSection, ValueSectionItem } from '../../ui';
import React from 'react';
import _get from 'lodash/get';

const MedicationDosage = props => {
  const { dosage, hasNote, note, itemNumber } = props;

  const instructions = _get(dosage, 'text');
  const additionalInstructionText = _get(
    dosage,
    'additionalInstruction[0].text',
  );
  const route =
    _get(dosage, 'route.coding[0].display') ||
    `${_get(dosage, 'route.text', '')} ${_get(dosage, 'text', '')}`;
  const hasRoute = route.trim() !== '';

  return (
    <ValueSection label="Dosage" key={itemNumber}>
      <ValueSectionItem label="Instructions" data-testid="dosageInstruction">
        {instructions}
      </ValueSectionItem>
      {additionalInstructionText && (
        <ValueSectionItem
          label="Additional instruction"
          data-testid="additionalInstruction"
        >
          {additionalInstructionText}
        </ValueSectionItem>
      )}
      {hasRoute && (
        <ValueSectionItem label="Route" data-testid="route">
          {route}
        </ValueSectionItem>
      )}
      {hasNote && (
        <ValueSectionItem label="Notes" data-testid="hasNote">
          {note.map((item, i) => (
            <div key={`note-${i}`}>{item.text}</div>
          ))}
        </ValueSectionItem>
      )}
    </ValueSection>
  );
};
export default MedicationDosage;
