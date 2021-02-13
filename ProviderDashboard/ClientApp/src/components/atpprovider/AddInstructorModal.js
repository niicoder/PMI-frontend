import React, { useState } from 'react';
import { mutate } from 'swr';
import ButtonNoIcon from '../buttons/ButtonNoIcon';
import InputGroup from '../common/InputGroup';
import { makeRequest } from '../../utils/request';
import Spinner from '../common/Spinner/Spinner';
import Modal from '../common/Modal';

const AddInstructorModal = ({ reloadData, onClose, providerId }) => {
  const [voucherId, setVoucherId] = useState('');
  const [memberId, setMemberId] = useState('');
  const PMPT3ApplicationType = 2;
  const PMPT3Qualification = 'PMP Exam Trainer';
  const [qualifications] = useState([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const desiredQualifications = [
    {
      id: 0,
      name: 'PMPExamPrep',
      title: PMPT3Qualification,
    },
  ];
  const [fields, setFields] = useState({ '': false });

  const onApply = async () => {
    if (step === 0) {
      setLoading(true);
      await makeRequest('get', `/api/instructor/IsAssignableAsInstructor/${memberId}`)
        .then(async (response) => {
          if (response > 0) {
            setStep((step) => step + 1);
          } else {
            setError('Not valid instructor');
          }
        })
        .catch(() => setError('Not valid instructor'));
      setLoading(false);
    } else if (step === 1) {
      if (fields.PMPExamPrep === true) {
        setError(null);
        setStep((step) => step + 1);
      }
    } else if (step === 2) {
      setLoading(true);
      if (voucherId !== '') {
        try {
          const voucher = await makeRequest('get', `/api/voucher/${voucherId}`);

          if (!voucher.isActive) {
            setError('Not Active Voucher');
            setLoading(false);
            return;
          }
          if (voucher.assigned) {
            setError('Voucher has already been assigned.');
            setLoading(false);
            return;
          }
          if (voucher.consumed) {
            setError('Voucher has already been consumed.');
            setLoading(false);
            return;
          }
        } catch (err) {
          setError('Connection Error');
          setLoading(false);
          return;
        }
      }

      const isExist = await makeRequest('post', 'api/providerrelationship/HasRelationship', {
        parentId: providerId,
        childId: parseInt(memberId, 10),
      });

      if (!isExist) {
        try {
          await makeRequest('post', 'api/instructor', {
            parentId: providerId,
            childId: parseInt(memberId, 10),
          });
        } catch (err) {
          setError(err);
          setLoading(false);
          return;
        }
      } else {
        console.log('Relationship does exist.');
      }

      if (qualifications.find(({ isActive, name }) => isActive === true && name === PMPT3Qualification)) {
        console.log('This instructor has PMPExamPrep qualification already.');
      }
      let applications;
      try {
        applications = await makeRequest('get', `/api/instructorapplication/GetApplicationByInstructorId/${memberId}`);
      } catch (err) {
        setError(err);
        setLoading(false);
        return;
      }

      if (
        applications.results.find(
          ({ isActive, applicationTypeId, providerId: pvId }) =>
            isActive === true && applicationTypeId === PMPT3ApplicationType && pvId === providerId,
        )
      ) {
        console.log('This instructor has an active PMP T3 Application already.');
      } else {
        let applicationId;
        try {
          await makeRequest('post', 'api/instructorapplication', {
            personId: parseInt(memberId, 10),
            applicationTypeId: PMPT3ApplicationType,
            providerId,
          }).then((data) => {
            applicationId = data.id;
          });
        } catch (err) {
          setError(err);
          setLoading(false);
          return;
        }

        if (voucherId !== '') {
          try {
            await makeRequest('post', '/api/voucher/applyvoucher', {
              instructorId: parseInt(memberId, 10),
              voucherId,
              applicationId,
            }).then((data) => {
              console.log('applied: ', data);
              mutate(`/api/voucher/byprovider/${providerId}`);
            });
          } catch (err) {
            setError(err);
            setLoading(false);
            return;
          }
        }
      }
      setLoading(false);
      reloadData();
      onClose();
      setError(null);
    }
  };

  const modalTitle = ['Step 1: Find Person', 'Step 2: Select Qualifications', 'Step 3: Assign Voucher?'];

  return (
    <Modal onClose={onClose} title={modalTitle[step]}>
      <div className="flex-col bg-white text-black w-full justify-center items-center">
        {step === 0 && (
          <>
            <div className="p-2">
              <InputGroup
                name="memberId"
                value={memberId}
                onChange={(e) => {
                  setMemberId(e.target.value);
                  setError('');
                }}
                label="PMI ID / Member ID"
              />
            </div>
          </>
        )}
        {step === 1 && (
          <>
            {desiredQualifications.map((item) => (
              <div className="p-2 flex items-center" key={item.id}>
                <input
                  type="checkbox"
                  checked={fields[item.name]}
                  onChange={() => setFields({ ...fields, [item.name]: !fields[item.name] })}
                  disabled={!!qualifications.find(({ name }) => name === item.name)}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label className="ml-2 block text-sm leading-5 text-gray-900">{item.title}</label>
              </div>
            ))}
          </>
        )}
        {step === 2 && (
          <>
            <div className="p-2">
              <InputGroup
                name="voucherId"
                value={voucherId}
                onChange={(e) => setVoucherId(e.target.value)}
                label="Voucher ID"
              />
            </div>
          </>
        )}
        <div className="text-red-500 p-2">{error}</div>
        <div className="flex justify-center pb-2">
          <div className="mr-3">
            <ButtonNoIcon
              title={loading ? <Spinner size={20} color="white" /> : 'Next'}
              onClick={onApply}
              disabled={step === 1 && fields.PMPExamPrep === false}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddInstructorModal;
