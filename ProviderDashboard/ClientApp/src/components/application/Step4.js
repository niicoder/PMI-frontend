import React, { useState } from 'react';
import { useHistory } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import AgreementCheckbox from '../common/AgreementCheckbox';
import InputGroup from '../common/InputGroup';
import { makeRequest } from '../../utils/request';
import { lengthValidator } from '../../utils/validate';

const validators = {
  agreement91Checked: (val) => (val ? null : 'You need to agree to this point to proceed'),
  agreement92Checked: (val) => (val ? null : 'You need to agree to this point to proceed'),
  agreement93Checked: (val) => (val ? null : 'You need to agree to this point to proceed'),
  agreement94Checked: (val) => (val ? null : 'You need to agree to this point to proceed'),
  agreement95Checked: (val) => (val ? null : 'You need to agree to this point to proceed'),
  agreement96Checked: (val) => (val ? null : 'You need to agree to this point to proceed'),
  agreement97Checked: (val) => (val ? null : 'You need to agree to this point to proceed'),
  agreement98Checked: (val) => (val ? null : 'You need to agree to this point to proceed'),
  agreementSignature: (val) => (val ? null : "Can't be blank"),
  agreementSignatureTitle: (val) => (val ? null : "Can't be blank"),
  agreementSignatureName: (val) => (val ? null : "Can't be blank"),
  agreementSignatureOrgName: (val) => (val ? null : "Can't be blank"),
};

const maxLengths = {
  agreementSignature: 255,
  agreementSignatureTitle: 255,
  agreementSignatureName: 255,
  agreementSignatureOrgName: 255,
};

