import React, { useState } from 'react';

import { getBadgeColor } from '../../utils/getBadgeColor';

export const Header = props => {
  const [rotate, setRotate] = useState(false);
  const handleAccordionClick = () => setRotate(!rotate);

  return (
    <>
      {// This condition was left due to fact, that to much changes in Header will generate many errors in tests. This condition will be removed after all changes have been made.
      props.children || (
        <div
          className={`fhir-ui__${props.resourceName}-Header w-100 p-4`}
          onClick={handleAccordionClick}
        >
          <div
            className={`fhir-ui__${props.resourceName}-Header__title-data d-flex w-100`}
          >
            <div
              className={`fhir-ui__${props.resourceName}-Header__icon flex-shrink-1 m-half`}
            >
              {props.icon}
            </div>
            <div
              className={`fhir-ui__${props.resourceName}-Header__title flex-fill text-start ps-2`}
            >
              {props.title}
            </div>
            <div
              className={`fhir-ui__${props.resourceName}-Header__badges flex-fill d-flex justify-content-end`}
            >
              {props.badges}
            </div>
            <div
              className={`fhir-ui__${
                props.resourceName
              }-Header__chevron flex-shrink-1 accordion-arrow mt-1 ms-2${
                rotate ? ' header-rotate' : ''
              }`}
            >
              <Chevron strokeColor={rotate ? '#2a6fd7' : '#6f83a9'} />
            </div>
          </div>
          <div
            className={`fhir-ui__${
              props.resourceName
            }-Header__additional-content w-100 justify-content-start d-flex${
              props.additionalContent ? ' pt-2' : ''
            }`}
          >
            {props.additionalContent}
          </div>
        </div>
      )}
    </>
  );
};

export const Title = props => (
  <h4 className="fhir-ui__Title fw-bold fs-4 lh-lg mb-0" data-testid="title">
    {props.children}
  </h4>
);

export const Badge = props => {
  return (
    <small
      className={`fhir-ui__Badge px-2 py-1 rounded-1 fw-bold ${getBadgeColor(
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

export const Body = props => (
  <div className="fhir-ui__Body pe-4">
    {props.tableData && (
      <table className="fhir-ui__Body__table table table-borderless mb-0">
        <tbody>
          {props.tableData.map((value, index) => {
            return (
              value.status && (
                <tr
                  className="fhir-ui__Body__row py-2"
                  key={`body-table-row-key-${index}`}
                >
                  <td className="fhir-ui__Body__label-cell value__label ps-0">
                    <Label>{value.label}</Label>
                  </td>
                  <td className="fhir-ui__Body__data-cell">
                    <Data data-testid={value.testId}>{value.data}</Data>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    )}
    <div>{props.children}</div>
  </div>
);

export const Value = props => (
  <div className="fhir-ui__Value">
    <Label>{props.label}</Label>
    <Data data-testid={props['data-testid']}>{props.children}</Data>r-react-next
  </div>
);

export const Label = props => (
  <div className="fhir-ui__Label font-source fw-bold text-secondary lh-lg">
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
  <table className={`table table-striped ${props.className}`}>
    {props.children}
  </table>
);

export const TableHeader = props => {
  const { expand, noWordWrap } = props;
  return (
    <th
      className={`${expand && 'w-100'} ${noWordWrap &&
        'text-nowrap'} text-muted`}
    >
      {props.children}
    </th>
  );
};

export const TableRow = props => <tr>{props.children}</tr>;

export const TableCell = props => (
  <td className="align-text-top" data-testid={props['data-testid']}>
    {props.children}
  </td>
);

export const ValueSection = props => (
  <div className="fhir-ui__ValueSection" data-testid={props['data-testid']}>
    <label className="fhir-ui__ValueSection-label">{props.label}</label>
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
