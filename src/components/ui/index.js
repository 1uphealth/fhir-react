import './index.css';

import React from 'react';

export const Header = props => (
  <div className="fhir-ui__Header">{props.children}</div>
);

export const Title = props => (
  <h4 className="fhir-ui__Title" data-testid="title">
    {props.children}
  </h4>
);

export const Badge = props => (
  <span className="fhir-ui__Badge" data-testid={props['data-testid']}>
    {props.children}
  </span>
);

export const BadgeSecondary = props => (
  <span className="fhir-ui__BadgeSecondary" data-testid={props['data-testid']}>
    {props.children}
  </span>
);

export const Body = props => (
  <div className="fhir-ui__Body container-fluid">{props.children}</div>
);

export const Value = props => (
  <div className="fhir-ui__Value">
    <label className="fhir-ui__Value-label">{props.label}</label>
    <div data-testid={props['data-testid']}>{props.children}</div>
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
