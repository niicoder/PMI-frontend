import React, { useState } from 'react';
import _ from 'lodash';
import ButtonWithIcon from '../buttons/ButtonWithIcon';

const validators = {
  courseTitle: (val) => (val ? null : 'This fields is required'),
  instructor: (val) => (val ? null : 'This fields is required'),
  classType: (val) => (val ? null : 'This fields is required'),
  modality: (val) => (val ? null : 'This fields is required'),
  addressLine1: (val) => (val ? null : 'This fields is required'),
  addressCity: (val) => (val ? null : 'This fields is required'),
  addressZip: (val) => (val ? null : 'This fields is required'),
  addressState: (val) => (val ? null : 'This fields is required'),
  addressCountryId: (val) => (val ? null : 'This fields is required'),
};

const InstructorForm = ({ edit = false, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    courseTitle: 'q',
    instructor: 'q',
    classType: 'q',
    modality: 'q',
    addressLine1: 'q',
    addressCity: 'q',
    addressState: 'q',
    addressZip: 'q',
    addressCountryId: 'q',
    language: '',
    capacity: '',
    date: '',
    from: '',
    to: '',
    dates: [
      {
        date: 'February 15, 2020',
        time: '10:30AM - 02:30PM (EST)',
      },
      {
        date: 'February 16, 2020',
        time: '10:30AM - 02:30PM (EST)',
      },
      {
        date: 'February 17, 2020',
        time: '10:30AM - 02:30PM (EST)',
      },
    ],
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
    <form id="course-form" onSubmit={submit}>
      <div>
        <label htmlFor="courseTitle" className="block font-medium leading-5 text-gray-600">
          <span className="text-red-600">*</span>
          CourseTitle
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            id="courseTitle"
            name="courseTitle"
            value={fields.courseTitle}
            onChange={onTextChange}
            className="form-input block w-full sm:text-sm sm:leading-5"
          />
        </div>
        {errors.courseTitle && <p className="mt-2 text-sm text-red-600">{errors.courseTitle}</p>}
      </div>
      <div className="mt-4">
        <label htmlFor="instructor" className="block font-medium leading-5 text-gray-600">
          <span className="text-red-600">*</span>
          Instructor
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            id="instructor"
            name="instructor"
            value={fields.instructor}
            onChange={onTextChange}
            className="form-input block w-full sm:text-sm sm:leading-5"
          />
        </div>
        {errors.instructor && <p className="mt-2 text-sm text-red-600">{errors.instructor}</p>}
      </div>
      <div className="flex justify-between">
        <div className="w-1/2 mr-1">
          <div className="mt-4">
            <label htmlFor="classType" className="block font-medium leading-5 text-gray-600">
              <span className="text-red-600">*</span>
              ClassType
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="classType"
                name="classType"
                value={fields.classType}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
            {errors.classType && <p className="mt-2 text-sm text-red-600">{errors.classType}</p>}
          </div>
        </div>
        <div className="w-1/2 ml-1">
          <div className="mt-4">
            <label htmlFor="modality" className="block font-medium leading-5 text-gray-600">
              <span className="text-red-600">*</span>
              Modality
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="modality"
                name="modality"
                value={fields.modality}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
            {errors.modality && <p className="mt-2 text-sm text-red-600">{errors.modality}</p>}
          </div>
        </div>
      </div>

      <div className="pt-5">
        <hr />
      </div>

      <div className="mt-4">
        <div className="bg-gray-300 flex items-center py-2">
          <div className="w-1/4 px-4">
            <label htmlFor="date" className="block font-medium leading-5 text-gray-600">
              Date
            </label>
            <div className="relative rounded-md shadow-sm inline-flex items-center">
              <span>
                <input
                  id="date"
                  name="date"
                  value={fields.date}
                  onChange={onTextChange}
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  placeholder="02/15/2020"
                />
              </span>
              <span>
                <i className="fas fa-calendar-alt text-2xl ml-1" />
              </span>
            </div>
          </div>
          <div className="w-1/4 px-4">
            <label htmlFor="from" className="block font-medium leading-5 text-gray-600">
              From
            </label>
            <div className="relative rounded-md shadow-sm inline-flex items-center">
              <span>
                <input
                  id="from"
                  name="from"
                  value={fields.from}
                  onChange={onTextChange}
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  placeholder="10:30 AM"
                />
              </span>
              <span>
                <i className="fas fa-clock text-2xl ml-1" />
              </span>
            </div>
          </div>
          <div className="w-1/4 px-4">
            <label htmlFor="to" className="block font-medium leading-5 text-gray-600">
              To
            </label>
            <div className="relative rounded-md shadow-sm inline-flex items-center">
              <span>
                <input
                  id="to"
                  name="to"
                  value={fields.to}
                  onChange={onTextChange}
                  className="form-input block w-full sm:text-sm sm:leading-5"
                  placeholder="02:30 PM"
                />
              </span>
              <span>
                <i className="fas fa-clock text-2xl ml-1" />
              </span>
            </div>
          </div>
          <div className="w-1/4 text-right pr-2">
            <ButtonWithIcon title="Add" size="2">
              <span>
                <i className="fas fa-plus" />
              </span>
            </ButtonWithIcon>
          </div>
        </div>
        <div className="px-8 py-4 bg-gray-200">
          <table className="table-fixed text-sm rounded-tl-md w-full">
            <thead className="bold">
              <tr className="text-left" valign="top">
                <th className="pt-3 px-2 w-5/12">Date</th>
                <th className="pt-3 px-2 w-7/12">Time</th>
              </tr>
            </thead>
            <tbody className="text-xs font-thin">
              {fields.dates.map(({ date, time }, index) => (
                <tr key={date}>
                  <td
                    valign="top"
                    align="left"
                    className={`p-2 w-5/12 ${index === 0 ? '' : 'border-t-2'} border-r-2
                  `}
                  >
                    {date}
                  </td>
                  <td valign="top" className={`p-2 w-7/12 ${index === 0 ? '' : 'border-t-2'}`}>
                    {time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-5">
        <hr />
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
            <label htmlFor="language" className="block font-medium leading-5 text-gray-600">
              Language
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="language"
                name="language"
                value={fields.language}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-1">
          <div className="mt-4">
            <label htmlFor="capacity" className="block font-medium leading-5 text-gray-600">
              Capacity
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="capacity"
                name="capacity"
                value={fields.capacity}
                onChange={onTextChange}
                className="form-input block w-full sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <ButtonWithIcon title={edit ? 'Edit Course' : 'Add Course'} type="submit" size="2">
          <span className="w-6 text-xl">
            <i className={`fas ${edit ? 'fa-edit' : 'fa-plus'}`} />
          </span>
        </ButtonWithIcon>
      </div>
    </form>
  );
};

export default InstructorForm;
