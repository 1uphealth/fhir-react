import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { getExtension } from './utils';
import { ValueSection, Value } from '../../ui';
import CodeableConcept from '../../datatypes/CodeableConcept';
import Money from '../../datatypes/Money';

const DrugTierDefinitionExtension = props => {
  const dto = drugTierDefinitionExtension => {
    const extensions = _get(drugTierDefinitionExtension, 'extension', []);
    const hasExtensions = extensions.length >= 1;

    const drugTierID = _get(
      getExtension('drugTierID', extensions),
      'valueCodeableConcept',
    );
    const mailOrder = _get(
      getExtension('mailOrder', extensions),
      'valueBoolean',
    );
    const costSharing = _get(
      getExtension('costSharing', extensions),
      'extension',
      null,
    );

    const hasConstSharing = costSharing !== null;
    if (hasConstSharing) {
      const pharmacyType = _get(
        getExtension('pharmacyType', costSharing),
        'valueCodeableConcept',
      );
      const copayAmount = _get(
        getExtension('copayAmount', costSharing),
        'valueMoney',
      );
      const copayOption = _get(
        getExtension('copayOption', costSharing),
        'valueCodeableConcept',
      );
      const coinsuranceRate = _get(
        getExtension('coinsuranceRate', costSharing),
        'valueDecimal',
      );
      const coinsuranceOption = _get(
        getExtension('coinsuranceOption', costSharing),
        'valueCodeableConcept',
      );

      return {
        hasExtensions,
        drugTierID,
        mailOrder,
        hasConstSharing,
        pharmacyType,
        copayAmount,
        copayOption,
        coinsuranceRate,
        coinsuranceOption,
      };
    }

    return {
      hasExtensions,
      drugTierID,
      mailOrder,
      hasConstSharing,
    };
  };

  const { drugTierDefinitionExtension } = props;
  const {
    hasExtensions,
    drugTierID,
    mailOrder,
    hasConstSharing,
    pharmacyType,
    copayAmount,
    copayOption,
    coinsuranceRate,
    coinsuranceOption,
  } = dto(drugTierDefinitionExtension);

  return (
    hasExtensions && (
      <ValueSection
        label="Drug Tier Definition"
        data-testid="drugTierDefinition"
      >
        {drugTierID && (
          <Value label="Drug Tier ID" data-testid="drugTierID">
            <CodeableConcept fhirData={drugTierID} />
          </Value>
        )}
        {mailOrder && (
          <Value label="Mail order" data-testid="mailOrder">
            {mailOrder ? 'yes' : 'no'}
          </Value>
        )}
        {hasConstSharing && (
          <ValueSection label="Cost sharing" data-testid="costSharing">
            {pharmacyType && (
              <Value label="Pharmacy Type" data-testid="pharmacyType">
                <CodeableConcept fhirData={pharmacyType} />
              </Value>
            )}
            {copayAmount && (
              <Value label="Copay Amount" data-testid="copayAmount">
                <Money fhirData={copayAmount} />
              </Value>
            )}
            {copayOption && (
              <Value label="Copay Option" data-testid="copayOption">
                <CodeableConcept fhirData={copayOption} />
              </Value>
            )}
            {(coinsuranceRate === 0 || coinsuranceRate) && (
              <Value label="Coinsurance Rate" data-testid="coinsuranceRate">
                {coinsuranceRate}
              </Value>
            )}
            {coinsuranceOption && (
              <Value label="Coinsurance Option" data-testid="coinsuranceOption">
                <CodeableConcept fhirData={coinsuranceOption} />
              </Value>
            )}
          </ValueSection>
        )}
      </ValueSection>
    )
  );
};

DrugTierDefinitionExtension.propTypes = {
  drugTierDefinitionExtension: PropTypes.shape({}).isRequired,
};

export default DrugTierDefinitionExtension;
