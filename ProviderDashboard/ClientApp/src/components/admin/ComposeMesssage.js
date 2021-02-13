import React, { useState } from 'react';
import cn from 'classnames';
import _ from 'lodash';
import { mutate } from 'swr';
import TabButton from '../buttons/TabButton';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import InputGroup from '../common/InputGroup';
import { makeRequest } from '../../utils/request';

const validators = {
  messageSubject: (val) => (val ? null : 'This field is required'),
  messageBody: (val) => (val ? null : 'This field is required'),
};

const ComposeMessage = ({ startStep = 1, application, onClose }) => {
  const [step, setStep] = useState(startStep);
  const [tab, setTab] = useState(1);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    appId: application.id,
    messageSubject: '',
    messageBody: '',
    messageTypeId: 'MSG_APPLICATION',
  });

  const revalidateField = (key, val) => {
    const result = validators[key](val);
    setErrors({ ...errors, [key]: result });
  };

  const onTextChange = (e) => {
    if (errors[e.target.name]) {
      revalidateField(e.target.name, e.target.value);
    }
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};

    _.forEach(validators, (fn, key) => {
      const result = fn(fields[key]);
      if (result) err[key] = result;
    });

    return { isValid: Object.keys(err).length === 0, err };
  };

  // eslint-disable-next-line consistent-return
  const submit = async (e) => {
    e.preventDefault();
    const { isValid, err } = validate();
    if (!isValid) return setErrors(err);

    try {
      setLoading(true);
      await makeRequest('post', '/api/messages/sendmessage', fields);
      setLoading(false);
      mutate(`/api/providerapplication/${application.id}`);
      onClose();
    } catch (err) {
      setErrors(err);
      setLoading(false);
    }
  };

  return (
    <div className="font-agrandir w-screen">
      <div className="md-modal md-effect md-show border-2 border-white rounded-t-sm" id="compose-modal">
        <div className="inline-flex bg-primary text-white w-full items-center">
          <div className="flex-none text-2xl p-2">
            <i className="fas fa-edit" />
          </div>
          <h2 className="flex-1 text-2xl p-2">Compose Message</h2>
          <div className="flex-none p-2">
            <button className="text-3xl" onClick={onClose} type="button">
              <i className="far fa-times-circle" />
            </button>
          </div>
        </div>
        {step === 1 && (
          <>
            <h3 className="bg-gray-400 px-8 py-1">Step 1: What is this message related to?</h3>
            <div className="bg-white px-4 py-2">
              <div className="inline-flex justify-around w-full">
                <TabButton title="Message" selected={tab === 1} px={6} color="black" onClick={() => setTab(1)}>
                  <span className="text-4xl">
                    <i className="far fa-envelope" />
                  </span>
                </TabButton>
                <TabButton title="Instructor" selected={tab === 2} px={6} color="black" onClick={() => setTab(2)}>
                  <span className="text-4xl">
                    <i className="fas fa-user" />
                  </span>
                </TabButton>
                <TabButton title="Provider" selected={tab === 3} px={6} color="black" onClick={() => setTab(3)}>
                  <span className="text-4xl">
                    <i className="far fa-building" />
                  </span>
                </TabButton>
              </div>

              <h4 className="border-2 bg-gray-200 p-2 mt-8">Select Application</h4>
              <div className="bg-white border-2 mb-4">
                <div className="border-b-2 px-4 py-1 inline-flex w-full cursor-pointer">
                  <span>
                    <i
                      className={cn('far', {
                        'fa-check-circle text-green-500': true,
                        'fa-circle': false,
                      })}
                    />
                  </span>
                  <span className="ml-2">{application.orgName}</span>
                </div>
              </div>
              <div className="flex justify-center">
                <ButtonWithIcon
                  onClick={() => setStep(2)}
                  title="Next"
                  color="blue-500"
                  colorLight="blue-500"
                  textSize="xl"
                  size="2"
                >
                  <span>
                    <i className="fas fa-arrow-circle-right text-2xl" />
                  </span>
                </ButtonWithIcon>
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <form onSubmit={submit}>
            <h3 className="bg-gray-400 px-8 py-1">Step 2: Compose Message</h3>
            <div className="bg-white p-8">
              <div className="my-2">
                <InputGroup
                  name="messageSubject"
                  value={fields.messageSubject}
                  onChange={onTextChange}
                  error={errors.messageSubject}
                  label="Subject"
                />
              </div>
              <div className="my-2">
                <InputGroup
                  name="messageBody"
                  type="textarea"
                  value={fields.messageBody}
                  onChange={onTextChange}
                  error={errors.messageBody}
                  label="Message"
                />
              </div>

              <div className="flex justify-center">
                <ButtonWithIcon
                  title="Send"
                  color="blue-500"
                  colorLight="blue-500"
                  textSize="xl"
                  size="2"
                  isLoading={loading}
                  type="submit"
                >
                  <span>
                    <i className="fas fa-arrow-circle-up text-2xl" />
                  </span>
                </ButtonWithIcon>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="md-overlay" />
    </div>
  );
};

export default ComposeMessage;
