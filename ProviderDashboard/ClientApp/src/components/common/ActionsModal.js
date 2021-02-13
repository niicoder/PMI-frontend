import React from 'react';
import ButtonNoIcon from '../buttons/ButtonNoIcon';

const ActionsModal = ({ onSubmit, onClose, yesBtnColor, noBtnColor, modalText }) => {
  const submit = () => {
    onSubmit();
    onClose();
  };

  return (
    <div className="font-agrandir w-screen">
      <div className="md-modal md-effect md-show border-2 border-white rounded-t-sm max-w-md">
        <div className="flex-col bg-white text-black w-full justify-center items-center">
          <h2 className="text-2xl p-2 text-center">{modalText}</h2>
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

export default ActionsModal;
