import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import isEmail from "validator/lib/isEmail";
import useSWR from "swr";
import Select from "react-select";
import cn from "classnames";
import _ from "lodash";
import ButtonWithIcon from "../buttons/ButtonWithIcon";
import { fetcher, makeRequest } from "../../utils/request";
import constants from "../../constants";
import InputGroup from "../common/InputGroup";
import Tags from "../common/Tags";
import { lengthValidator } from "../../utils/validate";
import AssignProviderNumberModal from "../admin/AssignProviderNumberModal";

const isValidPhone = (num) => {
  return /^[+]?[\s./0-9]*[(]?[0-9]{1,5}[)]?[-\s./0-9]*$/g.test(num);
};

const validators = {
  orgName: (val) => (val ? null : "This field is required"),
  addressLine1: (val) => (val ? null : "This field is required"),
  addressCity: (val) => (val ? null : "This field is required"),
  addressZip: (val) => (val ? null : "This field is required"),
  addressState: (val) => (val ? null : "This field is required"),
  addressCountryId: (val) => (val ? null : "This field is required"),
  eins: (val) => (val ? null : "This field is required"),
  locations: (val) => (val ? null : "This field is required"),
  adminFirstName: (val) => (val ? null : "This field is required"),
  adminLastName: (val) => (val ? null : "This field is required"),
  adminEmail: (val) => (isEmail(val) ? null : "Invalid email address"),
  adminTitle: (val) => (val ? null : "This field is required"),
  adminPhone: (val) => (isValidPhone(val) ? null : "Invalid phone number"),
  compliancePhone: (val) =>
    !val || isValidPhone(val) ? null : "Invalid phone number",
  admin2Phone: (val) =>
    !val || isValidPhone(val) ? null : "Invalid phone number",
};

const maxLengths = {
  orgName: 255,
  addressLine1: 255,
  addressCity: 255,
  addressState: 255,
  addressZip: 50,
  addressCountryId: 25,
  dunsNumber: 300,
  eins: 25,
  adminPrefix: 150,
  adminSuffix: 150,
  adminFirstName: 150,
  adminLastName: 150,
  adminTitle: 150,
  adminPhone: 50,
  adminEmail: 255,
  compliancePrefix: 150,
  complianceSuffix: 150,
  complianceFirstName: 150,
  complianceLastName: 150,
  complianceTitle: 150,
  compliancePhone: 50,
  complianceEmail: 255,
  admin2Prefix: 150,
  admin2Suffix: 150,
  admin2FirstName: 150,
  admin2LastName: 150,
  admin2Title: 150,
  admin2Phone: 50,
  admin2Email: 255,
  languages: 255,
  orgEmail: 255,
  orgDBA: 255,
  vatGstNumber: 50,
};

const demographicValidators = {
  orgEmail: (val) => (val ? null : "This field is required"),
  orgWebsites: (val) => (val ? null : "This field is required"),
};

