import './index.css';

import React, { useState } from 'react';

export const Header = props => {
  const [rotate, setRotate] = useState(false);

  const handleAccordionClick = () => {
    if (rotate) {
      setRotate(false);
    } else {
      setRotate(true);
    }
  };

  return (
    <>
      {// This condition was left due to fact, that to much changes in Header will generate many errors in tests. This condition will be removed after all changes have been made.
      props.children ? (
        props.children
      ) : (
        <div className="w-100 p-4 grid" onClick={handleAccordionClick}>
          <div className="item-upper-row-left text-start pb-2">
            {props.upperRowContentLeftSide}
          </div>
          <div className="item-upper-row-right text-end pb-2">
            {props.upperRowContentRightSide}
          </div>
          <div className="item-icon m-auto">{props.icon}</div>
          <div className="item-title text-start ps-2">{props.title}</div>
          <div
            className={`item-arrow accordion-arrow mt-3${
              rotate ? ' header-rotate' : ''
            }`}
          />
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

export const Badge = props => (
  <small
    className={`fhir-ui__Badge px-2 py-1 mb-0 alert ${props.bootstrapAlertType ||
      'alert-secondary'}`}
    data-testid={props['data-testid']}
  >
    {props.children}
  </small>
);

export const BadgeSecondary = props => (
  <span className="fhir-ui__BadgeSecondary" data-testid={props['data-testid']}>
    {props.children}
  </span>
);

export const Body = props => (
  <div className="fhir-ui__Body pe-4">
    {props.tableData && (
      <table className="table table-borderless mb-0">
        <tbody>
          {props.tableData.map((value, index) => {
            return (
              value.status && (
                <tr key={`body-table-row-key-${index}`}>
                  <td className="value__label py-1 ps-0">
                    <Label>{value.label}</Label>
                  </td>
                  <td className="py-1">
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
  <div className="fhir-ui__Label text-secondary fw-light lh-base">
    {props.children}
  </div>
);

export const Data = props => (
  <div
    className="fhir-ui__Data text-break fw-normal lh-base"
    data-testid={props['data-testid']}
  >
    {props.children}
  </div>
);

export const Root = props => (
  <div className={`fhir-resource__${props.name}`}>{props.children}</div>
);

export const Table = props => (
  <table className="fhir-ui__Table">{props.children}</table>
);

export const TableHeader = props => {
  const { expand, noWordWrap } = props;
  let className = 'fhir-ui__TableHeader';
  if (expand) className += ' fhir-ui__TableHeader--expand';
  if (noWordWrap) className += ' fhir-ui__TableHeader--no-word-wrap';
  return <th className={className}>{props.children}</th>;
};

export const TableRow = props => (
  <tr className="fhir-ui__TableRow">{props.children}</tr>
);

export const TableCell = props => (
  <td className="fhir-ui__TableCell" data-testid={props['data-testid']}>
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
