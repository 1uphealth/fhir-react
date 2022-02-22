import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { getExtension } from './utils';
import { ValueSection, Value, ValueSectionItem } from '../../ui';
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

  const drugData = [
    {
      label: 'Drug Tier ID',
      testId: 'drugTierID',
      data: drugTierID && <CodeableConcept fhirData={drugTierID} />,
      status: drugTierID,
    },
    {
      label: 'Mail order',
      testId: 'mailOrder',
      data: mailOrder ? 'yes' : 'no',
      status: mailOrder,
    },
  ];

  const costData = [
    {
      label: 'Pharmacy Type',
      testId: 'pharmacyType',
      data: pharmacyType && <CodeableConcept fhirData={pharmacyType} />,
      status: pharmacyType,
    },
    {
      label: 'Copay Amount',
      testId: 'copayAmount',
      data: copayAmount && <Money fhirData={copayAmount} />,
      status: copayAmount,
    },
    {
      label: 'Copay Option',
      testId: 'copayOption',
      data: copayOption && <CodeableConcept fhirData={copayOption} />,
      status: copayOption,
    },
    {
      label: 'Coinsurance Rate',
      testId: 'coinsuranceRate',
      data: coinsuranceRate,
      status: coinsuranceRate === 0 || coinsuranceRate,
    },
    {
      label: 'Coinsurance Option',
      testId: 'coinsuranceOption',
      data: coinsuranceOption && (
        <CodeableConcept fhirData={coinsuranceOption} />
      ),
      status: coinsuranceOption,
    },
  ];

  return (
    hasExtensions && (
      <ValueSection
        label="Drug Tier Definition"
        data-testid="drugTierDefinition"
        marginTop
      >
        {drugData.map(
          (item, index) =>
            item.status && (
              <ValueSectionItem
                key={`drug-item-${index}`}
                label={item.label}
                data-testid={item.testId}
              >
                {item.data}
              </ValueSectionItem>
            ),
        )}
        {hasConstSharing && (
          <ValueSection
            label="Cost sharing"
            data-testid="costSharing"
            marginTop
          >
            {costData.map(
              (item, index) =>
                item.status && (
                  <ValueSectionItem
                    key={`cost-item-${index}`}
                    label={item.label}
                    data-testid={item.testId}
                  >
                    {item.data}
                  </ValueSectionItem>
                ),
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
