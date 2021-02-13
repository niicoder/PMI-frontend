import React, { useState } from 'react';
import ButtonNoIcon from '../buttons/ButtonNoIcon';
import { makeRequest } from '../../utils/request';

const ProviderSyncModal = ({ onSubmit, onClose, yesBtnColor, noBtnColor, providerNumber }) => {
  const submit = () => {
    onSubmit();
    onClose();
  };
  const [adminInputValue, setAdminInputValue] = useState(providerNumber);

  const getCoreProvider = async (providerNumber) => {
    const url = `/api/providers/getproviderfromcore/${providerNumber}`;
    try {
      await makeRequest('get', url);
      // await mutate(`/api/admin/applications/${application.id}`);
      // history.push(`/admin/application/${application.id}/status`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-agrandir w-screen">
      <div className="md-modal md-effect md-show border-2 border-white rounded-t-sm max-w-md">
        <div className="flex-col bg-white text-black w-full justify-center items-center">
          <label className="block font-medium leading-5 text-gray-600" htmlFor="providerNumberInput">
            <span className="text-red-600">*</span>
            Provider Number
          </label>
          <input
            type="text"
            id="providerNumberInput"
            className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Enter Provider Number"
            aria-label="Provider Number"
            value={providerNumber}
            autoFocus
            onChange={(event) => setAdminInputValue(event.target.value)}
          />
          <div className="mr-3" onClick={() => getCoreProvider(adminInputValue)}>
            <ButtonNoIcon title="Get Provider From Core" color={yesBtnColor} />
          </div>
          <div className="flex justify-center pb-2">
            <div className="mr-3" onClick={() => submit()}>
              <ButtonNoIcon title="Yes" color={yesBtnColor} />
            </div>
            <div onClick={onClose}>
              <ButtonNoIcon title="No" color={noBtnColor} />
            </div>
          </div>
        </div>
      </div>
      <div className="md-overlay" onClick={onClose} />
    </div>
  );
};

export default ProviderSyncModal;
