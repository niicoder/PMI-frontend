import React, { useState } from 'react';
import { mutate } from 'swr';
import { useHistory } from 'react-router';
import { makeRequest } from '../../utils/request';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import ProviderSyncModal from './ProviderSyncModal';

const SyncToCoreAction = ({ application }) => {
  const history = useHistory();
  const [modalInfo, setModalInfo] = useState(null);
  const syncCoreProvider = async (providerNumber) => {
    const url = `/api/providers/getproviderfromcore/${providerNumber}`;
    try {
      setModalInfo(providerNumber);
      await makeRequest('get', url);
      await mutate(`/api/admin/applications/${application.id}`);
      history.push(`/admin/application/${application.id}/status`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      {/* MODALS */}
      {modalInfo && (
        <ProviderSyncModal
          onSubmit={() => syncCoreProvider(modalInfo.value)}
          onClose={() => setModalInfo(null)}
          yesBtnColor="green-500"
          noBtnColor="red-600"
          providerNumber={modalInfo}
        />
      )}
      {/* ADMIN BUTTONS */}
      {
        <ButtonWithIcon
          color="green-600"
          colorLight="green-400"
          title="Sync ProviderNumber with PMI_Core"
          fullWidth
          textSize="lg"
          onClick={() => setModalInfo(application.previousRepid)}
        >
          <span className="w-8 text-4xl">
            <i className="far fa-thumbs-up" />
          </span>
        </ButtonWithIcon>
      }
    </div>
  );
};

export default SyncToCoreAction;
