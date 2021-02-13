import React from 'react';
import InstructorForm from '../forms/InstructorForm';

const AddInstructor = ({ edit = false, onClose, onSubmit }) => {
  return (
    <div className="font-agrandir w-screen">
      <div className="md-modal md-effect md-show border-2 border-white rounded-t-sm" id="instructor-modal">
        <div className="inline-flex bg-primary text-white w-full items-center">
          <div className="flex-none text-2xl p-2">
            <i className="fas fa-user" />
          </div>
          <h2 className="flex-1 text-2xl p-2">
            {edit ? 'Edit ' : 'Add '}
            Instructor Information
          </h2>
          <div className="flex-none p-2">
            <button className="text-3xl" onClick={onClose} type="button">
              <i className="far fa-times-circle" />
            </button>
          </div>
        </div>
        <div className="bg-gray-100 px-8 py-4">
          <InstructorForm edit={edit} onSubmit={onSubmit} />
        </div>
      </div>
      <div className="md-overlay" />
    </div>
  );
};

export default AddInstructor;
