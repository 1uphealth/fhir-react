import React from 'react';

export const Header = props => (
  <div
    style={{
      width: '100%',
      // display: 'inline-block',
      marginBottom: '10px',

      display: 'flex',
      alignItems: 'center',
    }}
  >
    {props.children}
  </div>
);

export const Title = props => (
  <h4 data-testid="title" style={{ marginRight: '10px', marginBottom: '0px' }}>
    {props.children}
  </h4>
);
export const Badge = props => (
  <span data-testid={props['data-testid']} className="badge badge-secondary">
    {props.children}
  </span>
);
export const BadgeSecoundary = props => (
  <span data-testid={props['data-testid']} className="badge badge-light">
    {props.children}
  </span>
);
export const Body = props => <div>{props.children}</div>;
export const Value = props => (
  <div style={{ display: 'flex', marginBottom: '10px' }}>
    <label
      className="text-uppercase text-muted font-weight-bold"
      style={{ marginRight: '10px', marginBottom: '0px' }}
    >
      {props.label}
    </label>
    <div style={{ display: 'inline-block' }} data-testid={props['data-testid']}>
      {props.children}
    </div>
  </div>
);

export const Root = props => (
  <div className={`fhir-resource fhir-resource__${props.name}`}>
    {props.children}
  </div>
);

export const Table = props => (
  <table className="table table-striped">{props.children}</table>
);
export const TableHeader = props => <th>{props.children}</th>;
export const TableRow = props => <tr>{props.children}</tr>;
export const TableCell = props => (
  <td data-testid={props['data-testid']}>{props.children}</td>
);

export const ValueSection = props => (
  <div>
    <label
      className="text-uppercase text-muted font-weight-bold"
      style={{ marginTop: '15px', marginBottom: '10px', fontSize: '1.2em' }}
    >
      {props.label}
    </label>
    <div style={{ paddingLeft: '10px' }}>{props.children}</div>
  </div>
);

export const MissingValue = props => <span className="text-muted">-</span>;
