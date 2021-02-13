import React from 'react';
import ApplicationsTable from '../../admin/ApplicationsTable';

const AdminDashboard = () => {
  return (
    <div>
      <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
        <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
          <div className="font-semibold text-lg font-agrandir py-3 pr-4">Applications</div>
        </div>
        <div className="py-5 px-3">
          <ApplicationsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
