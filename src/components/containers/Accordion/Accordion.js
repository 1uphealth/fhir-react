import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Accordion.css';

import React from 'react';

const Accordion = props => {
  const { headerData, bodyData } = props;
  return (
    <div className="accordion">
      <div className="accordion-body">
        <div className="accordion-item accordion-item-border-color">
          <div className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed text-dark bg-white shadow-none"
              type="button"
              data-bs-target="#collapseTarget"
              data-bs-toggle="collapse"
              aria-controls="collapseTarget"
              aria-expanded="false"
            >
              <div className="d-flex justify-content-start">{headerData}</div>
            </button>
          </div>
          <div className="accordion-collapse collapse " id="collapseTarget">
            <div className="accordion-body">{bodyData}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
