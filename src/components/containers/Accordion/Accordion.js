import React, { useState } from 'react';
import { Chevron } from '../../ui';
import uniqueId from 'lodash/uniqueId';

const CHEVRON_DOWN_COLOR = '#6f83a9';
const CHEVRON_UP_COLOR = '#2a6fd7';

const Accordion = props => {
  const { headerContent, bodyContent, onClick, rawOnClick, customId } = props;
  const [rotate, setRotate] = useState(false);
  const handleAccordionClick = () => setRotate(!rotate);

  const accordionIdText = `accordion-type-${headerContent.props.resourceName ||
    'default'}-`;
  const accordionId =
    typeof customId === 'number'
      ? `${accordionIdText}${customId}`
      : uniqueId(accordionIdText);

  const isAccordionOpenable = () => {
    if (bodyContent) {
      const tableDataCondition =
        bodyContent.props.tableData &&
        bodyContent.props.tableData.filter(x => 'data' in x && x.data).length >
          0;
      const childrenCondition =
        bodyContent.props.children &&
        (bodyContent.props.children.length > 0 || bodyContent.props.children);
      if (tableDataCondition || childrenCondition) {
        return true;
      }
    }
    return false;
  };

  const getChevron = () =>
    isAccordionOpenable() && (
      <div
        className={`fhir-ui__${
          props.resourceName
        }-Header__chevron chevron position-absolute ${
          rotate ? ' header-rotate' : ''
        }`}
        style={{ top: '24px', right: '24px' }}
      >
        <Chevron strokeColor={rotate ? CHEVRON_UP_COLOR : CHEVRON_DOWN_COLOR} />
      </div>
    );

  const isRawInAccordion =
    isAccordionOpenable() && typeof onClick !== 'function';

  const rawButton = (
    <div
      className={`fhir-container__ResourceContainer__json-button-wrapper${
        isRawInAccordion ? '-accordion' : ''
      }`}
    >
      <button
        type="button"
        className="fhir-container__ResourceContainer__json-button"
        onClick={rawOnClick}
      >
        RAW
      </button>
    </div>
  );

  return (
    <div className="fhir-container__Accordion accordion">
      <div className="fhir-container__Accordion__body accordion-body">
        <div className="fhir-container__Accordion__body-data accordion-item border-1 shadow-sm">
          <div
            className="fhir-container__Accordion__header accordion-header"
            id="flush-headingOne"
          >
            <button
              className={`fhir-container__Accordion__header-button w-100 p-0 border-0 rounded-1 collapsed text-dark bg-white shadow-none point`}
              type="button"
              data-bs-target={`#${accordionId}`}
              data-bs-toggle={
                isAccordionOpenable() && typeof onClick !== 'function'
                  ? 'collapse'
                  : null
              }
              aria-controls={accordionId}
              aria-expanded="false"
              onClick={
                typeof onClick === 'function' ? onClick : handleAccordionClick
              }
            >
              <div className="fhir-container__Accordion__header-text d-flex w-100 justify-content-start position-relative">
                {React.cloneElement(headerContent, {
                  isAccordionOpenable: isAccordionOpenable(),
                  rawButton:
                    typeof rawOnClick === 'function' &&
                    !isRawInAccordion &&
                    rawButton,
                })}
                {typeof onClick !== 'function' && getChevron()}
              </div>
            </button>
          </div>
          <div
            className="fhir-container__Accordion__data accordion-collapse collapse"
            id={accordionId}
          >
            <div className="fhir-container__Accordion__data-text accordion-body ps-4 pt-3 pe-4 border-top">
              {bodyContent}
              {typeof rawOnClick === 'function' &&
                isRawInAccordion &&
                rawButton}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
