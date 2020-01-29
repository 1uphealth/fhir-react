import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import DOMPurify from 'dompurify';

const Markdown = props => {
  const { fhirData } = props;
  const markdown = String(fhirData);
  let html = null;
  try {
    const unsafeHTML = marked(markdown, { gfm: true });
    html = DOMPurify.sanitize(unsafeHTML);
  } catch {}

  const dangerouslySetInnerHTML = html ? { __html: html } : null;
  const children = dangerouslySetInnerHTML ? null : markdown;

  return (
    <div
      className="fhir-datatype__Markdown"
      data-testid="markdown"
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </div>
  );
};

Markdown.propTypes = {
  fhirData: PropTypes.string.isRequired,
};

export default Markdown;