const ApplicationForm = ({
  application = {},
  submitText = "Submit Request",
  fullForm = false,
  onSuccess,
  submitForm,
  showPrint = false,
  admin,
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    orgName: application.orgName || "",
    addressLine1: application.addressLine1 || "",
    addressCity: application.addressCity || "",
    addressState: application.addressState || "",
    addressZip: application.addressZip || "",
    addressCountryId: application.addressCountryId || "",
    dunsNumber: application.dunsNumber || "",
    eins: application.eins || "",
    locations: application.locations || 0,
    fteTrainers: application.fteTrainers || 0,
    contractTrainers: application.contractTrainers || 0,
    adminPrefix: application.adminPrefix || "",
    adminSuffix: application.adminSuffix || "",
    adminFirstName: application.adminFirstName || "",
    adminLastName: application.adminLastName || "",
    adminTitle: application.adminTitle || "",
    adminPhone: application.adminPhone || "",
    adminEmail: application.adminEmail || "",
    compliancePrefix: application.compliancePrefix || "",
    complianceSuffix: application.complianceSuffix || "",
    complianceFirstName: application.complianceFirstName || "",
    complianceLastName: application.complianceLastName || "",
    complianceTitle: application.complianceTitle || "",
    compliancePhone: application.compliancePhone || "",
    complianceEmail: application.complianceEmail || "",
    admin2Prefix: application.admin2Prefix || "",
    admin2Suffix: application.admin2Suffix || "",
    admin2FirstName: application.admin2FirstName || "",
    admin2LastName: application.admin2LastName || "",
    admin2Title: application.admin2Title || "",
    admin2Phone: application.admin2Phone || "",
    admin2Email: application.admin2Email || "",
    orgWebsites: application.orgWebsites || "",
    languages: application.languages || "",
    courseAdminPersonId: application.courseAdminPersonId || "",
    orgEmail: application.orgEmail || "",
    previousRepid: application.previousRepid || "",
    orgDBA: application.orgDBA || "",
    appearInAtpdirectory:
      application.appearInAtpdirectory === undefined
        ? true
        : application.appearInAtpdirectory,
    pduproviderOnly: application.pduproviderOnly,
    vatGstNumber: application.vatGstNumber || "",
    statusId: application.statusId || "",
  });
  const history = useHistory();

  const { data: countriesList } = useSWR("/api/countries", fetcher);
  const countries = countriesList
    ? _.orderBy(countriesList, ["name"], ["asc"])
    : [];

  const { data: languagesList } = useSWR("/api/languages", fetcher);
  const languageOptions = languagesList
    ? _.orderBy(
        languagesList,
        ["sortOrder"],
        ["asc"]
      ).map(({ description }) => ({ label: description, value: description }))
    : [];

  const [languageArray, setLanguageArray] = useState([]);
  const [webAdressesArray, setWebAddressesArray] = useState([]);

  const [selectedApp, setSelectedApp] = useState(false);

  useEffect(() => {
    const lanValues = languageArray.map((item) => item.value);
    const lanString = lanValues.join(",");
    setFields({ ...fields, languages: lanString });
  }, [languageArray]);

  useEffect(() => {
    const webValues = webAdressesArray.map((item) => item.value);
    const webString = webValues.join(",");
    setFields({ ...fields, orgWebsites: webString });
  }, [webAdressesArray]);

  useEffect(() => {
    let langArray = application.languages
      ? application.languages.split(",")
      : [];
    let webArray = application.orgWebsites
      ? application.orgWebsites.split(",")
      : [];
    langArray = langArray.map((val) => ({
      label: val,
      value: val,
    }));
    webArray = webArray.map((val) => ({
      label: val,
      value: val,
    }));
    setLanguageArray(langArray);
    setWebAddressesArray(webArray);
  }, [application.languages, languagesList, application.orgWebsites]);

  const revalidateField = (key, val) => {
    const result = validators[key] && validators[key](val);
    setErrors({ ...errors, [key]: result });
  };

  const onTextChange = (e) => {
    if (errors[e.target.name]) {
      revalidateField(e.target.name, e.target.value);
    }
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onNumberChange = (e) => {
    if (Number.isNaN(_.toNumber(e.target.value))) {
      return;
    }

    if (
      errors.trainers &&
      e.target.name === "fteTrainers" &&
      !validateTrainers(e.target.value, fields.contractTrainers)
    )
      setErrors({ ...errors, trainers: false });
    if (
      errors.trainers &&
      e.target.name === "contractTrainers" &&
      !validateTrainers(fields.fteTrainers, e.target.value)
    )
      setErrors({ ...errors, trainers: false });

    if (errors[e.target.name]) {
      revalidateField(e.target.name, e.target.value);
    }

    setFields({ ...fields, [e.target.name]: Number(e.target.value) });
  };

  const validateTrainers = (fteTrainers, contractTrainers) => {
    return fteTrainers <= 0 && contractTrainers <= 0;
  };

  const validate = useCallback(() => {
    const err = {};

    if (validateTrainers(fields.fteTrainers, fields.contractTrainers)) {
      err.trainers = "You need to have at least one trainer";
    }

    _.forEach(fields, (val, key) => {
      const result = lengthValidator(val, maxLengths[key]);
      if (result) err[key] = result;
    });

    _.forEach(validators, (fn, key) => {
      const result = fn(fields[key]);
      if (result) err[key] = result;
    });

    if (fullForm) {
      _.forEach(demographicValidators, (fn, key) => {
        const result = fn(fields[key]);
        if (result) err[key] = result;
      });
    }

    return { isValid: Object.keys(err).length === 0, err };
  }, [fields, fullForm]);

  const submit = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      const { isValid, err } = validate();
      if (!isValid) return setErrors(err);

      try {
        setLoading(true);
        if (fullForm) {
          await makeRequest(
            "post",
            `/api/providerapplication/${application.id}`,
            {
              ...fields,
              courseAdminPersonId: fields.courseAdminPersonId || null,
            }
          );
        } else {
          await makeRequest("post", constants.endpoints.submitApplication, {
            ...fields,
            courseAdminPersonId: fields.courseAdminPersonId || null,
          });
        }
        setLoading(false);
        onSuccess();
      } catch (err) {
        setErrors(err);
        setLoading(false);
      }
    },
    [application.id, fields, fullForm, onSuccess, validate]
  );

  const handleShowAssignProviderNumberModal = (application, e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    setSelectedApp(application);
  };

  useEffect(() => {
    if (submitForm && !loading) {
      submit();
    }
  }, [submitForm, submit, loading]);

  return (
    <div>
      {selectedApp && (
        <AssignProviderNumberModal
          onSuccess={async () => {
            await onSuccess();
            history.push(`/admin/application/${application.id}/step2`);
          }}
          application={selectedApp}
          onClose={() => setSelectedApp(false)}
        />
      )}
      <form id="application-form" onSubmit={submit} className="mt-10">
        <div className="mt-1 relative rounded-md shadow-sm">
          <InputGroup
            error={errors.orgName}
            name="orgName"
            value={fields.orgName}
            onChange={onTextChange}
            disabled={fullForm && !application.canEdit}
            isRequired={true}
            label="Organization Name"
          />
        </div>

        <div className="mt-4">
          <InputGroup
            error={errors.addressLine1}
            name="addressLine1"
            value={fields.addressLine1}
            onChange={onTextChange}
            disabled={fullForm && !application.canEdit}
            isRequired={true}
            label="Street Address"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-2/5">
            <div className="mt-4">
              <InputGroup
                error={errors.addressCity}
                name="addressCity"
                value={fields.addressCity}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                isRequired={true}
                label="City"
              />
            </div>

            <div className="mt-4">
              <InputGroup
                error={errors.addressZip}
                name="addressZip"
                value={fields.addressZip}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                isRequired={true}
                label="Zip/Postal Code"
              />
            </div>

            <div className="mt-4">
              <InputGroup
                error={errors.dunsNumber}
                name="dunsNumber"
                value={fields.dunsNumber}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                label="Dun & Bradstreet Number"
              />
            </div>
          </div>

          <div className="md:w-2/5">
            <div className="mt-4">
              <InputGroup
                error={errors.addressState}
                name="addressState"
                value={fields.addressState}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                isRequired={true}
                label="State/Province"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="country"
                className="block font-medium leading-5 text-gray-600"
              >
                <span className="text-red-600">*</span>Country
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  name="addressCountryId"
                  id="addressCountryId"
                  disabled={fullForm && !application.canEdit}
                  value={fields.addressCountryId}
                  onChange={onTextChange}
                  className={cn(
                    "form-select block w-full sm:text-sm sm:leading-5",
                    {
                      "bg-gray-200 text-gray-600":
                        fullForm && !application.canEdit,
                    }
                  )}
                >
                  <option value="">Select Country</option>
                  {countries.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.addressCountryId && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.addressCountryId}
                </p>
              )}
            </div>

            <div className="mt-4">
              <InputGroup
                error={errors.eins}
                name="eins"
                value={fields.eins}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                isRequired={true}
                label="Employer Identity Number"
                tooltip="EIN, or other location appropriate tax and/or business registration number"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <div className="w-4/5">
            <InputGroup
              mask={true}
              error={errors.previousRepid}
              name="previousRepid"
              value={fields.previousRepid}
              onChange={onTextChange}
              disabled={fullForm && !application.canEdit}
              label="Please provide Provider number"
            />
          </div>
          {admin && fields.statusId != constants.appStatus.inProgress.value && (
            <div>
              <button
                onMouseDown={(e) =>
                  handleShowAssignProviderNumberModal(application, e)
                }
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                Assign
              </button>
            </div>
          )}
        </div>

        <div className="mt-4">
          <InputGroup
            error={errors.orgDBA}
            name="orgDBA"
            value={fields.orgDBA}
            onChange={onTextChange}
            disabled={fullForm && !application.canEdit}
            label="DBA If you conduct business under a name other than your Organization Name, please enter it here"
          />
        </div>

        <div className="py-5">
          <hr />
        </div>

        <div className="bg-gray-100 border-2 border-gray-300 rounded px-10 py-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <InputGroup
                type="number"
                error={errors.locations}
                name="locations"
                value={fields.locations}
                onChange={onNumberChange}
                disabled={fullForm && !application.canEdit}
                isRequired={true}
                label="Number of Locations"
                labelSize="xs"
              />
            </div>

            <div className="md:col-span-4">
              <InputGroup
                type="number"
                error={errors.trainers}
                name="fteTrainers"
                value={fields.fteTrainers}
                onChange={onNumberChange}
                disabled={fullForm && !application.canEdit}
                isRequired={true}
                label="Number of Full Time Trainers"
                labelSize="xs"
              />
            </div>

            <div className="md:col-span-4">
              <InputGroup
                type="number"
                error={errors.contractTrainers}
                name="contractTrainers"
                value={fields.contractTrainers}
                onChange={onNumberChange}
                disabled={fullForm && !application.canEdit}
                isRequired={true}
                label="Number of Contract Trainers"
                labelSize="xs"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-100 border-2 border-gray-300 rounded px-10 py-5 mt-5">
          <div className="pt-4 pb-6 text-lg">
            <span className="font-bold">Primary Administrative Contact</span> -
            Owns the relationship with the ATP Program
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-2">
              <InputGroup
                placeholder="Prefix"
                error={errors.adminPrefix}
                value={fields.adminPrefix}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                name="adminPrefix"
                label="Prefix"
              />
            </div>
            <div className="md:col-span-4">
              <InputGroup
                error={errors.adminFirstName}
                placeholder="First Name"
                value={fields.adminFirstName}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                name="adminFirstName"
                isRequired={true}
                label="First Name"
              />
            </div>
            <div className="md:col-span-4">
              <InputGroup
                error={errors.adminLastName}
                name="adminLastName"
                value={fields.adminLastName}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                placeholder="Last Name"
                isRequired={true}
                label="Last Name"
              />
            </div>
            <div className="md:col-span-2">
              <InputGroup
                error={errors.adminSuffix}
                placeholder="Suffix"
                value={fields.adminSuffix}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                name="adminSuffix"
                label="Suffix"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-3">
            <div className="md:col-span-3">
              <InputGroup
                error={errors.adminPhone}
                name="adminPhone"
                value={fields.adminPhone}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                placeholder="Phone"
                isRequired={true}
                label="Phone"
              />
            </div>
            <div className="md:col-span-3">
              <InputGroup
                error={errors.adminEmail}
                name="adminEmail"
                value={fields.adminEmail}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                placeholder="Email"
                isRequired={true}
                label="Email"
              />
            </div>
            <div className="md:col-span-6">
              <InputGroup
                error={errors.adminTitle}
                name="adminTitle"
                value={fields.adminTitle}
                onChange={onTextChange}
                disabled={fullForm && !application.canEdit}
                placeholder="Title"
                isRequired={true}
                label="Title"
              />
            </div>
          </div>
        </div>

        {fullForm && (
          <div>
            <div className="bg-gray-100 border-2 border-gray-300 rounded px-10 py-5 mt-5">
              <div className="pt-4 pb-6 text-lg">
                <span className="font-bold">
                  Compliance Administrative Contact
                </span>{" "}
                - Owns the relationship with the ATP Program
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-2">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.compliancePrefix}
                      name="compliancePrefix"
                      value={fields.compliancePrefix}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Prefix"
                      label="Prefix"
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.complianceFirstName}
                      name="complianceFirstName"
                      value={fields.complianceFirstName}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="First Name"
                      label="First Name"
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.complianceLastName}
                      name="complianceLastName"
                      value={fields.complianceLastName}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Last Name"
                      label="Last Name"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.complianceSuffix}
                      name="complianceSuffix"
                      value={fields.complianceSuffix}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Suffix"
                      label="Suffix"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-3">
                <div className="md:col-span-3">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.compliancePhone}
                      name="compliancePhone"
                      value={fields.compliancePhone}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Phone"
                      label="Phone"
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.complianceEmail}
                      name="complianceEmail"
                      value={fields.complianceEmail}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                </div>
                <div className="md:col-span-6">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.complianceTitle}
                      name="complianceTitle"
                      value={fields.complianceTitle}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Title"
                      label="Title"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 border-2 border-gray-300 rounded px-10 py-5 mt-5">
              <div className="pt-4 pb-6 text-lg">
                <span className="font-bold">
                  Secondary Administrative Contact
                </span>{" "}
                - Owns the relationship with the ATP Program
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-2">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.admin2Prefix}
                      name="admin2Prefix"
                      value={fields.admin2Prefix}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Prefix"
                      label="Prefix"
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.admin2FirstName}
                      name="admin2FirstName"
                      value={fields.admin2FirstName}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="First Name"
                      label="First Name"
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.admin2LastName}
                      name="admin2LastName"
                      value={fields.admin2LastName}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Last Name"
                      label="Last Name"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.admin2Suffix}
                      name="admin2Suffix"
                      value={fields.admin2Suffix}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Suffix"
                      label="Suffix"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-3">
                <div className="md:col-span-3">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.admin2Phone}
                      name="admin2Phone"
                      value={fields.admin2Phone}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Phone"
                      label="Phone"
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.admin2Email}
                      name="admin2Email"
                      value={fields.admin2Email}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                </div>
                <div className="md:col-span-6">
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputGroup
                      error={errors.admin2Title}
                      name="admin2Title"
                      value={fields.admin2Title}
                      onChange={onTextChange}
                      disabled={!application.canEdit}
                      placeholder="Title"
                      label="Title"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="py-5">
              <hr />
            </div>

            <div className="pt-4 pb-3 text-lg">
              <span className="text-red-600">*</span>
              <span className="font-bold">Generic E-Mail Address</span> -
              Addition point of contact
            </div>

            <div className="">
              <div className="relative rounded-md shadow-sm">
                <InputGroup
                  error={errors.orgEmail}
                  name="orgEmail"
                  value={fields.orgEmail}
                  onChange={onTextChange}
                  disabled={!application.canEdit}
                />
              </div>
            </div>

            <div className="pt-6 pb-1 text-lg">
              <span className="text-red-600">*</span>
              <span className="font-bold">Web Addresses for ATP Directory</span>
            </div>
            <p>
              Please list all the domain names (web addresses) registered for
              your organization including those that forward or mask to the main
              domain. <i>Type a web address and press tab or enter key.</i>
            </p>

            <div className="">
              <div className="relative rounded-md shadow-sm">
                <Tags
                  id="orgWebsites"
                  name="orgWebsites"
                  placeholder="Type a web address and press tab or enter key"
                  values={webAdressesArray}
                  disabled={!application.canEdit}
                  onChange={(value) => setWebAddressesArray(value || [])}
                />
              </div>
              {errors.orgWebsites && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.orgWebsites}
                </p>
              )}
            </div>

            <div className="pt-6 pb-1 text-lg">
              <span className="font-bold">PMI.org ID Number</span>
            </div>
            <p>
              Provide the PMI.org ID number for the person who will administer
              courses in the Authorized Training Partner directory (Provider
              Portal). Go to PMI.org and click the register button in the top
              right hand screen and follow instructions to register and receive
              your PMI.org ID number if you do not have one.
            </p>

            <div className="">
              <div className="relative rounded-md shadow-sm">
                <InputGroup
                  error={errors.courseAdminPersonId}
                  name="courseAdminPersonId"
                  value={fields.courseAdminPersonId}
                  onChange={onNumberChange}
                  disabled={!application.canEdit}
                />
              </div>
            </div>

            <div className="pt-6 pb-1 text-lg">
              <span className="font-bold">Languages</span>
            </div>
            <p>
              List all languages in which your organization delivers learning
              activities or products. <i>Select languages.</i>
            </p>

            <div className="">
              <div className="relative rounded-md shadow-sm">
                <Select
                  value={languageArray}
                  isMulti
                  id="languages"
                  name="languages"
                  options={languageOptions}
                  isDisabled={!application.canEdit}
                  onChange={(value) => setLanguageArray(value || [])}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select languages"
                />
              </div>
              {errors.languages && (
                <p className="mt-2 text-sm text-red-600">{errors.languages}</p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="appearInAtpdirectory"
                className="block font-medium leading-5 text-gray-600"
              >
                Select Yes / No to appear in the ATP directory
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  id="appearInAtpdirectory"
                  name="appearInAtpdirectory"
                  disabled={!application.canEdit}
                  value={fields.appearInAtpdirectory ? "yes" : "no"}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      appearInAtpdirectory: e.target.value === "yes",
                    })
                  }
                  className={cn(
                    "form-select block w-full sm:text-sm sm:leading-5",
                    {
                      "bg-gray-200 text-gray-600": !application.canEdit,
                    }
                  )}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              {errors.appearInAtpdirectory && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.appearInAtpdirectory}
                </p>
              )}
            </div>

            <div className="mt-4">
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="pduproviderOnly"
                  name="pduproviderOnly"
                  type="checkbox"
                  disabled={!application.canEdit}
                  checked={fields.pduproviderOnly}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      pduproviderOnly: !fields.pduproviderOnly,
                    })
                  }
                  className={cn("form-checkbox", {
                    "bg-gray-200 text-gray-600": !application.canEdit,
                  })}
                />

                <label
                  htmlFor="pduproviderOnly"
                  className="ml-3 font-medium leading-5 text-gray-600"
                >
                  Check if only interested in PDU provider status
                </label>
              </div>
              {errors.pduproviderOnly && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.pduproviderOnly}
                </p>
              )}
            </div>

            <div className="mt-4">
              <div className="mt-1 relative rounded-md shadow-sm">
                <InputGroup
                  error={errors.vatGstNumber}
                  name="vatGstNumber"
                  value={fields.vatGstNumber}
                  onChange={onTextChange}
                  disabled={!application.canEdit}
                  label="VAT/GST number"
                />
              </div>
            </div>
          </div>
        )}

        {showPrint && (
          <a
            download
            href="ATP-Print.pdf"
            className="text-xs text-red-800 float-right"
          >
            Print Blank Application
          </a>
        )}

        <div className="mt-10 text-center">
          {(!fullForm || application.canEdit) && (
            <ButtonWithIcon
              isLoading={loading}
              title={submitText}
              type="submit"
            >
              <span className="w-6 text-xl">
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
