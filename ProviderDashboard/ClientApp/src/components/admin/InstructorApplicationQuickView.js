import React from 'react';
import ButtonNoIcon from '../buttons/ButtonNoIcon';
import Modal from '../common/Modal';

const TrainerQuickView = ({ onClose, yesBtnColor, children }) => {
  return (
    <Modal onClose={onClose} title="Quick View">
      <div className="p-2">{children}</div>
      <div className="flex justify-center pb-2">
        <div className="mr-3" onClick={onClose}>
          <ButtonNoIcon title="OK" color={yesBtnColor} />
        </div>
      </div>
    </Modal>
  );
};

export default TrainerQuickView;
