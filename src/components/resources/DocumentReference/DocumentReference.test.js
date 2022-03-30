import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { nbspRegex } from '../../../testUtils';
import fhirVersions from '../fhirResourceVersions';
import DocumentReference from './DocumentReference';

import dstu2Example1 from '../../../fixtures/dstu2/resources/documentReference/example1.json';
import stu3Example1 from '../../../fixtures/stu3/resources/documentReference/example1.json';
import r4Example1 from '../../../fixtures/r4/resources/documentReference/example1.json';
import fhirIcons from '../../../fixtures/example-icons';

describe('should render the DocumentReference component properly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
    };

    const { getByAltText } = render(<DocumentReference {...defaultProps} />);
    const headerIcon = getByAltText('document reference');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: false,
    };

    const { getByTestId } = render(<DocumentReference {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: (
        <img
          src={require('../assets/containers/DocumentReference/document-reference.svg')}
          alt="document reference"
        />
      ),
    };

    const { getByAltText } = render(<DocumentReference {...defaultProps} />);
    const headerIcon = getByAltText('document reference');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<DocumentReference {...defaultProps} />);
    const headerIcon = getByAltText('document reference');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirVersion: fhirVersions.DSTU2,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<DocumentReference {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });
  it('should render with DSTU2 source data', () => {
    const { getByTestId } = render(
      <DocumentReference
        fhirResource={dstu2Example1}
        fhirVersion={fhirVersions.DSTU2}
      />,
    );

    expect(getByTestId('title').textContent).toEqual('Physical');
    expect(getByTestId('status').textContent).toEqual('current');
    expect(getByTestId('docStatus').textContent).toEqual('preliminary');
    expect(getByTestId('createdAt').textContent).toEqual('12/24/2005');
    expect(getByTestId('type').textContent.split(nbspRegex)).toEqual([
      'Outpatient Note',
      '(34108-1)',
    ]);
    expect(getByTestId('class').textContent.split(nbspRegex)).toEqual([
      'History and Physical',
      '(History and Physical)',
    ]);
    expect(getByTestId('securityLabel').textContent.split(nbspRegex)).toEqual([
      'very restricted',
      '(V)',
    ]);
    expect(getByTestId('context.event').textContent.split(nbspRegex)).toEqual([
      'Arm',
      '(T-D8200)',
    ]);
  });

  it('should render document reference contents with DSTU2 source data', () => {
    const { getAllByTestId } = render(
      <DocumentReference
        fhirResource={dstu2Example1}
        fhirVersion={fhirVersions.DSTU2}
      />,
    );
    const formats = getAllByTestId('content.format').map(node =>
      node.textContent.split(nbspRegex),
    );
    expect(formats).toEqual([
      ['History and Physical Specification', '(urn:ihe:pcc:handp:2008)'],
    ]);
    const sizes = getAllByTestId('content.size').map(node => node.textContent);
    expect(sizes).toEqual(['3.65 kB']);
    const urls = getAllByTestId('content.url').map(node => node.textContent);
    expect(urls).toEqual(['Binary/07a6483f-732b-461e-86b6-edb665c45510']);
  });

  it('should render with STU3 source data', () => {
    const { getByTestId } = render(
      <DocumentReference
        fhirResource={stu3Example1}
        fhirVersion={fhirVersions.STU3}
      />,
    );

    expect(getByTestId('title').textContent).toEqual('Physical');
    expect(getByTestId('status').textContent).toEqual('current');
    expect(getByTestId('docStatus').textContent).toEqual('preliminary');
    expect(getByTestId('createdAt').textContent).toEqual('12/24/2005');
    expect(getByTestId('type').textContent.split(nbspRegex)).toEqual([
      'Outpatient Note',
      '(34108-1)',
    ]);
    expect(getByTestId('class').textContent.split(nbspRegex)).toEqual([
      'History and Physical',
      '(History and Physical)',
    ]);
    expect(getByTestId('securityLabel').textContent.split(nbspRegex)).toEqual([
      'very restricted',
      '(V)',
    ]);
    expect(getByTestId('context.event').textContent.split(nbspRegex)).toEqual([
      'Arm',
      '(T-D8200)',
    ]);
  });

  it('should render document reference contents with STU3 source data', () => {
    const { getAllByTestId } = render(
      <DocumentReference
        fhirResource={stu3Example1}
        fhirVersion={fhirVersions.STU3}
      />,
    );
    const formats = getAllByTestId('content.format').map(node =>
      node.textContent.split(nbspRegex),
    );
    expect(formats).toEqual([
      ['History and Physical Specification', '(urn:ihe:pcc:handp:2008)'],
    ]);
    const sizes = getAllByTestId('content.size').map(node => node.textContent);
    expect(sizes).toEqual(['3.65 kB']);
    const urls = getAllByTestId('content.url').map(node => node.textContent);
    expect(urls).toEqual(['Binary/07a6483f-732b-461e-86b6-edb665c45510']);
  });

  it('should render with R4 source data', () => {
    const { getByTestId, queryByTestId } = render(
      <DocumentReference
        fhirResource={r4Example1}
        fhirVersion={fhirVersions.R4}
      />,
    );

    expect(getByTestId('title').textContent).toEqual('Physical');
    expect(getByTestId('status').textContent).toEqual('current');
    expect(queryByTestId('docStatus')).toBeNull();
    expect(getByTestId('createdAt').textContent).toEqual('12/24/2005');
    expect(getByTestId('type').textContent.split(nbspRegex)).toEqual([
      'Outpatient Note',
      '(34108-1)',
    ]);
    expect(queryByTestId('class')).toBeNull();
    expect(getByTestId('securityLabel').textContent.split(nbspRegex)).toEqual([
      'very restricted',
      '(V)',
    ]);
    expect(getByTestId('context.event').textContent.split(nbspRegex)).toEqual([
      'Arm',
      '(T-D8200)',
    ]);
  });

  it('should render document reference contents with R4 source data', () => {
    const { getAllByTestId } = render(
      <DocumentReference
        fhirResource={r4Example1}
        fhirVersion={fhirVersions.R4}
      />,
    );
    const formats = getAllByTestId('content.format').map(node =>
      node.textContent.split(nbspRegex),
    );
    expect(formats).toEqual([
      ['History and Physical Specification', '(urn:ihe:pcc:handp:2008)'],
    ]);
    const sizes = getAllByTestId('content.size').map(node => node.textContent);
    expect(sizes).toEqual(['3.65 kB']);
    const urls = getAllByTestId('content.url').map(node => node.textContent);
    expect(urls).toEqual(['Binary/07a6483f-732b-461e-86b6-edb665c45510']);
  });

  it("should render link if it doesn't point to the Binary resource", () => {
    const resource = JSON.parse(JSON.stringify(r4Example1));
    resource.content[0].attachment.url = 'http://example.org/resource.pdf';
    const { getAllByTestId } = render(
      <DocumentReference
        fhirResource={resource}
        fhirVersion={fhirVersions.R4}
      />,
    );

    const urls = getAllByTestId('content.url').map(node => node.textContent);
    expect(urls).toEqual(['Link']);
  });

  it('should render resource type and id if the URL points to the Binary resource in the 1up API', () => {
    const resource = JSON.parse(JSON.stringify(r4Example1));
    resource.content[0].attachment.url =
      'https://api.1up.health/fhir/dstu2/Binary/123fds3fds45GDF4';
    const { getAllByTestId } = render(
      <DocumentReference
        fhirResource={resource}
        fhirVersion={fhirVersions.R4}
      />,
    );

    const urls = getAllByTestId('content.url').map(node => node.textContent);
    expect(urls).toEqual(['Binary/123fds3fds45GDF4']);
  });

  it('should render resource type and id if the URL points to the Binary resource on some domain', () => {
    const resource = JSON.parse(JSON.stringify(r4Example1));
    resource.content[0].attachment.url =
      'http://example.org/xds/mhd/Binary/07a6483f-732b-461e-86b6-edb665c45510';
    const { getAllByTestId } = render(
      <DocumentReference
        fhirResource={resource}
        fhirVersion={fhirVersions.R4}
      />,
    );

    const urls = getAllByTestId('content.url').map(node => node.textContent);
    expect(urls).toEqual(['Binary/07a6483f-732b-461e-86b6-edb665c45510']);
  });

  it('should fire custom onClick function', () => {
    const resource = JSON.parse(JSON.stringify(r4Example1));
    resource.content[0].attachment.url =
      'http://example.org/xds/mhd/Binary/07a6483f-732b-461e-86b6-edb665c45510';

    const onClick = jest.fn();
    const { getByRole } = render(
      <DocumentReference
        fhirResource={resource}
        fhirVersion={fhirVersions.R4}
        onClick={onClick}
      />,
    );
    const accordion = getByRole('button');

    fireEvent.click(accordion);

    expect(onClick).toHaveBeenCalled();
  });
});
