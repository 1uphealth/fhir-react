import React from 'react';
import { render } from '@testing-library/react';
import Markdown from './Markdown';
import dedent from 'dedent';

describe('should render Markdown correctly', () => {
  it('when using regular markdown features', () => {
    const markdown = dedent`
      # Header

      Paragraph one.

      * Bullet point one
      * Bullet point two
    `;
    const expectedHTML = dedent`
      <h1 id="header">Header</h1>
      <p>Paragraph one.</p>
      <ul>
      <li>Bullet point one</li>
      <li>Bullet point two</li>
      </ul>
    `;

    const { getByTestId } = render(<Markdown fhirData={markdown} />);
    expect(getByTestId('markdown').innerHTML.trim()).toEqual(expectedHTML);
  });

  it('escaping the HTML', () => {
    const markdown = dedent`
      # Header

      <script>alert("XSS")</script>
    `;
    const expectedHTML = dedent`
      <h1 id="header">Header</h1>
    `;

    const { getByTestId } = render(<Markdown fhirData={markdown} />);
    expect(getByTestId('markdown').innerHTML.trim()).toEqual(expectedHTML);
  });
});