const Step4 = ({ application, onSuccess, admin }) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    agreement91Checked: application.agreement91Checked || false,
    agreement92Checked: application.agreement92Checked || false,
    agreement93Checked: application.agreement93Checked || false,
    agreement95Checked: application.agreement94Checked || false,
    agreement96Checked: application.agreement95Checked || false,
    agreement97Checked: application.agreement96Checked || false,
    agreement98Checked: application.agreement97Checked || false,
    agreement94Checked: application.agreement98Checked || false,
    agreementSignature: application.agreementSignature || '',
    agreementSignatureTitle: application.agreementSignatureTitle || '',
    agreementSignatureName: application.agreementSignatureName || '',
    agreementSignatureOrgName: application.agreementSignatureOrgName || '',
  });
  const path = admin ? `/admin/application/${application.id}/step5` : `/application/${application.id}/step5`;

  const now = application.agreementSignatureDate
    ? moment(application.agreementSignatureDate).format('MM/DD/YYYY')
    : moment().format('MM/DD/YYYY');

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
    _.forEach(fields, (val, key) => {
      const result = lengthValidator(val, maxLengths[key]);
      if (result) err[key] = result;
    });
    _.forEach(validators, (fn, key) => {
      const result = fn(fields[key]);
      if (result) err[key] = result;
    });
    return { isValid: Object.keys(err).length === 0, err };
  };

  // eslint-disable-next-line consistent-return
  const next = async () => {
    const { isValid, err } = validate();
    if (!isValid) return setErrors(err);

    setLoading(true);
    await makeRequest('post', `/api/providerapplication/AgreeAndSign/${application.id}`, fields);
    setLoading(false);
    onSuccess();
    history.push(path);
  };

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Agreement & Signature</div>

        {application.canEdit && (
          <div className="text-right" style={{ width: '350px' }}>
            <ButtonWithIcon isLoading={loading} onClick={next} title="Agree, Sign & Move Next">
              <span className="w-6 text-xl">
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          </div>
        )}
      </div>

      <div className="px-8 py-4">
        <form onSubmit={next}>
          <p className="font-bold">
            Your organization (“Organization”) must agree to all items below and must check every box. If every box is
            not checked the application will be returned.
          </p>

          <AgreementCheckbox
            id="agreement91Checked"
            fields={fields}
            setFields={setFields}
            disabled={!application.canEdit}
          >
            This Application and Agreement serves as the contract between your Organization and PMI. Acceptance of terms
            means your organization will comply with all terms and conditions of this document, including without
            limitation the ATP Program&apos;s criteria, authorized course use and standard training requirements,
            advertising policy, IP compliance and assurance of quality.
          </AgreementCheckbox>
          {errors.agreement91Checked && <p className="mt-2 text-sm text-red-600">{errors.agreement91Checked}</p>}

          <AgreementCheckbox
            id="agreement92Checked"
            fields={fields}
            setFields={setFields}
            disabled={!application.canEdit}
          >
            PMI has the sole discretion to determine Organization&apos;s participation in the Program. PMI reserves the
            right not to admit Organization to the Program or to terminate Organization from the Program indefinitely
            for any reason, including without limitation Organization’s inability to meet Program requirements, maintain
            Program compliance, or if its operations or offerings denigrate or may bring disrepute to the ATP Program or
            PMI brand, or for any other reason when, in PMI’s sole judgment, Organization does not meet the business
            standards set by PMI.
          </AgreementCheckbox>
          {errors.agreement92Checked && <p className="mt-2 text-sm text-red-600">{errors.agreement92Checked}</p>}

          <AgreementCheckbox
            id="agreement93Checked"
            fields={fields}
            setFields={setFields}
            disabled={!application.canEdit}
          >
            PMI reserves the right to change any terms of the Program or terminate this Agreement at any time for any
            reason.
          </AgreementCheckbox>
          {errors.agreement93Checked && <p className="mt-2 text-sm text-red-600">{errors.agreement93Checked}</p>}

          <AgreementCheckbox
            id="agreement94Checked"
            fields={fields}
            setFields={setFields}
            disabled={!application.canEdit}
          >
            Organization agrees to immediately discontinue use of all PMI ATP logos, marks, materials, and statements of
            affiliation with the Program if no longer an ATP. Organization understands that Organization’s profile and
            courses in CCRS will no longer be available upon termination from the Program. Organization must cease all
            use of the PMI authorized Certification Exam Prep Training Materials upon termination from the Program.
          </AgreementCheckbox>
          {errors.agreement94Checked && <p className="mt-2 text-sm text-red-600">{errors.agreement94Checked}</p>}

          <AgreementCheckbox
            id="agreement95Checked"
            fields={fields}
            setFields={setFields}
            disabled={!application.canEdit}
          >
            Organization understands there are no guarantees for increased business associated with being in the
            Program. Organization acknowledges that PMI does not warrant the quality, effectiveness, or fitness for any
            particular purpose of any aspect of the Program or any content provided to Organization by PMI under the
            Program. Organization understands that ATP status, while providing unique benefits and opportunities, does
            not confer exclusive access or opportunity to the global PMI certification training or education market.
          </AgreementCheckbox>
          {errors.agreement95Checked && <p className="mt-2 text-sm text-red-600">{errors.agreement95Checked}</p>}

          <AgreementCheckbox
            id="agreement96Checked"
            fields={fields}
            setFields={setFields}
            disabled={!application.canEdit}
          >
            Organization agrees to receive PMI ATP Program newsletters, e-mail messages, faxes and regular postal
            service delivered letters and materials to your organization regarding events and product offerings.
          </AgreementCheckbox>
          {errors.agreement96Checked && <p className="mt-2 text-sm text-red-600">{errors.agreement96Checked}</p>}

          <AgreementCheckbox
            id="agreement97Checked"
            fields={fields}
            setFields={setFields}
            disabled={!application.canEdit}
          >
            Organization affirms that information that it is providing to PMI in its application package is true and
            accurate. Organization has reviewed the Intellectual Property Quick Reference Guide for ATPs and its course
            materials and website are in compliance.
            <span className="inline-block mt-2">
              Organization understands the application will be closed and returned if found to be non- compliant.
            </span>
          </AgreementCheckbox>
          {errors.agreement97Checked && <p className="mt-2 text-sm text-red-600">{errors.agreement97Checked}</p>}

          <AgreementCheckbox
            id="agreement98Checked"
            fields={fields}
            setFields={setFields}
            disabled={!application.canEdit}
          >
            <span className="inline-block">
              Organization acknowledges that it may obtain access to confidential or proprietary information of PMI as a
              result of its participation in the Program (“Confidential Information”). Confidential Information includes
              without limitation information concerning PMI’s business operations, finances, strategic plans, employees,
              customers, membership, pricing, technology, trade secrets, know-how, products or services in development,
              and other information held in confidence by PMI, whether the information is designated as confidential, or
              even if not so designated, is of a type such that a reasonable person would understand the non-public
              nature of the information. Organization agrees that it will not disclose or use Confidential Information
              in any way, except as expressly permitted by or required to achieve the purposes of this Agreement.
              Organization will take all reasonable precautions to protect the confidentiality of PMI’s Confidential
              Information, and shall take at least the same precautions that Organization takes to preserve the
              confidentiality of its own Confidential Information. Confidential Information will not include information
              that: (a) is or becomes known to Organization without restriction from a source not having an obligation
              of confidentiality to PMI; (b) becomes publicly known or otherwise ceases to be secret or confidential
              other than through a breach of this Agreement by Organization; or (c) is independently developed by
              Organization without use of the Confidential Information. Organization further acknowledges that any such
              disclosure in contravention of Organization’s duty to maintain confidentiality constitutes a material
              breach of this Agreement for which contract remedies may not be adequate and shall entitle PMI to any and
              all appropriate remedies.
            </span>
            <span className="mt-2 inline-block">
              Organization represents and warrants that it has implemented and maintains appropriate administrative,
              physical and technical safeguards to protect the confidentiality, integrity and security of Confidential
              Information, including personally identifiable information and other highly sensitive data. To the extent
              that Organization will receive, use, process or handle personally identifiable information, which shall
              include information about an individual that can be used to identify the individual, or that is sensitive
              with respect to the individual, such as social security numbers, and financial information (“Personal
              Information”) in fulfilling the terms of this Agreement, Organization will ensure that Organization’s use
              of such Personal Information is in accordance with all applicable laws and will ensure that the Personal
              Information is appropriately secured in all forms and used only for the purposes for which such Personal
              Information was received pursuant to this Agreement or otherwise within the Program.
            </span>
            <span className="mt-2 inline-block">
              Organization understands and agrees that PMI assumes no liability whatsoever to Organization, its
              employees or subcontractors for any damage, cost, loss or liability resulting or arising from the
              fulfillment of PMI’s obligations under this Agreement, nor with respect to the performance of any PMI
              vendor or third party providing any services related to the Program. Organization shall indemnify, defend
              and hold PMI shall harmless from and against any claim, expense, loss, injury, or damage to persons or
              property caused by any act or omission of Organization, Organization’s employees, agents or
              subcontractors, or otherwise caused by or arising from Organizations performance within the Program. These
              limitations are independent of all other provisions of this Agreement and shall apply notwithstanding the
              failure of any other clause or remedy provided herein.
            </span>
            <span className="mt-2 inline-block">
              Organization agrees that PMI shall not be deemed to be in default of any provision of this Agreement, nor
              to be liable for any delay, failure in performance or interruption of Program services, resulting from
              acts of God, embargoes, quarantines, pandemic, acts of civil or military authority, civil disturbance,
              insurrection, war, severe weather, natural or other catastrophes, or any other cause beyond its reasonable
              control (“force majeure”). If a force majeure event affects the operations of either PMI or Organization,
              the affected Party shall exercise reasonable efforts to resume performance or remedy such failure to
              perform as soon as practicable following cessation of the force majeure event. A Party whose performance
              will or may be impaired by a force majeure event shall give written notice as soon as possible to the
              other Party of the force majeure event and its impact.
            </span>
            <span className="mt-2 inline-block">
              Organization agrees that this Agreement supersedes all prior agreements, oral or in writing, between PMI
              and Organization with respect to the ATP program, and the predecessor Registered Education Provider (REP)
              program, and contains the entire agreement of PMI and Organization with respect to the Program.
            </span>
          </AgreementCheckbox>
          {errors.agreement98Checked && <p className="mt-2 text-sm text-red-600">{errors.agreement98Checked}</p>}

          <p className="font-bold mt-5">
            I have read, understand and agree to the terms of the Application and Agreement and am authorized to sign on
            behalf of my organization.
          </p>

          <div className="flex mt-3">
            <div className="w-1/2 pr-3">
              <InputGroup
                onChange={onTextChange}
                value={fields.agreementSignature}
                isRequired
                label="Signature"
                name="agreementSignature"
                error={errors.agreementSignature}
                disabled={!application.canEdit}
              />
            </div>
            <div className="w-1/2 pl-3">
              <InputGroup
                onChange={onTextChange}
                value={fields.agreementSignatureTitle}
                isRequired
                label="Title"
                name="agreementSignatureTitle"
                error={errors.agreementSignatureTitle}
                disabled={!application.canEdit}
              />
            </div>
          </div>

          <p className="font-bold mt-5">
            (Electronic signature acceptable) Please use this format for the electronic signature: First Name Last Name,
            e.g., John Doe or Jane Doe
          </p>

          <div className="flex mt-3">
            <div className="w-1/2 pr-3">
              <InputGroup
                onChange={onTextChange}
                value={fields.agreementSignatureName}
                isRequired
                label="Name"
                name="agreementSignatureName"
                error={errors.agreementSignatureName}
                disabled={!application.canEdit}
              />
            </div>
            <div className="w-1/2 pl-3">
              <InputGroup
                onChange={onTextChange}
                value={now}
                isRequired
                disabled
                label="Date"
                name="agreementSignatureDate"
              />
            </div>
          </div>
          <div className="mt-3">
            <InputGroup
              onChange={onTextChange}
              value={fields.agreementSignatureOrgName}
              isRequired
              label="Organization Name"
              name="agreementSignatureOrgName"
              error={errors.agreementSignatureOrgName}
              disabled={!application.canEdit}
            />
          </div>
        </form>
      </div>

      <div className="flex justify-center py-5">
        {application.canEdit && (
          <ButtonWithIcon isLoading={loading} onClick={next} title="Agree, Sign & Move Next">
            <span className="w-6 text-xl">
              <i className="fas fa-edit" />
            </span>
          </ButtonWithIcon>
        )}
      </div>
    </div>
  );
};

export default Step4;
