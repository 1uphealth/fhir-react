import './index.css';

import React from 'react';

export const Header = props => (
  <>
    {// TODO comment why children
    props.children ? (
      props.children
    ) : (
      <div className="d-flex w-100 justify-content-between align-items-start">
        <div className="me-3">{props.icon}</div>
        <div className="flex-grow-1 mt-n1">{props.titleSegment}</div>
        <div className="me-3">{props.badge}</div>
      </div>
    )}
  </>
);

export const Title = props => (
  <h4 className="fhir-ui__Title fw-bold fs-4 lh-lg mb-1" data-testid="title">
    {props.children}
  </h4>
);

export const Badge = props => (
  <small
    className="fhir-ui__Badge px-2 py-1 bg-light rounded-1"
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
  <div className="fhir-ui__Body container-fluid pe-5">{props.children}</div>
);

export const Value = props => (
  <div className="fhir-ui__Value row py-1 justify-content-start">
    <Label>{props.label}</Label>
    <Data data-testid={props['data-testid']}>{props.children}</Data>
  </div>
);

export const Label = props => (
  <label className="fhir-ui__Label text-secondary fw-light lh-base ps-0 col-5 col-sm-3 col-xl-2 align-self-start">
    {props.children}
  </label>
);

export const Data = props => (
  <div
    className="fhir-ui__Data text-break fw-normal lh-base pe-0 col align-self-start"
    data-testid={props['data-testid']}
  >
    {props.children}
  </div>
);

export const Root = props => (
  <div className={`fhir-resource fhir-resource__${props.name}`}>
    {props.children}
  </div>
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
