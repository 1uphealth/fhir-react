import React from 'react';

import { getBadgeColor } from '../../utils/getBadgeColor';
import HeaderIcon from '../datatypes/HeaderIcon';

export const Header = ({
  resourceName,
  isAccordionOpenable,
  icon,
  titleTestID,
  title,
  prefixBadge,
  badges,
  additionalBadge,
  additionalContent,
  rightAdditionalContent,
  children,
  capitalize = false,
  isNoIcon = false,
  rawButton,
}) => {
  const rightItemsClass = 'align-items-center flex-fill d-flex';

  return (
    <>
      {// This condition was left due to fact, that to much changes in Header will generate many errors in tests. This condition will be removed after all changes have been made.
      children || (
        <div
          className={`fhir-ui__${resourceName}-Header w-100 p-4 position-relative`}
        >
          <div
            className={`fhir-ui__${resourceName}-Header__title-data ${
              isAccordionOpenable ? 'header__title-row' : ''
            } d-flex w-100 flex-column flex-sm-row`}
          >
            <div className="d-flex align-items-center">
              {!isNoIcon && (
                <div
                  className={`fhir-ui__${resourceName}-Header__icon d-flex align-items-center flex-shrink-1 m-half me-2`}
                >
                  <HeaderIcon headerIcon={icon} resourceName={resourceName} />
                </div>
              )}
              <div
                className={`fhir-ui__${resourceName}-Header__title flex-fill text-start`}
              >
                <Title
                  data-testid={titleTestID || 'title'}
                  capitalize={capitalize}
                >
                  {title || ''}
                </Title>
              </div>
            </div>

            {(prefixBadge || badges || additionalBadge) && (
              <div
                className={`fhir-ui__${resourceName}-Header__badges ps-sm-2 mt-3 mt-sm-0 badges-max-width-sm flex-wrap flex-sm-nowrap justify-content-between justify-content-sm-end ${rightItemsClass}`}
              >
                {prefixBadge && <div className="me-3">{prefixBadge}</div>}
                <div className="d-flex align-items-center">
                  {badges}
                  {additionalBadge && (
                    <div className="ms-3">{additionalBadge}</div>
                  )}
                </div>
              </div>
            )}
          </div>
          {additionalContent || rightAdditionalContent ? (
            <div
              className={`fhir-ui__${resourceName}-Header__additional-content w-100 justify-content-start d-flex ${
                additionalContent ? ' pt-2' : ''
              }`}
            >
              {additionalContent}
              <div
                className={`fhir-ui__${resourceName}-Header__rightAdditionalContent justify-content-md-end mx-0 ${rightItemsClass}`}
              >
                {rightAdditionalContent}
                {rawButton}
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-end">{rawButton}</div>
          )}
        </div>
      )}
    </>
  );
};

export const Title = props => (
  <h4
    className={`fhir-ui__Title fw-bold lh-base mb-0 text-break d-flex ${
      props.capitalize ? 'text-capitalize' : ''
    }`}
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
    className={`fhir-ui__BadgeSecondary px-2 py-1 rounded-1 fw-bold d-flex align-items-center ${getBadgeColor(
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
    <div className="row gap-3">
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
  <div className={`fhir-resource__${props.name} ${props.className}`}>
    {props.children}
  </div>
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

export const TableRow = props => {
  const { children, ...rest } = props;
  return <tr {...rest}>{props.children}</tr>;
};

export const TableCell = props => (
  <td
    className={`${
      props.isAlignTop ? '' : 'align-middle'
    } border-0 ${props.className || ''}`}
    data-testid={props['data-testid']}
    style={props.style}
  >
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

export const MissingValue = () => (
  <span className="fhir-ui__MissingValue">-</span>
);

export const ValueSectionItem = props => {
  return (
    <div className="d-flex flex-column flex-sm-row my-2">
      <div className="dataTable__value-label ps-0">
        <Label>{props.label}</Label>
      </div>
      <Data data-testid={props['data-testid']}>{props.children}</Data>
    </div>
  );
};

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
