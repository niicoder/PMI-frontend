import React, { useState } from 'react';
import { mutate } from 'swr';
import ButtonNoIcon from '../buttons/ButtonNoIcon';
import InputGroup from '../common/InputGroup';
import { makeRequest } from '../../utils/request';
import Modal from '../common/Modal';

const AddVoucherModal = ({ onClose, vouchers }) => {
  const [providerId, setProviderId] = useState('');
  const [error, setError] = useState(null);

  const onApply = async () => {
    try {
      const newVoucher = await makeRequest('post', '/api/voucher/addvoucher', {
        providerId: parseInt(providerId, 10),
        applicationTypeId: 2,
        assigned: false,
        consumed: false,
        isActive: true,
      });
      mutate(`/api/voucher/all`, [...vouchers, newVoucher]);
      onClose();
    } catch (err) {
      setError('Not valid Provider Id.');
    }
  };

  return (
    <Modal onClose={onClose} title="Add Voucher">
      <div className="p-2">
        <InputGroup
          name="providerId"
          value={providerId}
          onChange={(e) => setProviderId(e.target.value)}
          label="Provider ID"
        />
      </div>
      <div className="p-2 text-red-500">{error}</div>
      <div className="flex justify-center pb-2">
        <div className="mr-3">
          <ButtonNoIcon title="Add" disabled={providerId === ''} onClick={onApply} />
        </div>
        <div className="mr-3">
          <ButtonNoIcon title="Cancel" onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};

export default AddVoucherModal;
