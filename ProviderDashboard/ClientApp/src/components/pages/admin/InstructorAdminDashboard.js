import React, { useState } from 'react';
import InstructorApplicationTable from '../../admin/InstructorApplicationTable';
import VoucherTable from '../../admin/VoucherTable';
import CheckEventAttendanceModal from '../../admin/CheckEventAttendanceModal';
import ProcessAssessmentResultsModal from '../../admin/ProcessAssessmentResultsModal';

const TrainerDashboard = () => {
  const [forceRefreshTable, setForceRefreshTable] = useState(false);
  const [showCheckEvents, setShowCheckEvents] = useState(false);
  const [showProcessAssessmentResults, setShowProcessAssessmentResults] = useState(false);
  return (
    <div>
      {showCheckEvents && (
        <CheckEventAttendanceModal
          onClose={() => {
            setForceRefreshTable((val) => !val);
            setShowCheckEvents(false);
          }}
        />
      )}
      {showProcessAssessmentResults && (
        <ProcessAssessmentResultsModal
          onClose={() => {
            setForceRefreshTable((val) => !val);
            setShowProcessAssessmentResults(false);
          }}
        />
      )}
      <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
        <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
          <div className="font-semibold text-lg font-agrandir py-3 pr-4">PMP TTT Applications</div>
          <div>
            <button
              className="flex-shrink-0 bg-primary-light border-primary-light text-sm border-4 text-white py-1 px-2 rounded  mr-2"
              type="button"
              onClick={() => setShowCheckEvents(true)}
            >
              Check Event Attendance
            </button>
            <button
              className="flex-shrink-0 bg-primary-light border-primary-light text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={() => setShowProcessAssessmentResults(true)}
            >
              Process Assessment Results
            </button>
          </div>
        </div>
        <div className="py-5 px-3">
          <InstructorApplicationTable forceRefreshTable={forceRefreshTable} />
        </div>
      </div>

      <VoucherTable />
    </div>
  );
};

export default TrainerDashboard;
