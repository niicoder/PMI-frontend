import React, { useState } from 'react';
import { mutate } from 'swr';
import ButtonNoIcon from '../buttons/ButtonNoIcon';
import InputGroup from '../common/InputGroup';
import { makeRequest } from '../../utils/request';
import Modal from '../common/Modal';

const ApplyVoucherModal = ({ onClose, instructorId, applicationId, providerId }) => {
  const [voucherId, setVoucherId] = useState('');
  const [error, setError] = useState(null);

  const onApply = async () => {
    if (voucherId === '') {
      setError('Input valid voucher Id');
      return;
    }

    try {
      const voucher = await makeRequest('get', `/api/voucher/${voucherId}`);

      if (!voucher.isActive) {
        setError('Not Active Voucher');
        return;
      }
      if (voucher.assigned) {
        setError('Voucher has already been assigned.');
        return;
      }
      if (voucher.consumed) {
        setError('Voucher has already been consumed.');
        return;
      }
    } catch (err) {
      setError('Not valid voucherId.');
      return;
    }

    try {
      await makeRequest('post', '/api/voucher/applyvoucher', {
        instructorId,
        voucherId,
        applicationId,
      }).then(() => {
        mutate(`/api/voucher/byprovider/${providerId}`);
        onClose();
        setError(null);
      });
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Modal onClose={onClose} title="Apply Voucher">
      <div className="p-2">
        <InputGroup
          name="voucherId"
          value={voucherId}
          onChange={(e) => setVoucherId(e.target.value)}
          label="Voucher ID"
        />
      </div>
      <div className="p-2 text-red-500">{error}</div>
      <div className="flex justify-center pb-2">
        <div className="mr-3">
          <ButtonNoIcon title="Apply" disabled={voucherId === ''} onClick={onApply} />
        </div>
        <div className="mr-3">
          <ButtonNoIcon title="Cancel" onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};

export default ApplyVoucherModal;
