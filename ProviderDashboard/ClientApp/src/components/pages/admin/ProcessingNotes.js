import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import cn from 'classnames';
import InputGroup from '../../common/InputGroup';
import ButtonWithIcon from '../../buttons/ButtonWithIcon';
import { makeRequest } from '../../../utils/request';
import { isAdminA, isAnyAdmin } from '../../../utils/persist';
import { getUserShortName } from '../../../utils/user';
import Spinner from '../../common/Spinner/Spinner';

const validators = {
  note: (val) => (val ? null : 'This field is required'),
};

const ProcessingNotes = ({ application, onSuccess, isInstructorApp }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    note: '',
    isVisibleToProvider: false,
  });
  const [notes, setNotes] = useState(null);

  const fetcInstructorNotes = async () => {
    const notes = await makeRequest('get', `/api/pmpprocessingnote/GetProcessingNotes/${application.id}`);

    const sortedNotes = _.orderBy(notes, ['dateCreated'], ['desc']);
    setNotes(sortedNotes);
  };

  useEffect(() => {
    if (isInstructorApp) {
      fetcInstructorNotes();
    } else {
      const notes = _.orderBy(application.notes, ['dateCreated'], ['desc']);
      setNotes(notes);
    }
  }, [isInstructorApp, application]);

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
      if (isInstructorApp) {
        const noteDto = {
          body: fields.note,
          appId: application.id,
          isVisibleToProvider: fields.isVisibleToProvider,
          statusIdSnapshot: application.statusId.toString(),
        };
        await makeRequest('post', `/api/pmpprocessingnote/AddProcessingNote`, noteDto);
        setNotes(null);
        await fetcInstructorNotes();
      } else {
        await makeRequest('post', `/api/providerapplication/AddProcessingNote/${application.id}`, fields);
      }

      setFields({ note: '', isVisibleToProvider: false });
      setLoading(false);
      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleNoteVisibilityForUser = async (noteId, visible) => {
    try {
      const url = isInstructorApp
        ? `/api/pmpprocessingnote/SetNoteVisibility/${application.id}/${noteId}/${visible}`
        : `/api/admin/applications/${application.id}/note/${noteId}/setvisibility/${visible}`;
      await makeRequest('post', url);
      setNotes(null);
      if (isInstructorApp) await fetcInstructorNotes();
      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!notes && (
        <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
          <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
            <div className="font-semibold text-lg font-agrandir py-3 pr-4">Processing Notes</div>
            <Spinner />
          </div>
        </div>
      )}

      {notes && (
        <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
          <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
            <div className="font-semibold text-lg font-agrandir py-3 pr-4">Processing Notes</div>
          </div>

          <div className="px-8 py-4">
            <form onSubmit={submit}>
              <div>
                <InputGroup
                  type="textarea"
                  label="Add Notes"
                  name="note"
                  value={fields.note}
                  onChange={onTextChange}
                  error={errors.note}
                />
              </div>

              <div className="mt-3 flex justify-between items-center">
                <div className="">
                  {isAdminA() && (
                    <div className="">
                      <input
                        id="isVisibleToProvider"
                        name="isVisibleToProvider"
                        type="checkbox"
                        checked={fields.isVisibleToProvider}
                        onChange={() => {
                          setFields({
                            ...fields,
                            isVisibleToProvider: !fields.isVisibleToProvider,
                          });
                        }}
                        className={cn('form-checkbox')}
                      />

                      <label htmlFor="isVisibleToProvider" className="ml-3 font-medium leading-5 text-gray-600">
                        Is visible to end user?
                      </label>
                    </div>
                  )}
                </div>

                <div>
                  <ButtonWithIcon isLoading={loading} type="submit" title="Add Note">
                    <span className="w-6 text-xl">
                      <i className="fas fa-edit" />
                    </span>
                  </ButtonWithIcon>
                </div>
              </div>
            </form>
          </div>

          {notes.map((item) =>
            isAnyAdmin() || item.isVisibleToProvider ? (
              <div key={item.id} className="px-8 py-4">
                <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
                  <div className="bg-gray-200 flex justify-between px-3 items-center">
                    <div className="font-semibold font-agrandir py-2 pr-4 capitalize">
                      {getUserShortName(item.createdByName)}
                    </div>
                    <div className="text-right text-sm text-gray-600 italic">
                      <span>{moment(item.dateCreated).format('MM/DD/YYYY')}</span>
                    </div>
                  </div>

                  <div className="px-8 py-4">{item.body}</div>

                  {isAnyAdmin() && (
                    <div className="bg-gray-300 px-3 py-1">
                      <input
                        id={item.id}
                        name={item.id}
                        type="checkbox"
                        checked={item.isVisibleToProvider}
                        onChange={(event) => toggleNoteVisibilityForUser(item.id, event.target.checked)}
                        className="form-checkbox cursor-pointer"
                      />

                      <label htmlFor={item.id} className="ml-3 font-medium leading-5 text-gray-600">
                        Is visible to end user?
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
};

export default ProcessingNotes;
