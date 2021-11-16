import React from 'react';

const Accordion = props => {
  const { headerContent, bodyContent } = props;

  return (
    <div className="fhir-container__Accordion accordion">
      <div className="fhir-container__Accordion__body accordion-body">
        <div className="fhir-container__Accordion__body-data accordion-item border-1 shadow-sm">
          <div
            className="fhir-container__Accordion__header accordion-header"
            id="flush-headingOne"
          >
            <button
              className="fhir-container__Accordion__header-button w-100 p-0 border-0 rounded-1 collapsed text-dark bg-white shadow-none"
              type="button"
              data-bs-target="#collapseTarget"
              data-bs-toggle="collapse"
              aria-controls="collapseTarget"
              aria-expanded="false"
            >
              <div className="fhir-container__Accordion__header-text d-flex w-100 justify-content-start">
                {headerContent}
              </div>
            </button>
          </div>
          <div
            className="fhir-container__Accordion__data accordion-collapse collapse"
            id="collapseTarget"
          >
            <div className="fhir-container__Accordion__data-text accordion-body ps-4 pt-3 pe-4 border-top">
              {bodyContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
