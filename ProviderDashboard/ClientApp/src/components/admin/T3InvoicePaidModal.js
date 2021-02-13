import React, { useState } from 'react';
import moment from 'moment';
import _ from 'lodash';

import { makeRequest } from '../../utils/request';

import InputGroup from '../common/InputGroup';
import ButtonNoIcon from '../buttons/ButtonNoIcon';
import ButtonWithIcon from '../buttons/ButtonWithIcon';

const formatDate = (date, format = 'MM/DD/YYYY') => {
  if (date === '') return 'Invalid date';
  return moment.utc(date).local().format(format);
};
const formatAmount = (val) => {
  if (val === '') return 'Invalid Amount';
  const result = parseFloat(val);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(result)) return 'Invalid Amount';
  return result;
};

const validators = {
  referenceId: (val) => (val ? null : 'Enter a valid reference ID'),
  amountPaid: (val) => (formatAmount(val) !== 'Invalid Amount' ? null : 'Enter a valid amount'),
  paidDate: (val) => (formatDate(val) !== 'Invalid date' ? null : 'Enter a valid date in the MM/DD/YYYY format'),
};

const MarkInvoicePaidModal = ({ application, onClose }) => {
  const [errors, setErrors] = useState({});
  const [requestErrors, setRequestErrors] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [fields, setFields] = useState({
    applicationId: application.id,
    referenceId: '',
    amountPaid: '',
    paidDate: '',
  });

  const validate = () => {
    const err = {};

    _.forEach(validators, (fn, key) => {
      const result = fn(fields[key]);
      if (result) err[key] = result;
    });

    return { isValid: Object.keys(err).length === 0, err };
  };

  const revalidateField = (key, val) => {
    const result = validators[key] && validators[key](val);
    setErrors({ ...errors, [key]: result });
  };

  const onTextChange = (e) => {
    if (errors[e.target.name]) {
      revalidateField(e.target.name, e.target.value);
    }

    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line consistent-return
  const sendInvoiceData = async (e) => {
    if (e) e.preventDefault();
    setRequestErrors('');
    setSuccess('');

    const { isValid, err } = validate();
    if (!isValid) return setErrors(err);

    try {
      setLoading(true);
      await makeRequest('post', '/api/instructorapplication/SetAppPaidStatus', fields);
      setLoading(false);
      setSuccess('Invocie Updated Successfully');
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      setLoading(false);
      setRequestErrors(err);
    }
  };

  return (
    <div className="w-screen">
      <div className="md-modal md-effect md-show border-2 border-white rounded-t-sm">
        <div className="inline-flex bg-primary text-white w-full items-center">
          <div className="flex-none text-2xl p-2">
            <i className="far fa-thumbs-up" />
          </div>
          <h2 className="flex-1 text-2xl p-2 font-agrandir">Mark Invoice Paid</h2>
          <div className="flex-none p-2">
            <button className="text-3xl" onClick={onClose} type="button">
              <i className="far fa-times-circle" />
            </button>
          </div>
        </div>
        <div className="bg-white px-8 py-4">
          <div>
            <div className="bg-gray-50 rounded border border-gray-100 text-left">
              <div className="flex border-b border-gray-100 py-3">
                <div className="w-full px-2">
                  <InputGroup
                    name="referenceId"
                    value={fields.referenceId}
                    error={errors.referenceId}
                    onChange={(e) => onTextChange(e)}
                    label="CRM Invoice Reference #"
                    isRequired="true"
                  />
                </div>
              </div>
              <div className="flex border-b border-gray-100 py-3">
                <div className="w-1/2 px-2">
                  <InputGroup
                    name="paidDate"
                    isRequired="true"
                    placeholder="MM/DD/YYYY"
                    value={fields.paidDate}
                    error={errors.paidDate}
                    onChange={(e) => onTextChange(e)}
                    label="Date Payment Received"
                  />
                </div>
                <div className="w-1/2 px-2">
                  <InputGroup
                    name="amountPaid"
                    type="text"
                    value={fields.amountPaid}
                    error={errors.amountPaid}
                    onChange={(e) => onTextChange(e)}
                    label="Amount Received"
                    isRequired="true"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center py-5">
              <span className="px-4">
                <ButtonWithIcon title="Save" isLoading={loading} onClick={sendInvoiceData}>
                  <span className="w-6 text-xl">
                    <i className="far fa-thumbs-up" />
                  </span>
                </ButtonWithIcon>
              </span>
              <span className="px-4">
                <ButtonNoIcon title="Cancel" onClick={() => onClose()} />
              </span>
            </div>
            <div className="flex justify-center py-2">
              {requestErrors && <p className="text-sm text-red-600">{requestErrors}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="md-overlay" />
    </div>
  );
};

export default MarkInvoicePaidModal;
