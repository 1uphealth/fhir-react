import React from 'react';

const Accordion = props => {
  const { headerContent, bodyContent, onClick } = props;

  return (
    <div onClick={onClick} className="accordion fhir-container__Accordion">
      <div className="accordion-body fhir-container__Accordion__body">
        <div className="accordion-item border-0 rounded-3 shadow-sm  fhir-container__Accordion__item">
          <div
            className="accordion-header fhir-container__Accordion__header"
            id="flush-headingOne"
          >
            <button
              className="w-100 p-0 border-0 rounded-3 collapsed text-dark bg-white shadow-none fhir-container__Accordion__header"
              type="button"
              data-bs-target="#collapseTarget"
              data-bs-toggle="collapse"
              aria-controls="collapseTarget"
              aria-expanded="false"
            >
              <div className="d-flex w-100 justify-content-start fhir-container__Accordion__header__text">
                {headerContent}
              </div>
            </button>
          </div>
          <div
            className="accordion-collapse collapse fhir-container__Accordion__data"
            id="collapseTarget"
          >
            <div className="accordion-body pe-4 fhir-container__Accordion__data__text">
              {bodyContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
