import React, { useState, useCallback } from 'react';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import InputGroup from '../common/InputGroup';

import { makeRequest } from '../../utils/request';
import ButtonNoIcon from '../buttons/ButtonNoIcon';

const AssignProviderNumberModal = ({ onClose, application, onSuccess }) => {
  const [error, setError] = useState(null);
  const [previousRepID, setPreviousRepID] = useState(application.previousRepid);
  const [coreProviderDto, setCoreProviderDto] = useState(null);
  const [confirmCoreSync, setConfirmCoreSync] = useState(false);
  const [useCoreProvider, setUseCoreProvider] = useState(false);

  const setCoreProvider = (dtoData) => {
    setCoreProviderDto(dtoData);
  };

  const onSetPreviousRepID = (e) => {
    setPreviousRepID(e.target.value);
  };

  const handleConfirmCoreProvider = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      try {
        // add a new provider number unless an existing one was selected
        let apiUrl = `/api/admin/applications/synccoreprovider/${application.id}`;
        if (previousRepID && useCoreProvider) apiUrl += `/${previousRepID}`;

        await makeRequest('post', apiUrl);
        if (onSuccess) {
          onSuccess();
        } else {
          onClose();
        }
      } catch (err) {
        setCoreProvider(null);
        setError('Enter a valid provider number');
      }
    },
    [previousRepID, useCoreProvider],
  );

  const onGetPreviousProvider = useCallback(
    // eslint-disable-next-line consistent-return
    async (e) => {
      if (e) e.preventDefault();
      if (previousRepID.trim() === '') {
        setCoreProvider(null);
        return setError('Enter a valid provider number');
      }

      try {
        await makeRequest('get', `/api/providers/core/${previousRepID}`).then((data) => {
          setCoreProvider(data);
          setError(null);
        });
      } catch (err) {
        setCoreProvider(null);
        setError('Enter a valid provider number');
      }
    },
    [previousRepID],
  );

  const confirmCoreSyncProvider = (useCoreProvider) => {
    setUseCoreProvider(useCoreProvider);
    setConfirmCoreSync(true);
  };

  return (
    <div className="w-screen">
      <div className="md-modal md-effect md-show border-2 border-white rounded-t-sm" id="instructor-modal">
        <div className="inline-flex bg-primary text-white w-full items-center">
          <div className="flex-none text-2xl p-2">
            <i className="fas fa-clipboard-list" />
          </div>
          <h2 className="flex-1 text-2xl p-2 font-agrandir">Assign Provider Number</h2>
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
                <div className="w-1/2 mr-2">
                  <InputGroup
                    name="previousRepid"
                    value={previousRepID}
                    onChange={(e) => onSetPreviousRepID(e)}
                    label="Previous REP Id"
                  />
                </div>
                <div className="w-1/2 mt-5">
                  <ButtonWithIcon title="Get Provider" onClick={onGetPreviousProvider} />
                </div>
              </div>
              {coreProviderDto && (
                <div className="border-b border-gray-100">
                  <div className="w-full">
                    <div>
                      <strong>Organization Name</strong>
                      <div>{coreProviderDto.orgName}</div>
                    </div>
                    <div>
                      <strong>Address</strong>
                      <div>
                        {coreProviderDto.addressLine1}
                        <br />
                        {coreProviderDto.addressLine2}
                        <br />
                        {`${coreProviderDto.addressCity},${coreProviderDto.addressState} ${coreProviderDto.addressZip}`}
                        <br />
                        {coreProviderDto.addressCountryId}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="border-b border-gray-100">
                  <div className="w-full">
                    <p>{error}</p>
                  </div>
                </div>
              )}
            </div>

            {!confirmCoreSync && (
              <div className="flex justify-center py-5 px-2">
                {coreProviderDto && (
                  <span className="pr-4">
                    <ButtonNoIcon
                      title="Assign Core Provider Number"
                      disabled={!coreProviderDto}
                      onClick={() => confirmCoreSyncProvider(true)}
                    />
                  </span>
                )}
                <span>
                  <ButtonNoIcon title="Assign New Provider Number" onClick={() => confirmCoreSyncProvider(false)} />
                </span>
              </div>
            )}
            {confirmCoreSync && (
              <div className="py-5">
                {!useCoreProvider && <p>This will assign a new provider number to this application.</p>}
                {useCoreProvider && (
                  <p>
                    This will establish a link between this application and the Core Provider &quot;$
                    {coreProviderDto.orgName}
                    &quot;.
                  </p>
                )}
                <div className="flex justify-center py-5">
                  <span className="px-4">
                    <ButtonNoIcon title="Cancel" onClick={onClose} />
                  </span>
                  <span className="px-4">
                    <ButtonNoIcon title="Confirm" onClick={() => handleConfirmCoreProvider()} />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md-overlay" />
    </div>
  );
};

export default AssignProviderNumberModal;
