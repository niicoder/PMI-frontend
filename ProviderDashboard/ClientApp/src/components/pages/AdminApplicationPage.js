import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import AdminTab from '../admin/AdminTab';

const AdminApplicationPage = () => {
  const [tab] = useState(1);

  return (
    <div>
      <AdminTab tab={tab} />
      <div className="container mx-auto mt-12 text-center">
        <div className="mt-4">
          <Link to="/admin/application/step/1">
            <ButtonWithIcon title="Start Application">
              <span className="w-6 text-xl">
                <i className="fas fa-folder-open" />
              </span>
            </ButtonWithIcon>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicationPage;
