import React, { useRef } from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useSubmitForm from 'components/Form/useSubmitForm';
// Import components
import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
import Company from './Company/Company';
import DOB from './DOB/DOB';
import Address from './Address/Address';
import Email from './Email/Email';
import Telephone from './Telephone/Telephone';
import Name from './Name/Name';
import NHS from './NHS/NHS';

const Step4 = ({ setFormSubmitStatus }) => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const {
    formDataState,
    handleSubmit,
    showGenericError,
    isFetching,
  } = useSubmitForm(formRef, setFormSubmitStatus); // Custom hook for handling continue button (validation, errors etc)
  const { CustomerType } = formDataState; // Destructure customertype

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      <SectionStepInfo
        section="Section 4 of 4"
        description="Tell us about yourself"
      />
      {/* Show generic error message */}
      {showGenericError}
      <p>
        We’ll use this information to confirm your identity and contact you if
        we need more information
      </p>

      {/* Only show name fields if customer type is none of the below */}
      {CustomerType !== 'Scratchcard' && CustomerType !== 'ClassPass' && (
        <Name />
      )}

      {/* Only show Company if customer is one of the below */}
      {(CustomerType === 'Corporate' ||
        CustomerType === 'ClassPass' ||
        CustomerType === 'Scratchcard') && <Company />}

      {/* Only show  DOB if not scratchcard and not classpass and not corporate and not Shop */}
      {CustomerType !== 'Scratchcard' &&
        CustomerType !== 'ClassPass' &&
        CustomerType !== 'Corporate' &&
        CustomerType !== 'Shop' && <DOB />}

      {/* Only show address and NHS if not scratchcard and not classpass */}
      {CustomerType !== 'Scratchcard' && CustomerType !== 'ClassPass' && (
        <>
          <Address />
          <NHS />
        </>
      )}

      <Email />
      <Telephone />

      {/* Button onClick logic is located in parent Form component as it is 'submit' form logic */}
      <button
        type="submit"
        className="wmnds-btn wmnds-btn--disabled wmnds-col-1 wmnds-m-t-md"
        disabled={isFetching} // Disable button so users can't spam submit
      >
        Submit application
        {/* If API is fetching */}
        {isFetching && (
          <div
            className="wmnds-loader wmnds-loader--btn wmnds-btn__icon wmnds-btn__icon--right"
            role="alert"
            aria-live="assertive"
          >
            <p className="wmnds-loader__content">Content is loading...</p>
          </div>
        )}
      </button>
    </form>
  );
};

Step4.propTypes = {
  setFormSubmitStatus: PropTypes.func.isRequired,
};

export default Step4;
