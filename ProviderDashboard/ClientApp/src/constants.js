import _ from 'lodash';

const constants = {
  endpoints: {
    submitApplication: '/api/providerapplication',
  },
  modalType: {
    pmpT3: 'PMP_T3',
    atp: 'ATP',
  },
  appStatus: {
    inProgress: {
      title: 'In Progress',
      value: 'IN_PROGRESS',
      statusLine: 'Request created',
      modalText: '',
    },
    needInfo: {
      title: 'Additional Info Required - Application',
      value: 'NEED_INFO',
      statusLine: 'Request requires application info',
      modalText: 'Do you want to request additional information?',
    },
    submitted: {
      title: 'Submitted',
      value: 'SUBMITTED',
      statusLine: 'Request submitted',
      modalText: '',
    },
    approved: {
      title: 'Approved for Payment',
      value: 'APPROVED',
      statusLine: 'Request approved',
      modalText: 'Do you want to approve this application for payment?',
    },
    paid: {
      title: 'Closed - Paid',
      value: 'PAID',
      statusLine: 'Finished',
      modalText: 'Do you want to mark application as paid?',
    },
    denied: {
      title: 'Closed - Denied',
      value: 'DENIED',
      statusLine: 'Request denied',
      modalText: 'Do you want to deny this application?',
    },
    underReview: {
      title: 'Under Review',
      value: 'UNDER_REVIEW',
      statusLine: 'Request is under review',
      modalText: '',
    },
    resubmitted: {
      title: 'Resubmitted',
      value: 'RESUBMITTED',
      statusLine: 'Request resubmitted',
      modalText: '',
    },
    procurementReview: {
      title: 'Procurement Review',
      value: 'PROCUREMENT_REVIEW',
      statusLine: 'Request is under procurement review',
      modalText: 'Do you want to mark application as in Procurement Review?',
    },
    needInfoProcurement: {
      title: 'Additional Info Required - Procurement',
      value: 'NEED_INFO_PROCUREMENT',
      statusLine: 'Request requires procurement info',
      modalText: 'Do you want to request additional information - procurement?',
    },
    orderProcessed: {
      title: 'Sales Order Processed',
      value: 'ORDER_PROCESSED',
      statusLine: 'Sales order processed',
      modalText: 'Do you want to mark application as Sales Order Processed?',
    },
    invoiceSent: {
      title: 'Invoice Sent',
      value: 'INVOICE_SENT',
      statusLine: 'Invoice sent',
      modalText: 'Do you want to mark application as Invoice Sent?',
    },
    withdrawn: {
      title: 'Closed - Withdrawn',
      value: 'WITHDRAWN',
      statusLine: 'Reqeust withdrawn',
      modalText: 'Do you want to withdraw your application?',
    },
    deleted: {
      title: 'Deleted',
      value: 'DELETED',
      statusLine: '',
      modalText: '',
    },
  },
  instructorAppStatus: {
    opened: {
      title: 'Opened',
      statusId: 1,
      description: 'TTT Application has been Opened, but the Instructor has not yet signed in to view the instructions',
    },
    pending: {
      title: 'Pending',
      statusId: 2,
      description:
        'The Instructor has signed in and reviewed the Application instructions but has not submitted items specified in Requirements',
    },
    submitted: {
      title: 'Submitted',
      statusId: 3,
      description:
        'The Instructor has submitted their prerequisites, but a Reviewer has not yet been assigned to review the prerequisites',
    },
    inReview: {
      title: 'In Review',
      statusId: 4,
      description: 'The Application prerequisites are currently under review by the Reviewer',
    },
    additionalInformationRequired: {
      title: 'Additional Information Required',
      statusId: 5,
      modalText: 'Request additional information',
      description:
        'The Reviewer has determined that there is not sufficient evidence that the Instructor has satisfied the prerequisites and would like additional information from the Instructor',
    },
    eligibleForTraining: {
      title: 'Eligible For Training',
      statusId: 6,
      modalText: 'Mark the application as Eligible for Training',
      description:
        "The Instructor's prerequisites have been determined to be satisfactory and they can now choose their Training modality and select a class",
    },
    invoiced: {
      title: 'Invoiced',
      statusId: 7,
      modalText: 'Mark the application as Invoiced',
      description:
        'The ATP has been invoiced for the cost of the training class but the invoice has not yet been marked paid.',
    },
    awaitingTraining: {
      title: 'Awaiting Training',
      statusId: 8,
      modalText: 'Application has been paid, mark as Awaiting Training',
      description: "The Instructor's Training class has been scheduled and the invoice has been paid.",
    },
    inTraining: {
      title: 'In Training',
      statusId: 9,
      description: 'The Instructor has begun their Training but has not yet completed it.',
    },
    trainingComplete: {
      title: 'Training Complete',
      statusId: 10,
      description:
        "The Instructor's training is complete, but Exam results are not yet available. They may or may not have taken the Exam yet, but this information has not yet been provided.",
    },
    closedPassed: {
      title: 'Closed - Passed',
      statusId: 11,
      description:
        "The Instructor has completed training and passed the Exam. The Application outcomes are to be processed and any Badges/Qualifications specified in the Application's Outcomes are to be issued.",
    },
    closedFailed: {
      title: 'Closed - Failed',
      statusId: 12,
      description:
        "The Instructor has completed training but failed the Exam. They are to be locked out of Training for a period specified in the Application's Lockout Rules",
    },
    closedWithdrawn: {
      title: 'Closed - Withdrawn',
      statusId: 13,
      modalText: 'Mark application as Withdrawn',
      description:
        'The Application has been withdrawn by Instructor or Provider request. The Application is closed but the Instructor is not Locked out from future Applications.',
    },
    closedDenied: {
      title: 'Closed - Denied',
      statusId: 14,
      modalText: 'Mark application as Denied',
      description:
        'The Application has been Denied by the reviewer. Business to determine lockout rules for Denied Applications',
    },
    registrationInitiated: {
      title: 'Registration Initiated',
      statusId: 15,
      description: 'The Instructor has registered for an event',
    },
  },
  adminTabs: {
    dashboard: 'dashboard',
    pmp: 'pmp',
    instructors: 'instructors',
    applications: 'applications',
    providers: 'providers',
    courses: 'courses',
    messages: 'messages',
  },
  requirements: {
    documentUploaded: 'PMPExamPrepInstructor.Document.Uploaded',
    agreementChecked: 'PMPExamPrepInstructor.Agreement.Check',
    appSubmitted: 'PMPExamPrepInstructor.Application.Submit',
    trainingSelect: 'PMPExamPrepInstructor.Training.Select',
    trainingAttend: 'PMPExamPrepInstructor.Training.Attend',
    trainingComplete: 'PMPExamPrepInstructor.Training.Complete',
  },
};

export default {
  ...constants,
};

export const statusLine = (status) => {
  const statusInfo = _.find(constants.appStatus, { value: status });
  return statusInfo.statusLine;
};

export const getApplicationTypeById = (id) => {
  if (id === 2) {
    return 'PMP Train The Trainer Application';
  }
  return 'Other';
};

export const instructorStatusById = (statusId) => {
  const statusInfo = _.find(constants.instructorAppStatus, {
    statusId,
  });
  return statusInfo;
};

export const getRequirementByKey = (app, key) => {
  if (app) {
    const req = app.requirements?.find((req) => req.key === key);
    return req?.satisfied;
  }
  return undefined;
};

export const getApplicationName = (appName) => {
  if (appName) {
    const name = appName === 'PMPExamPrepInstructor' ? 'PMP Train The Trainer Application' : appName;

    return name;
  }
  return undefined;
};
