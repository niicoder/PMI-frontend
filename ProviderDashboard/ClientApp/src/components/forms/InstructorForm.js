import React, { useState } from 'react';
import _ from 'lodash';
import ButtonWithIcon from '../buttons/ButtonWithIcon';

const validators = {
  instructorName: (val) => (val ? null : 'This fields is required'),
  addressLine1: (val) => (val ? null : 'This fields is required'),
  addressCity: (val) => (val ? null : 'This fields is required'),
  addressZip: (val) => (val ? null : 'This fields is required'),
  addressState: (val) => (val ? null : 'This fields is required'),
  addressCountryId: (val) => (val ? null : 'This fields is required'),
};

const InstructorForm = ({ edit = false, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    instructorName: 'q',
    addressLine1: 'q',
    addressCity: 'q',
    addressState: 'q',
    addressZip: 'q',
    addressCountryId: 'q',
    phone: '',
    email: '',
    website: '',
    pmiId: '',
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
    if (e) e.preventDefault();
    const { isValid, err } = validate();
    if (!isValid) return setErrors(err);

    onSubmit();
  };

  return (
    <form id="instructor-form" onSubmit={submit}>
      <div>
        <label htmlFor="name" className="block font-medium leading-5 text-gray-600">
          <span className="text-red-600">*</span>
          Instructor Name
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            id="instructorName"
            name="instructorName"
            value={fields.instructorName}
            onChange={onTextChange}
            className="form-input block w-full sm:text-sm sm:leading-5"
          />
        </div>
        {errors.instructorName && <p className="mt-2 text-sm text-red-600">{errors.instructorName}</p>}
      </div>
      <div className="flex justify-between">
        <div className="w-1/3 mr-1">
          <div className="mt-4">
            <label htmlFor="phone" className="block font-medium leading-5 text-gray-600">
              Phone Number
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="phone"
                name="phone"
                value={fields.phone}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>
        <div className="w-2/3 ml-1">
          <div className="mt-4">
            <label htmlFor="email" className="block font-medium leading-5 text-gray-600">
              E-Mail
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="email"
                name="email"
                value={fields.email}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="address" className="block font-medium leading-5 text-gray-600">
          <span className="text-red-600">*</span>
          Street Address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            id="addressLine1"
            name="addressLine1"
            value={fields.addressLine1}
            onChange={onTextChange}
            className="form-input block w-full sm:text-sm sm:leading-5"
          />
        </div>
        {errors.addressLine1 && <p className="mt-2 text-sm text-red-600">{errors.addressLine1}</p>}
      </div>

      <div className="flex justify-between">
        <div className="w-1/2 mr-1">
          <div className="mt-4">
            <label htmlFor="city" className="block font-medium leading-5 text-gray-600">
              <span className="text-red-600">*</span>
              City
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="addressCity"
                name="addressCity"
                value={fields.addressCity}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
            {errors.addressCity && <p className="mt-2 text-sm text-red-600">{errors.addressCity}</p>}
          </div>
        </div>

        <div className="w-1/2 ml-1">
          <div className="mt-4">
            <label htmlFor="state" className="block font-medium leading-5 text-gray-600">
              <span className="text-red-600">*</span>
              State/Province
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="addressState"
                name="addressState"
                value={fields.addressState}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
            {errors.addressState && <p className="mt-2 text-sm text-red-600">{errors.addressState}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-1/2 mr-1">
          <div className="mt-4">
            <label htmlFor="zip" className="block font-medium leading-5 text-gray-600">
              <span className="text-red-600">*</span>
              Zip/Postal Code
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="addressZip"
                name="addressZip"
                value={fields.addressZip}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
            {errors.addressZip && <p className="mt-2 text-sm text-red-600">{errors.addressZip}</p>}
          </div>
        </div>
        <div className="w-1/2 ml-1">
          <div className="mt-4">
            <label htmlFor="country" className="block font-medium leading-5 text-gray-600">
              <span className="text-red-600">*</span>
              Country
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="addressCountryId"
                name="addressCountryId"
                value={fields.addressCountryId}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
            {errors.addressCountryId && <p className="mt-2 text-sm text-red-600">{errors.addressCountryId}</p>}
          </div>
        </div>
      </div>

      <div className="pt-5">
        <hr />
      </div>

      <div className="flex justify-between">
        <div className="w-1/2 mr-1">
          <div className="mt-4">
            <label htmlFor="pmiId" className="block font-medium leading-5 text-gray-600">
              PMI ID
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="pmiId"
                name="pmiId"
                value={fields.pmiId}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-1">
          <div className="mt-4">
            <label htmlFor="website" className="block font-medium leading-5 text-gray-600">
              Website(s)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="website"
                name="website"
                value={fields.website}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <ButtonWithIcon title={edit ? 'Edit Instructor' : 'Add Instructor'} type="submit" size="2">
          <span className="w-6 text-xl">
            <i className={`fas ${edit ? 'fa-edit' : 'fa-plus'}`} />
          </span>
        </ButtonWithIcon>
      </div>
    </form>
  );
};

export default InstructorForm;
