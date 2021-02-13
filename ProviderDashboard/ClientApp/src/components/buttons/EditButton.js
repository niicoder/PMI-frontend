import React from 'react';

const EditButton = ({ onClick = () => ({}) }) => {
  return (
    <div className="text-blue-500 absolute top-0 right-0 mt-2 mr-2 cursor-pointer" onClick={onClick}>
      <span className="text-xl">
        <i className="far fa-edit" />
      </span>
    </div>
  );
};

export default EditButton;
