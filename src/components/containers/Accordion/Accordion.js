import React from 'react';

const Accordion = props => {
  const { headerData, bodyData } = props;
  return (
    <div className="accordion fhir-container__Accordion">
      <div className="accordion-body fhir-container__Accordion__body">
        <div className="accordion-item fhir-container__Accordion__item">
          <div
            className="accordion-header fhir-container__Accordion__header"
            id="flush-headingOne"
          >
            <button
              className="accordion-button collapsed text-dark bg-white shadow-none fhir-container__Accordion__header"
              type="button"
              data-bs-target="#collapseTarget"
              data-bs-toggle="collapse"
              aria-controls="collapseTarget"
              aria-expanded="false"
            >
              <div className="d-flex justify-content-start fhir-container__Accordion__header__text">
                {headerData}
              </div>
            </button>
          </div>
          <div
            className="accordion-collapse collapse fhir-container__Accordion__data"
            id="collapseTarget"
          >
            <div className="accordion-body fhir-container__Accordion__data__text">
              {bodyData}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;