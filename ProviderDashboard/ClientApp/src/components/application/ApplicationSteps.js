import React, { useEffect, useRef } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import useSWR from 'swr';
import _ from 'lodash';
import moment from 'moment';
import ProcessMenu from './ProcessMenu';
import Step1 from './Step1';
import StatusStep from './StatusStep';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import { isAnyAdmin } from '../../utils/persist';
import ProcessingNotes from '../pages/admin/ProcessingNotes';
import getEnvEndpoints from '../../config/endpoints';
import { fetcher, makeRequest } from '../../utils/request';
import AdminActions from '../admin/AdminActions';
import UserActions from './UserActions';
import AgreementCheckbox from '../common/AgreementCheckbox';
import constants from '../../constants';

export class ApplicationToPrint extends React.Component {
  isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  countryById(countryId) {
    const { hideNA, countries } = this.props;
    if (hideNA) return '\xA0';
    const country = countries.find((c) => c.code === countryId);
    return country && country.name;
  }

  render() {
    const { plans = [], application = {}, hideNA } = this.props;
    const { itemAFiles, itemBFiles, planId } = application;
    const dataGroupClass = this.isSafari() ? 'mb-3' : 'mb-4';
    const dataLabelClass = this.isSafari()
      ? 'block font-medium leading-5 text-gray-600 text-smaller xl:text-smaller'
      : 'block font-medium leading-5 text-gray-600 text-base xl:text-base';
    const itemAFilesStr = itemAFiles && itemAFiles.map((f) => f.fileName).join();
    const itemBFilesStr = itemBFiles && itemBFiles.map((f) => f.fileName).join();
    const plan = plans.find((p) => p.planId === planId);
    const formatter = new Intl.NumberFormat('en-US', {
      currency: 'USD',
    });
    const naForEmpty = (val) => (hideNA ? '\xA0' : val || 'N/A');

    return (
      <div className={`${this.isSafari() ? '' : 'px-4 py-4'}`}>
        <div className={`border-b-2 border-black ${this.isSafari() ? '' : 'mt-6'} font-semibold text-xl`}>
          <span className="">Demographics: Organization information</span>
        </div>
        <div className="px-6 py-6">
          <div className={dataGroupClass}>
            <div className={dataLabelClass}>Organization Name</div>
            <div>{naForEmpty(application.orgName)}</div>
          </div>
          <div className={dataGroupClass}>
            <div className={dataLabelClass}>Street Address</div>
            <div>{naForEmpty(application.addressLine1)}</div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="w-2/5">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>City</div>
                <div>{naForEmpty(application.addressCity)}</div>
              </div>
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Zip/Postal Code</div>
                <div>{naForEmpty(application.addressZip)}</div>
              </div>
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Dun & Bradstreet Number</div>
                <div>{naForEmpty(application.dunsNumber)}</div>
              </div>
            </div>
            <div className="w-2/5">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>State/Province</div>
                <div>{naForEmpty(application.addressState)}</div>
              </div>
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Country</div>
                <div>{this.countryById(application.addressCountryId)}</div>
              </div>
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Employer Identity Number</div>
                <div>{naForEmpty(application.eins)}</div>
              </div>
            </div>
          </div>

          <div className={dataGroupClass}>
            <div className={dataLabelClass}>Please provide Provider number</div>
            <div>{naForEmpty(application.previousRepid)}</div>
          </div>
          <div className={dataGroupClass}>
            <div className={dataLabelClass}>
              DBA If you conduct business under a name other than your Organization Name, please enter it here
            </div>
            <div>{naForEmpty(application.orgDBA)}</div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Number of Locations</div>
                <div>{naForEmpty(application.locations)}</div>
              </div>
            </div>
            <div className="col-span-4">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Number of Full Time Trainers</div>
                <div>{naForEmpty(application.fteTrainers)}</div>
              </div>
            </div>
            <div className="col-span-4">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Number of Contract Trainers</div>
                <div>{naForEmpty(application.contractTrainers)}</div>
              </div>
            </div>
          </div>

          <div className={`${this.isSafari() ? 'pt-2 pb-1' : 'pt-4 pb-2'} text-lg`}>
            <span className="font-bold">Primary Administrative Contact</span>
            <> - Owns the relationship with the ATP Program</>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-2">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Prefix</div>
                <div>{naForEmpty(application.adminPrefix)}</div>
              </div>
            </div>
            <div className="col-span-4">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>First Name</div>
                <div>{naForEmpty(application.adminFirstName)}</div>
              </div>
            </div>
            <div className="col-span-4">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Last Name</div>
                <div>{naForEmpty(application.adminLastName)}</div>
              </div>
            </div>
            <div className="col-span-2">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Suffix</div>
                <div>{naForEmpty(application.adminSuffix)}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 mt-3">
            <div className="col-span-3">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Phone</div>
                <div>{naForEmpty(application.adminPhone)}</div>
              </div>
            </div>
            <div className="col-span-3">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Email</div>
                <div>{naForEmpty(application.adminEmail)}</div>
              </div>
            </div>
            <div className="col-span-6">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Title</div>
                <div>{naForEmpty(application.adminTitle)}</div>
              </div>
            </div>
          </div>

          <div className={`${this.isSafari() ? 'pt-2 pb-1' : 'pt-4 pb-2'} text-lg`}>
            <span className="font-bold">Compliance Administrative Contact</span>
            <> - Owns the relationship with the ATP Program</>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-2">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Prefix</div>
                <div>{naForEmpty(application.compliancePrefix)}</div>
              </div>
            </div>
            <div className="col-span-4">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>First Name</div>
                <div>{naForEmpty(application.complianceFirstName)}</div>
              </div>
            </div>
            <div className="col-span-4">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Last Name</div>
                <div>{naForEmpty(application.complianceLastName)}</div>
              </div>
            </div>
            <div className="col-span-2">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Suffix</div>
                <div>{naForEmpty(application.complianceSuffix)}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 mt-3">
            <div className="col-span-3">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Phone</div>
                <div>{naForEmpty(application.compliancePhone)}</div>
              </div>
            </div>
            <div className="col-span-3">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Email</div>
                <div>{naForEmpty(application.complianceEmail)}</div>
              </div>
            </div>
            <div className="col-span-6">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Title</div>
                <div>{naForEmpty(application.complianceTitle)}</div>
              </div>
            </div>
          </div>

          <div className="pt-4 pb-2 text-lg print-break-before">
            <span className="font-bold">Secondary Administrative Contact</span>
            <> - Owns the relationship with the ATP Program</>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-2">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Prefix</div>
                <div>{naForEmpty(application.admin2Prefix)}</div>
              </div>
            </div>
            <div className="col-span-4">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>First Name</div>
                <div>{naForEmpty(application.admin2FirstName)}</div>
              </div>
            </div>
            <div className="col-span-4">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Last Name</div>
                <div>{naForEmpty(application.admin2LastName)}</div>
              </div>
            </div>
            <div className="col-span-2">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Suffix</div>
                <div>{naForEmpty(application.admin2Suffix)}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 mt-3">
            <div className="col-span-3">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Phone</div>
                <div>{naForEmpty(application.admin2Phone)}</div>
              </div>
            </div>
            <div className="col-span-3">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Email</div>
                <div>{naForEmpty(application.admin2Email)}</div>
              </div>
            </div>
            <div className="col-span-6">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Title</div>
                <div>{naForEmpty(application.admin2Title)}</div>
              </div>
            </div>
          </div>

          <div className="pt-4 text-lg">
            <span className="font-bold">Generic E-Mail Address</span>
            <> - Addition point of contact</>
          </div>
          <div>{naForEmpty(application.orgEmail)}</div>

          <div className="pt-4 text-lg">
            <span className="font-bold">Web Addresses for ATP Directory</span>
          </div>
          <div>{naForEmpty(application.orgWebsites)}</div>

          <div className="pt-4 text-lg">
            <span className="font-bold">PMI.org ID Number</span>
          </div>
          <div>{naForEmpty(application.courseAdminPersonId)}</div>

          <div className="pt-4 text-lg">
            <span className="font-bold">Languages</span>
          </div>
          <div>{naForEmpty(application.languages)}</div>

          <div className="mb-4 mt-4">
            <div className={dataLabelClass}>Select Yes / No to appear in the ATP directory</div>
            <div>{hideNA ? '\xA0' : application.appearInAtpdirectory ? 'Yes' : 'No'}</div>
          </div>

          <div className="mt-4 mb-4 relative">
            <input
              id="pduproviderOnly"
              name="pduproviderOnly"
              type="checkbox"
              defaultChecked={application.pduproviderOnly}
              className="text-gray-600"
            />
            <label htmlFor="pduproviderOnly" className="ml-3 font-medium leading-5 text-gray-600">
              Check if only interested in PDU provider status
            </label>
          </div>

          <div className={dataGroupClass}>
            <div className={dataLabelClass}>VAT/GST number</div>
            <div>{naForEmpty(application.vatGstNumber)}</div>
          </div>
        </div>

        <div className={`border-b-2 border-black ${this.isSafari() ? '' : 'mt-6'} font-semibold text-xl`}>
          <span className="">Documents</span>
        </div>
        <div className="px-6">
          <div className="pt-4 pb-2 text-lg">
            <span className="font-bold">Operations and Administrative Process</span>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className={dataGroupClass}>
            <div className={dataLabelClass}>Item A: Evidence of 3 Years in Business</div>
            <div>{naForEmpty(itemAFilesStr)}</div>
          </div>
          <div className={dataGroupClass}>
            <div className={dataLabelClass}>Item B: Additional Documents</div>
            <div>{naForEmpty(itemBFilesStr)}</div>
          </div>
        </div>

        <div className="border-b-2 border-black mt-6 font-semibold text-xl print-break-before">
          <span className="">Agreement & Signature</span>
        </div>
        <div className={`px-6 ${this.isSafari() ? '' : 'pb-10'}`}>
          <div className="pb-2 text-lg">
            <span className="font-bold">
              Your organization (“Organization”) must agree to all items below and must check every box. If every box is
              not checked the application will be returned.
            </span>
          </div>
          <AgreementCheckbox
            id="agreement91Checked"
            fields={application}
            setFields={null}
            disabled
            forPDF
            isSafari={this.isSafari()}
          >
            Section one of this Application and Agreement serves as the contract between your Organization and PMI.
            Acceptance of terms means your organization will comply with Program&apos;s criteria, authorized course use
            and standard training requirements, advertising policy, IP compliance and assurance of quality.
          </AgreementCheckbox>
          <AgreementCheckbox
            id="agreement92Checked"
            fields={application}
            setFields={null}
            disabled
            forPDF
            isSafari={this.isSafari()}
          >
            PMI has the sole discretion to determine Organization&apos;s participation in the Program. PMI reserves the
            right to terminate Organization from the Program indefinitely based on its inability to maintain Program
            compliance, or if its operations or offerings denigrate or may bring disrepute to the ATP Program or PMI
            brand, or for any other reason when, in PMI’s sole judgment, Organization does not meet the business
            standards set by PMI.
          </AgreementCheckbox>
          <AgreementCheckbox
            id="agreement93Checked"
            fields={application}
            setFields={null}
            disabled
            forPDF
            isSafari={this.isSafari()}
          >
            PMI reserves the right to change any terms of the program or terminate this Agreement at any time for any
            reason.
          </AgreementCheckbox>
          <AgreementCheckbox
            id="agreement94Checked"
            fields={application}
            setFields={null}
            disabled
            forPDF
            isSafari={this.isSafari()}
          >
            Organization agrees to immediately discontinue use of all PMI ATP logos, marks, materials, and statements of
            affiliation with the Program if no longer an ATP. Organization understands that Organization’s profile and
            courses in CCRS will no longer be available upon termination from the Program. Organization must cease all
            use of the PMI authorized PMP® Training Materials upon termination from the Program.
          </AgreementCheckbox>
          <AgreementCheckbox
            id="agreement95Checked"
            fields={application}
            setFields={null}
            disabled
            forPDF
            isSafari={this.isSafari()}
          >
            Organization understands there are no guarantees for increased business associated with being in the
            Program. Organization understands that ATP status, while providing unique benefits and opportunities, does
            not confer exclusive access or opportunity to the global PMI certification training or education market.
          </AgreementCheckbox>
          <AgreementCheckbox
            id="agreement96Checked"
            fields={application}
            setFields={null}
            disabled
            forPDF
            isSafari={this.isSafari()}
          >
            Organization agrees to receive PMI ATP Program newsletters, e-mail messages, faxes and regular postal
            service delivered letters and materials to your organization regarding events and product offerings.
          </AgreementCheckbox>
          <AgreementCheckbox
            id="agreement97Checked"
            fields={application}
            setFields={null}
            disabled
            forPDF
            isSafari={this.isSafari()}
          >
            Organization affirms that information that it is providing to PMI in its application package is true and
            accurate
          </AgreementCheckbox>
          <AgreementCheckbox
            id="agreement98Checked"
            fields={application}
            setFields={null}
            disabled
            forPDF
            isSafari={this.isSafari()}
          >
            Organization has reviewed the Intellectual Property Quick Reference Guide for ATPs and its course materials
            and website are in compliance. Organization understands the application will be closed and returned if found
            to be non- compliant.
          </AgreementCheckbox>

          <div className={`${this.isSafari() ? 'pb-1' : 'pt-6 pb-2'} text-lg`}>
            <span className="font-bold">
              I have read, understand and agree to the terms of the Application and Agreement and am authorized to sign
              on behalf of my organization.
            </span>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-6">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Signature</div>
                <div>{naForEmpty(application.agreementSignature)}</div>
              </div>
            </div>
            <div className="col-span-6">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Title</div>
                <div>{naForEmpty(application.agreementSignatureTitle)}</div>
              </div>
            </div>
          </div>

          <div className={`${this.isSafari() ? 'pb-1' : 'pt-4 pb-2'} text-lg`}>
            <span className="font-bold">
              (Electronic signature acceptable) Please use this format for the electronic signature: First Name Last
              Name, e.g., John Doe or Jane Doe
            </span>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-6">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Name</div>
                <div>{naForEmpty(application.agreementSignatureName)}</div>
              </div>
            </div>
            <div className="col-span-6">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Date</div>
                <div>
                  {naForEmpty(
                    application.agreementSignatureDate
                      ? moment(application.agreementSignatureDate).format('MM/DD/YYYY')
                      : null,
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={dataGroupClass}>
            <div className={dataLabelClass}>Organization Name</div>
            <div>{naForEmpty(application.agreementSignatureOrgName)}</div>
          </div>
        </div>

        <div className="border-b-2 border-black mt-6 font-semibold text-xl print-break-before">
          <span className="">Item C - Administrative & Compliance Contacts</span>
        </div>
        <div className="px-6 pb-6">
          <div className="pt-4 pb-2 text-lg">
            <span className="font-bold">Electronic signatures are needed for the Primary and Compliance contacts.</span>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-6">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Signature of primary contact</div>
                <div>{naForEmpty(application.adminContactSignature)}</div>
              </div>
            </div>
            <div className="col-span-6">
              <div className={dataGroupClass}>
                <div className={dataLabelClass}>Signature of compliance contact</div>
                <div>{naForEmpty(application.complianceContactSignature)}</div>
              </div>
            </div>
          </div>
        </div>

        {plan && (
          <div>
            <div className="border-b-2 border-black mt-6 font-semibold text-xl">
              <span className="">Selected Plan</span>
            </div>
            <div className="px-6 pb-6">
              <div className="pt-4 pb-2 text-lg">
                <span className="font-bold">
                  {plan.planName}
                  {` - $${formatter.format(plan.planFee)}`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const ApplicationSteps = ({ step, application, onSuccess, plans, myApp = false }) => {
  const history = useHistory();
  const isAdmin = isAnyAdmin();
  const path = isAdmin ? '/admin/application/:id' : '/application/:id';
  const { data: countriesList } = useSWR('/api/countries', fetcher);
  const countries = countriesList ? _.orderBy(countriesList, ['name'], ['asc']) : [];

  useEffect(() => {
    if (isAdmin) history.push(`/admin/application/${application.id}`);
  }, [isAdmin, history, application.id]);

  const deleteApp = async () => {
    const url = getEnvEndpoints().providerApiUrl;
    await makeRequest('delete', `${url}/api/Application/Delete/${application.id}`);
    history.push('/application-submit');
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="w-full lg:w-1/4 mr-5 mb-5 lg:mb-0">
        <ProcessMenu step={step} application={application} admin={isAdmin} />

        {isAdmin && (
          <div className="my-5 px-3 hidden lg:block">
            <AdminActions application={application} revalidateApp={onSuccess} />
          </div>
        )}

        {!isAdmin && (
          <div className="my-5 px-3 hidden lg:block">
            <UserActions application={application} />
          </div>
        )}

        <div className="mt-10 text-right">
          <div>
            <div className="text-left absolute w-full hidden bottom-0">
              <ApplicationToPrint ref={componentRef} application={application} countries={countries} plans={plans} />
            </div>
            <button onClick={handlePrint} className="text-xs text-red-800" type="button">
              Print Application
            </button>
          </div>
          <div>
            <a download href="ATP-Print.pdf" className="text-xs text-red-800">
              Print Blank Application
            </a>
          </div>
          {myApp && !isAdmin && application.statusId === constants.appStatus.inProgress.value && (
            <button onClick={deleteApp} className="text-xs text-red-800" type="button">
              Delete Application
            </button>
          )}
        </div>
      </div>
      <div className="w-full lg:w-3/4">
        <Switch>
          <Route path={`${path}`} exact>
            <Step1 application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
          <Route path={`${path}/status`} exact>
            <StatusStep application={application} admin={isAdmin} />
          </Route>

          <Route path={`${path}/notes`} exact>
            <ProcessingNotes application={application} onSuccess={onSuccess} isInstructorApp={false} />
          </Route>

          {/* Messages hidden for now */}
          {/* <Route path={`${path}/messages`} exact>
            <MessagesSection application={application} />
          </Route> */}

          <Route path={`${path}/step2`} exact>
            <Step2 application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
          <Route path={`${path}/step3`} exact>
            <Step3 application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
          <Route path={`${path}/step4`} exact>
            <Step4 application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
          <Route path={`${path}/step5`} exact>
            <Step5 application={application} onSuccess={onSuccess} admin={isAdmin} />
          </Route>
          <Route path={`${path}/step6`} exact>
            <Step6 application={application} onSuccess={onSuccess} admin={isAdmin} plans={plans} />
          </Route>
          <Route path={`${path}/step7`} exact>
            <Step7 application={application} onSuccess={onSuccess} />
          </Route>
        </Switch>
        {isAdmin && (
          <div className="my-5 px-3 block lg:hidden">
            <AdminActions application={application} revalidateApp={onSuccess} />
          </div>
        )}
        {!isAdmin && (
          <div className="my-5 px-3 block lg:hidden">
            <UserActions application={application} />
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationSteps;
