import React from 'react';

import { getBadgeColor } from '../../utils/getBadgeColor';
import HeaderIcon from '../datatypes/HeaderIcon';

export const Header = props => {
  const rightItemsClass = 'align-items-center flex-fill d-flex';

  return (
    <>
      {// This condition was left due to fact, that to much changes in Header will generate many errors in tests. This condition will be removed after all changes have been made.
      props.children || (
        <div
          className={`fhir-ui__${props.resourceName}-Header w-100 p-4 position-relative`}
        >
          <div
            className={`fhir-ui__${props.resourceName}-Header__title-data ${
              props.isAccordionOpenable ? 'header__title-row' : ''
            } d-flex w-100 flex-column flex-sm-row`}
          >
            <div className="d-flex">
              <div
                className={`fhir-ui__${props.resourceName}-Header__icon flex-shrink-1 m-half me-2`}
              >
                <HeaderIcon headerIcon={props.icon} />
              </div>
              <div
                className={`fhir-ui__${props.resourceName}-Header__title flex-fill text-start`}
              >
                <Title data-testid={props.titleTestID || 'title'}>
                  {props.title || ''}
                </Title>
              </div>
            </div>

            <div
              className={`fhir-ui__${props.resourceName}-Header__badges ps-1 ps-sm-2 mt-3 mt-sm-0 badges-max-width-sm flex-wrap flex-sm-nowrap justify-content-between justify-content-sm-end ${rightItemsClass}`}
            >
              {props.prefixBadge && (
                <div className="me-3">{props.prefixBadge}</div>
              )}
              <div className="d-flex">
                {props.badges}
                {props.additionalBadge && (
                  <div className="ms-3">{props.additionalBadge}</div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`fhir-ui__${
              props.resourceName
            }-Header__additional-content w-100 justify-content-start d-flex  ${
              props.additionalContent ? ' pt-2' : ''
            }`}
          >
            {props.additionalContent}
            <div
              className={`fhir-ui__${props.resourceName}-Header__rightAdditionalContent justify-content-end ${rightItemsClass}`}
            >
              {props.rightAdditionalContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Title = props => (
  <h4
    className="fhir-ui__Title fw-bold fs-4 lh-base mb-0 w-90 title-width-sm"
    data-testid={props['data-testid'] || 'title'}
  >
    {props.children}
  </h4>
);

export const Badge = props => {
  return (
    <small
      className={`fhir-ui__Badge text-capitalize d-flex align-items-center px-2 py-1 rounded-1 fw-bold ${getBadgeColor(
        props,
      )}`}
      data-testid={props['data-testid']}
    >
      {props.children}
    </small>
  );
};

export const BadgeSecondary = props => (
  <small
    className={`fhir-ui__BadgeSecondary px-2 py-1 rounded-1 fw-bold ${getBadgeColor(
      props,
    )}`}
    data-testid={props['data-testid']}
  >
    {props.children}
  </small>
);

export const ValueUnit = props => (
  <div className="fhir-ui__ValueUnitRoot">
    <span
      data-testid="valueQuantity"
      className="fhir-ui__ValueUnitQty fw-bold me-1"
    >
      {props.valueQty}
    </span>
    <span
      data-testid="valueQuantityUnit"
      className="fhir-ui__ValueUnit fw-bold text-gray-500"
    >
      {props.valueUnit}
    </span>
  </div>
);

export const Body = ({ tableData = [], reverseContent, children }) => (
  <div className="fhir-ui__Body">
    {reverseContent ? children : null}
    <div className="row">
      {tableData.map(
        (value, index) =>
          value.status && (
            <div
              className="d-flex flex-column flex-sm-row"
              key={`table-data-item-${index}`}
            >
              <div className="dataTable__value-label ps-0">
                <Label>{value.label}</Label>
              </div>
              <Data data-testid={value.testId}>{value.data}</Data>
            </div>
          ),
      )}
    </div>
    {!reverseContent ? children : null}
  </div>
);

export const Value = props => (
  <div
    className={`fhir-ui__Value d-flex align-items-center flex-wrap flex-sm-nowrap pt-3 pb-2 pt-sm-0 pb-sm-0 ${
      props.dirColumn ? 'flex-column align-items-baseline' : ''
    }`}
  >
    <Label>{props.label}</Label>
    <Data data-testid={props['data-testid']}>{props.children}</Data>
  </div>
);

export const Label = props => (
  <div className="fhir-ui__Label font-source text-secondary lh-lg me-2">
    {props.children}
  </div>
);

export const Data = props => (
  <div
    className="fhir-ui__Data font-source fw-normal lh-lg text-break"
    data-testid={props['data-testid']}
  >
    {props.children}
  </div>
);

export const Root = props => (
  <div className={`fhir-resource__${props.name}`}>{props.children}</div>
);

export const Table = props => (
  <div className="table-responsive">
    <table className={`table table-striped mb-0 ${props.className || ''}`}>
      {props.children}
    </table>
  </div>
);

export const TableHeader = props => {
  const { expand, noWordWrap } = props;
  return (
    <th
      className={`${expand ? 'w-100' : ''} ${
        noWordWrap ? 'text-nowrap' : ''
      } text-gray-500`}
    >
      {props.children}
    </th>
  );
};

export const TableRow = props => <tr>{props.children}</tr>;

export const TableCell = props => (
  <td className="align-text-top border-0" data-testid={props['data-testid']}>
    {props.children}
  </td>
);

export const ValueSection = props => (
  <div
    className={`fhir-ui__ValueSection ${props.marginTop ? 'mt-40' : ''} ${
      props.marginBottom ? 'mb-40' : ''
    } ${props.className || ''}`}
    data-testid={props['data-testid']}
  >
    <label className="fhir-ui__ValueSection-label fw-bold mb-2">
      {props.label}
    </label>
    <div className="fhir-ui__ValueSection-body">{props.children}</div>
  </div>
);

export const MissingValue = props => (
  <span className="fhir-ui__MissingValue">-</span>
);

export const NotEnoughData = props => (
  <div data-testid={props['data-testid']} className="fhir-ui__NotEnoughData">
    No additional data
  </div>
);

export const Chevron = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 8L12.3769 15.8393C12.277 15.9422 12.1414 16 12 16C11.8586 16 11.723 15.9422 11.6231 15.8393L4 8"
      stroke={props.strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
