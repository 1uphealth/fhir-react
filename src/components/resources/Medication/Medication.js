import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

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
import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference';
import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import Attachment from '../../datatypes/Attachment';

const commonDTO = fhirResource => {
  let title = _get(fhirResource, 'code.coding.0');
  if (!title) {
    title = { display: _get(fhirResource, 'code.text', '') };
  }
  const isBrand = _get(fhirResource, 'isBrand');
  const manufacturer = _get(fhirResource, 'manufacturer');

  return {
    title,
    isBrand,
    manufacturer,
  };
};
const dstu2DTO = fhirResource => {
  const productForm = _get(fhirResource, 'product.form.coding', []);
  const hasProductForm = Array.isArray(productForm) && productForm.length > 0;
  const productIngredient = _get(fhirResource, 'product.ingredient', []);
  const hasProductIngredient =
    Array.isArray(productIngredient) && productIngredient.length > 0;
  const hasProduct = hasProductForm || hasProductIngredient;
  const packageCoding = _get(fhirResource, 'package.container.coding', []);
  const hasPackageCoding =
    Array.isArray(packageCoding) && packageCoding.length > 0;

  return {
    productForm,
    hasProductForm,
    productIngredient,
    hasProductIngredient,
    hasProduct,
    packageCoding,
    hasPackageCoding,
  };
};
const stu3DTO = fhirResource => {
  const productForm = _get(fhirResource, 'form.coding', []);
  const hasProductForm = Array.isArray(productForm) && productForm.length > 0;
  const productIngredient = _get(fhirResource, 'ingredient', []);
  const hasProductIngredient =
    Array.isArray(productIngredient) && productIngredient.length > 0;
  const hasProduct = hasProductForm || hasProductIngredient;
  const packageCoding = _get(fhirResource, 'package.container.coding', []);
  const hasPackageCoding =
    Array.isArray(packageCoding) && packageCoding.length > 0;
  let images = _get(fhirResource, 'image', []);
  let hasImages = true;
  if (
    !Array.isArray(images) ||
    images.filter(item => !!item.url).length === 0
  ) {
    hasImages = false;
  }
  return {
    productForm,
    hasProductForm,
    productIngredient,
    hasProductIngredient,
    hasProduct,
    packageCoding,
    hasPackageCoding,
    hasImages,
    images,
  };
};

const resourceDTO = (fhirVersion, fhirResource) => {
  switch (fhirVersion) {
    case fhirVersions.DSTU2: {
      return {
        ...commonDTO(fhirResource),
        ...dstu2DTO(fhirResource),
      };
    }
    case fhirVersions.STU3: {
      return {
        ...commonDTO(fhirResource),
        ...stu3DTO(fhirResource),
      };
    }

    default:
      throw Error('Unrecognized the fhir version property type.');
  }
};

const Quantity = props => (
  <span>
    {props.value}&nbsp;{props.code || props.unit}
  </span>
);

const Ingredient = props => {
  const itemDisplay =
    _get(props, 'item') || _get(props, 'itemCodeableConcept.coding.0', '');
  const amountNumerator = _get(props, 'amount.numerator');
  const amountDenominator = _get(props, 'amount.denominator');
  const amount = (
    <span>
      <Quantity {...amountNumerator} />/<Quantity {...amountDenominator} />
    </span>
  );
  return (
    <div>
      <label>
        <Coding fhirData={itemDisplay} />
      </label>
      <BadgeSecondary>{amount}</BadgeSecondary>
    </div>
  );
};

const Medication = props => {
  const { fhirResource, fhirVersion } = props;
  let fhirResourceData = {};
  try {
    fhirResourceData = resourceDTO(fhirVersion, fhirResource);
  } catch (error) {
    console.warn(error.message);
    return <UnhandledResourceDataStructure resourceName="Medication" />;
  }
  const {
    title,
    isBrand,
    manufacturer,
    productForm,
    productIngredient,
    hasProductIngredient,
    hasProduct,
    packageCoding,
    hasPackageCoding,
    hasImages,
    images,
  } = fhirResourceData;

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
            {hasImages && (
              <Value label="Images" data-testid="product-images">
                {images.map((item, i) => (
                  <Attachment key={`item-${i}`} fhirData={item} />
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
  fhirVersion: PropTypes.oneOf([fhirVersions.DSTU2, fhirVersions.STU3])
    .isRequired,
};

export default Medication;
