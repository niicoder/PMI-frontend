import React, { useState } from 'react';
import moment from 'moment';
import _ from 'lodash';

import { makeRequest } from '../../utils/request';

import InputGroup from '../common/InputGroup';
import ButtonNoIcon from '../buttons/ButtonNoIcon';

const formatDate = (date, format = 'MM/DD/YYYY') => {
  if (date === '') return 'Invalid date';
  return moment.utc(date).local().format(format);
};

const validators = {
  referenceId: (val) => (val ? null : 'Enter a valid reference ID'),
  amountPaid: (val) => (val ? null : 'Enter a valid amount'),
  paidDate: (val) => (formatDate(val) !== 'Invalid date' ? null : 'Enter a valid date in the MM/dd/yyyy format'),
};

const SyncATPStatusModal = ({ application = {}, invoice = {}, onClose, onSaveInvoice }) => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    applicationId: application.id,
    applicationTypeId: 1, // ApplicationTypeEnum.ATPProvider
    invoiceId: application.invoiceId || '',
    invoiceAmount: application.planFees || '',
    invoiceDate: application.approvedDate || '',
    referenceId: invoice.referenceId || '',
    amountPaid: (invoice.amountPaid || '').toString(),
    paidDate: invoice.paidDate || '',
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
  const saveInvoiceInfo = (e) => {
    if (e) e.preventDefault();
    const { isValid, err } = validate();
    if (!isValid) return setErrors(err);

    try {
      makeRequest('post', `/api/admin/invoices/syncatpstatus/${fields.applicationId}`, fields)
        .then((data) => {
          onSaveInvoice(data);
        })
        .then(() => {
          makeRequest('post', `/api/admin/applications/status/${fields.applicationId}/PAID`, fields);
        });
    } catch (err) {
      setErrors(err);
    }
  };

  /*
  useEffect(() => {
    try {
      makeRequest(
        "get",
          `/api/admin/invoices/app/${application.id}`
        ).then((data) => {
        //setFields({ ...fields, referenceId: data.referenceId, amountPaid: data.amountPaid, paidDate: data.paidDate });
      });
    } catch (err) {
      //setErrors(err);
    }
  }, [fields]);
  */

  return (
    <div className="w-screen">
      <div className="md-modal md-effect md-show border-2 border-white rounded-t-sm" id="instructor-modal">
        <div className="inline-flex bg-primary text-white w-full items-center">
          <div className="flex-none text-2xl p-2">
            <i className="fas fa-sync" />
          </div>
          <h2 className="flex-1 text-2xl p-2 font-agrandir">Sync ATP Status</h2>
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
                <ButtonNoIcon title="Cancel" onClick={() => onClose()} />
              </span>
              <span className="px-4">
                <ButtonNoIcon title="Save" onClick={() => saveInvoiceInfo()} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="md-overlay" />
    </div>
  );
};

export default SyncATPStatusModal;
