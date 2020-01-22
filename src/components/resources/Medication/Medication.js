import React from 'react';
import PropTypes from 'prop-types';
import {
  Root,
  Header,
  Title,
  Badge,
  Body,
  ValueSection,
  Value,
  BadgeSecondary,
} from '../../ui';
import _get from 'lodash/get';
import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference';

const Quantity = props => (
  <span>
    {props.value}&nbsp;{props.code || props.unit}
  </span>
);

const Ingredient = props => {
  const itemDisplay = _get(props, 'item.display', '');
  const amountNumerator = _get(props, 'amount.numerator');
  const amountDenominator = _get(props, 'amount.denominator');
  const amount = (
    <span>
      <Quantity {...amountNumerator} />/<Quantity {...amountDenominator} />
    </span>
  );
  return (
    <div>
      <label>{itemDisplay}</label>
      <BadgeSecondary>{amount}</BadgeSecondary>
    </div>
  );
};

const Medication = props => {
  const { fhirResource } = props;
  const title = _get(fhirResource, 'code.coding.0');
  const isBrand = _get(fhirResource, 'isBrand');
  const manufacturer = _get(fhirResource, 'manufacturer');
  const productForm = _get(fhirResource, 'product.form.coding', []);
  const hasProductForm = Array.isArray(productForm) && productForm.length > 0;
  const productIngredient = _get(fhirResource, 'product.ingredient', []);
  const hasProductIngredient =
    Array.isArray(productIngredient) && productIngredient.length > 0;
  const hasProduct = hasProductForm || hasProductIngredient;
  const packageCoding = _get(fhirResource, 'package.container.coding', []);
  const hasPackageCoding =
    Array.isArray(packageCoding) && packageCoding.length > 0;
  return (
    <Root name="Medication">
      <Header>
        <Title>
          <Coding fhirData={title} />
        </Title>
        {isBrand && <Badge>Brand</Badge>}
      </Header>
      <Body>
        {manufacturer && (
          <Value label="Manufacturer" data-testid="manufacturer">
            <Reference fhirData={manufacturer} />
          </Value>
        )}
        {hasProduct && (
          <ValueSection label="Product">
            {productForm && (
              <Value label="Form" data-testid="product-form">
                {productForm.map((item, i) => (
                  <Coding key={`item-${i}`} fhirData={item} />
                ))}
              </Value>
            )}
            {hasProductIngredient && (
              <Value label="Ingredient" data-testid="product-ingredient">
                {productIngredient.map((item, i) => (
                  <Ingredient key={`item-${i}`} {...item} />
                ))}
              </Value>
            )}
            {hasPackageCoding && (
              <Value label="Package container" data-testid="package-container">
                {packageCoding.map((item, i) => (
                  <Coding key={`item-${i}`} fhirData={item} />
                ))}
              </Value>
            )}
          </ValueSection>
        )}
      </Body>
    </Root>
  );
};

Medication.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
};

export default Medication;
