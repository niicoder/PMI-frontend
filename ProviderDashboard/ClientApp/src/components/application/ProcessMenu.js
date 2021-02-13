import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import Circle from '../common/Circle';
import Clock from '../common/Clock';
import constants, { statusLine } from '../../constants';

const ProcessMenu = ({ step = 'step1', application, admin }) => {
  const path = admin ? `/admin/application/${application.id}` : `/application/${application.id}`;

  const status = statusLine(application.statusId);

  return (
    <div className="rounded bg-primary-light text-white overflow-hidden">
      <ul>
        <li>
          <Link
            to={`${path}/status`}
            className={cn(
              'flex items-center block hover:bg-primary focus:outline-none focus:bg-primary transition duration-150 ease-in-out border-white w-full',
              {
                'bg-primary': step === 'status',
              },
            )}
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex items-center">
                <div className="flex-shrink-0">
                  <Clock />
                </div>
                <div className="min-w-0 px-4">
                  <div>
                    <div className="text-sm leading-5 font-medium">
                      <div className="font-lg font-bold font-agrandir">Application Status</div>
                      <div className="text-sm font-thin">{status}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={`${path}/notes`}
            className={cn(
              'flex items-center block hover:bg-primary focus:outline-none focus:bg-primary transition duration-150 ease-in-out border-t border-white w-full',
              {
                'bg-primary': step === 'notes',
              },
            )}
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex items-center">
                <div className="flex-shrink-0">
                  <svg width="26" height="29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.107 17.727H26V3.102c0-.737-.621-1.33-1.393-1.33H1.393C.62 1.773 0 2.366 0 3.103v22.16c0 .736.621 1.329 1.393 1.329h15.321v-7.534c0-.731.627-1.33 1.393-1.33zm7.487 3.047l-5.688 5.43c-.26.248-.615.387-.986.387h-.349V19.5H26v.338c0 .349-.145.687-.406.936z"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <div className="min-w-0 px-4">
                  <div>
                    <div className="text-sm leading-5 font-medium">
                      <div className="font-lg font-bold font-agrandir">Processing Notes</div>
                      <div className="text-sm font-thin">Application processing notes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
        {/* Messages hidden for now. */}
        {/* <li">
          <Link
            to={`${path}/messages`}
            className={cn(
              "flex items-center block hover:bg-primary focus:outline-none focus:bg-primary
              transition duration-150 ease-in-out border-t border-white w-full",
              {
                "bg-primary": step === "messages",
              }
            )}
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    width="26"
                    height="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.564 0H2.437A2.437 2.437 0 000 2.437v14.626a2.437 2.437 0 002.437 2.438h21.126A2.437
                      2.437 0 0026 17.063V2.437A2.438 2.438 0 0023.564 0zm0 2.437V4.51c-1.14.93-2.954 2.37-6.835
                      5.408-.855.673-2.549 2.29-3.728
                      2.27-1.178.018-2.874-1.598-3.728-2.27-3.88-3.039-5.697-4.481-6.835-5.408V2.437h21.126zM2.437
                      17.063V7.638c1.164.93 2.815 2.228 5.33 4.197 1.11.874 3.053 2.803 5.233 2.792 2.17.012
                      4.088-1.89 5.234-2.792 2.513-1.97 4.165-3.27 5.33-4.197v9.425H2.437z"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <div className="min-w-0 px-4">
                  <div>
                    <div className="text-sm leading-5 font-medium">
                      <div className="font-lg font-bold font-agrandir">
                        Messages
                      </div>
                      <div className="text-sm font-thin">
                        Communication with Applicant
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li> */}

        <li>
          <Link
            to={`${path}`}
            className={cn(
              'flex items-center block hover:bg-primary focus:outline-none focus:bg-primary transition duration-150 ease-in-out border-t border-white w-full',
              {
                'bg-primary': step === '',
              },
            )}
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex items-center">
                <div className="flex-shrink-0">
                  <Circle isChecked={application.isCriterionComplete} />
                </div>
                <div className="min-w-0 px-4">
                  <div>
                    <div className="text-sm leading-5 font-medium">
                      <div className="font-lg font-bold font-agrandir">Step 01</div>
                      <div className="text-sm font-thin">Criterion</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={`${path}/step2`}
            className={cn(
              'flex items-center block hover:bg-primary focus:outline-none focus:bg-primary transition duration-150 ease-in-out border-t border-white w-full',
              {
                'bg-primary': step === 'step2',
              },
            )}
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex items-center">
                <div className="flex-shrink-0">
                  <Circle isChecked={application.isDemograhicsComplete} />
                </div>
                <div className="min-w-0 px-4">
                  <div>
                    <div className="text-sm leading-5 font-medium">
                      <div className="font-lg font-bold font-agrandir">Step 02</div>
                      <div className="text-sm font-thin">Demographics (Organization Information)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={`${path}/step3`}
            className={cn(
              'flex items-center block hover:bg-primary focus:outline-none focus:bg-primary transition duration-150 ease-in-out border-t border-white w-full',
              {
                'bg-primary': step === 'step3',
              },
            )}
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex items-center">
                <div className="flex-shrink-0">
                  <Circle isChecked={application.isDocumentationUploadComplete} />
                </div>
                <div className="min-w-0 px-4">
                  <div>
                    <div className="text-sm leading-5 font-medium">
                      <div className="font-lg font-bold font-agrandir">Step 03</div>
                      <div className="text-sm font-thin">Documents</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={`${path}/step4`}
            className={cn(
              'flex items-center block hover:bg-primary focus:outline-none focus:bg-primary transition duration-150 ease-in-out border-t border-white w-full',
              {
                'bg-primary': step === 'step4',
              },
            )}
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex items-center">
                <div className="flex-shrink-0">
                  <Circle isChecked={application.isAgreementAndSignatureComplete} />
                </div>
                <div className="min-w-0 px-4">
                  <div>
                    <div className="text-sm leading-5 font-medium">
                      <div className="font-lg font-bold font-agrandir">Step 04</div>
                      <div className="text-sm font-thin">Agreement & Signature</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={`${path}/step5`}
            className={cn(
              'flex items-center block hover:bg-primary focus:outline-none focus:bg-primary transition duration-150 ease-in-out border-t border-white w-full',
              {
                'bg-primary': step === 'step5',
              },
            )}
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex items-center">
                <div className="flex-shrink-0">
                  <Circle isChecked={application.isComplianceSignatureComplete} />
                </div>
                <div className="min-w-0 px-4">
                  <div>
                    <div className="text-sm leading-5 font-medium">
                      <div className="font-lg font-bold font-agrandir">Step 05</div>
                      <div className="text-sm font-thin">Contact Signatures</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>

        <li>
          <Link
            to={`${path}/step6`}
            className={cn(
              'flex items-center block hover:bg-primary focus:outline-none focus:bg-primary transition duration-150 ease-in-out border-t border-white w-full',
              {
                'bg-primary': step === 'step6',
                'border-b': !admin,
              },
            )}
          >
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex items-center">
                <div className="flex-shrink-0">
                  <Circle isChecked={application.isPlanSelectionComplete} />
                </div>
                <div className="min-w-0 px-4">
                  <div>
                    <div className="text-sm leading-5 font-medium">
                      <div className="font-lg font-bold font-agrandir">Step 06</div>
                      <div className="text-sm font-thin">Select Plan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>

        {!admin && (
          <li>
            <Link
              to={`${path}/step7`}
              className={cn(
                'flex items-center block hover:bg-primary focus:outline-none focus:bg-primary transition duration-150 ease-in-out border-t border-white w-full',
                {
                  'bg-primary': step === 'step7',
                },
              )}
            >
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex items-center">
                  <div className="flex-shrink-0">
                    <Circle
                      isChecked={
                        application.statusId !== constants.appStatus.needInfoProcurement.value &&
                        application.statusId !== constants.appStatus.needInfo.value &&
                        application.statusId !== constants.appStatus.inProgress.value
                      }
                    />
                  </div>
                  <div className="min-w-0 px-4">
                    <div>
                      <div className="text-sm leading-5 font-medium">
                        <div className="font-lg font-bold font-agrandir">Step 07</div>
                        <div className="text-sm font-thin">Submit Application</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProcessMenu;
