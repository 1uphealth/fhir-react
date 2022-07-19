import Procedure from './Procedure';
import React from 'react';
import dstu2Example1 from '../../../fixtures/dstu2/resources/procedure/example1.json';
import r4Example2 from '../../../fixtures/r4/resources/procedure/example2.json';
import r4Example3 from '../../../fixtures/r4/resources/procedure/example3.json';
import { fireEvent, render } from '@testing-library/react';
import stu3Example1 from '../../../fixtures/stu3/resources/procedure/example1.json';
import fhirIcons from '../../../fixtures/example-icons';
import fhirVersions from '../fhirResourceVersions';

describe('Procedure should render component correctly', () => {
  it('component without a fhirIcons props should render a default icon', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
    };

    const { getByAltText } = render(<Procedure {...defaultProps} />);
    const headerIcon = getByAltText('procedure');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with a false as a fhirIcons props should render a placeholder', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: false,
    };

    const { getByTestId } = render(<Procedure {...defaultProps} />);
    const headerIcon = getByTestId('placeholder');

    expect(headerIcon).toBeTruthy();
  });

  it('component with the img as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: (
        <img
          src={require('../assets/containers/Procedure/procedure.svg')}
          alt="procedure"
        />
      ),
    };

    const { getByAltText } = render(<Procedure {...defaultProps} />);
    const headerIcon = getByAltText('procedure');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the resources object as a fhirIcons props should render an img', () => {
    const defaultProps = {
      fhirVersion: fhirVersions.DSTU2,
      fhirResource: dstu2Example1,
      fhirIcons: fhirIcons,
    };

    const { getByAltText } = render(<Procedure {...defaultProps} />);
    const headerIcon = getByAltText('procedure');

    expect(headerIcon.getAttribute('src')).toContain('IMAGE_MOCK');
  });

  it('component with the url as a fhirIcons props should render an img', () => {
    const avatarSrc =
      'https://www.gravatar.com/avatar/?s=50&r=any&default=identicon&forcedefault=1';
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirIcons: avatarSrc,
    };

    const { getByAltText } = render(<Procedure {...defaultProps} />);
    const headerIcon = getByAltText('header icon');

    expect(headerIcon.getAttribute('src')).toContain(avatarSrc);
  });

  it('should render component correctly with DSTU2 source data', () => {
    const defaultProps = {
      fhirResource: dstu2Example1,
      fhirIcons: fhirIcons,
    };
    const { getByTestId } = render(<Procedure {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual('EYE EXAM');
    expect(getByTestId('hasCoding').textContent).toContain('40707');
  });

  it('should render component correctly with STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirIcons: fhirIcons,
    };
    const { getByTestId } = render(<Procedure {...defaultProps} />);

    expect(String(getByTestId('title').textContent).trim()).toEqual(
      'Appendectomy (Procedure)',
    );
    expect(getByTestId('hasCoding').textContent).toContain('80146002');
  });

  it('should render component that contain extra fields based of STU3 source data', () => {
    const defaultProps = {
      fhirResource: stu3Example1,
      fhirIcons: fhirIcons,
    };
    const { getByTestId } = render(<Procedure {...defaultProps} />);

    expect(String(getByTestId('hasReasonCode').textContent).trim()).toContain(
      'Generalized abdominal',
    );
    expect(getByTestId('hasNote').textContent).toContain(
      'Routine Appendectomy',
    );
  });

  it('should render component correctly with R4 source data - example 1', () => {
    const defaultProps = {
      fhirResource: r4Example2,
      fhirIcons: fhirIcons,
    };
    const { getByTestId, queryByTestId } = render(
      <Procedure {...defaultProps} />,
    );

    expect(getByTestId('title').textContent).toEqual(
      'Insertion of intracardiac pacemaker (procedure)',
    );
    expect(getByTestId('status').textContent).toEqual('completed');
    expect(getByTestId('providedDate').textContent).toEqual('04/05/2015');
    expect(getByTestId('hasCoding').textContent).toContain(
      'Insertion of intracardiac',
    );
    expect(queryByTestId('category')).toBeNull();
    expect(queryByTestId('location')).toBeNull();

    expect(String(getByTestId('hasReasonCode').textContent).trim()).toContain(
      'Bradycardia',
    );
    expect(getByTestId('hasNote').textContent).toContain(
      'Routine Appendectomy',
    );
  });

  it('should render component correctly with STU3 source data - example 2', () => {
    const defaultProps = {
      fhirResource: r4Example3,
      fhirIcons: fhirIcons,
    };
    const { getByTestId, queryByTestId } = render(
      <Procedure {...defaultProps} />,
    );
    expect(getByTestId('title').textContent).toEqual('Chemotherapy');
    expect(getByTestId('status').textContent).toEqual('completed');
    expect(queryByTestId('performedDateTime')).toBeNull();
    expect(getByTestId('hasCoding').textContent).toContain('Chemotherapy');
    expect(queryByTestId('category')).toBeNull();
    expect(queryByTestId('location')).toBeNull();

    expect(String(getByTestId('hasReasonCode').textContent).trim()).toContain(
      'DiagnosticReport/f201',
    );
    expect(getByTestId('hasNote').textContent).toContain(
      'Eerste neo-adjuvante',
    );
  });

  it('should fire custom onClick function', () => {
    const defaultProps = { fhirResource: r4Example3 };

    const onClick = jest.fn();
    const { getByRole } = render(
      <Procedure {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).not.toEqual('collapse');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire custom onClick function', () => {
    const defaultProps = { fhirResource: r4Example3 };

    const onClick = 'test';
    const { getByRole } = render(
      <Procedure {...defaultProps} onClick={onClick} />,
    );
    const accordion = getByRole('button');
    fireEvent.click(accordion);

    const attribute = accordion.getAttribute('data-bs-toggle');
    expect(attribute).toEqual('collapse');
  });
});
