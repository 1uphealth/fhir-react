import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

import {
  Root,
  Header,
  Badge,
  Body,
  ValueSection,
  ValueSectionItem,
} from '../../ui';
import Coding from '../../datatypes/Coding';
import Reference from '../../datatypes/Reference';
import fhirVersions from '../fhirResourceVersions';
import UnhandledResourceDataStructure from '../UnhandledResourceDataStructure';
import Attachment from '../../datatypes/Attachment';
import Accordion from '../../containers/Accordion';

const commonDTO = fhirResource => {
  let title = _get(fhirResource, 'code.coding.0');
  if (!title) {
    title = { display: _get(fhirResource, 'code.text', '') };
  }
  const manufacturer = _get(fhirResource, 'manufacturer');

  return {
    title,
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
  const isBrand = _get(fhirResource, 'isBrand');

  return {
    productForm,
    hasProductForm,
    productIngredient,
    hasProductIngredient,
    hasProduct,
    packageCoding,
    hasPackageCoding,
    isBrand,
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
  const isBrand = _get(fhirResource, 'isBrand');

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
    isBrand,
  };
};

const r4DTO = fhirResource => {
  const productForm = _get(fhirResource, 'form.coding', []);
  const hasProductForm = Array.isArray(productForm) && productForm.length > 0;
  const productIngredient = _get(fhirResource, 'ingredient', []);
  const hasProductIngredient =
    Array.isArray(productIngredient) && productIngredient.length > 0;
  const status = _get(fhirResource, 'status');
  const hasProduct = hasProductForm || hasProductIngredient;

  return {
    productForm,
    hasProductForm,
    productIngredient,
    hasProductIngredient,
    hasProduct,
    status,
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
    case fhirVersions.R4: {
      return {
        ...commonDTO(fhirResource),
        ...r4DTO(fhirResource),
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
    _get(props, 'item') || _get(props, 'itemCodeableConcept.coding.0', {});
  const reference = _get(props, 'itemReference');
  const amountNumerator = _get(props, 'amount.numerator');
  const amountDenominator = _get(props, 'amount.denominator');
  const hasAmount = amountNumerator && amountDenominator;

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
      <Reference fhirData={reference} />
      {hasAmount && <span>, {amount}</span>}
    </div>
  );
};

const Medication = ({
  fhirResource,
  fhirVersion,
  fhirIcons,
  onClick,
  rawOnClick,
  customId,
}) => {
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
    status,
  } = fhirResourceData;

  const tableData = [
    {
      label: 'Manufacturer',
      testId: 'manufacturer',
      data: manufacturer && <Reference fhirData={manufacturer} />,
      status: manufacturer,
    },
  ];

  const productData = [
    {
      label: 'Form',
      testId: 'product-form',
      data:
        productForm &&
        productForm.map((item, i) => (
          <Coding key={`item-${i}`} fhirData={item} />
        )),
      status: productForm,
    },
    {
      label: 'Ingredient',
      testId: 'product-ingredient',
      data:
        hasProductIngredient &&
        productIngredient.map((item, i) => (
          <Ingredient key={`item-${i}`} {...item} />
        )),
      status: hasProductIngredient,
    },
    {
      label: 'Package container',
      testId: 'package-container',
      data:
        hasPackageCoding &&
        packageCoding.map((item, i) => (
          <Coding key={`item-${i}`} fhirData={item} />
        )),
      status: hasPackageCoding,
    },
    {
      label: 'Images',
      testId: 'product-images',
      data:
        hasImages &&
        images.map((item, i) => (
          <Attachment key={`item-${i}`} fhirData={item} isImage />
        )),
      status: hasImages,
    },
  ];

  return (
    <Root name="Medication">
      <Accordion
        headerContent={
          <Header
            resourceName="Medication"
            badges={
              <>
                {isBrand && <Badge data-testid="brand-badge">Brand</Badge>}
                {status && <Badge data-testid="status">{status}</Badge>}
              </>
            }
            title={<Coding fhirData={title} />}
            icon={fhirIcons}
          />
        }
        bodyContent={
          <Body tableData={tableData}>
            {hasProduct && (
              <ValueSection label="Product" marginTop={manufacturer}>
                {productData.map(
                  (item, index) =>
                    item.status && (
                      <ValueSectionItem
                        key={`product-item-${index}`}
                        label={item.label}
                        data-testid={item.testId}
                      >
                        {item.data}
                      </ValueSectionItem>
                    ),
                )}
              </ValueSection>
            )}
          </Body>
        }
        onClick={onClick}
        rawOnClick={rawOnClick}
        customId={customId}
      />
    </Root>
  );
};

Medication.propTypes = {
  fhirResource: PropTypes.shape({}).isRequired,
  fhirVersion: PropTypes.oneOf([
    fhirVersions.DSTU2,
    fhirVersions.STU3,
    fhirVersions.R4,
  ]).isRequired,
};

export default Medication;
