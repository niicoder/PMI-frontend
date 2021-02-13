import React, { useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import HomeInfoCard from '../common/HomeInfoCard';

const HomePage = () => {
  const [tab, setTab] = useState(1);

  return (
    <div>
      <div className="container mx-auto mt-5 px-3">
        <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-20 xl:mt-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full overflow-hidden">
                  <img className="w-full" src="images/landing-image.jpg" alt="landing" />
                </div>
              </div>
            </div>
            <div className="sm:text-center md:max-w-xl md:mx-auto lg:col-span-6 lg:text-left">
              <h2 className="mt-1 text-3xl text-center tracking-tight leading-10 font-bold text-gray-900 sm:leading-snug">
                Apply now to become an Authorized Trainer Partner
              </h2>
              <p className="mt-3 text-center text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Become an Authorized Trainer Partner and gain access to a host of participant benefits. Built for
                professional training organizations to offer PMI-authorized training content
              </p>
              <div className="mt-10 text-center">
                <Link to="/application-submit">
                  <ButtonWithIcon title="Apply Now">
                    <span className="w-6 text-xl">
                      <i className="fas fa-edit" />
                    </span>
                  </ButtonWithIcon>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="sm:hidden mt-10">
            <select value={tab} onChange={(e) => setTab(Number(e.target.value))} className="form-select block w-full">
              <option value={1}>Program Benefits</option>
              {/* TODO - Hidden until License text is updated
                  <option value={2}>License Grant</option>
              */}
            </select>
          </div>
          <div className="hidden sm:block mt-20">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px justify-center">
                {/* TODO - Change div back to button when License tab gets reactivated */}
                <div
                  onClick={() => setTab(1)}
                  className={cn(
                    'group w-1/3 rounded-tl-lg flex flex-col items-center leading-snug py-4 px-1 font-medium leading-5',
                    {
                      'bg-primary text-white border-b-2 border-primary': tab === 1,
                      'bg-gray-100 text-gray-500 hover:text-gray-700 hover:border-gray-300': tab !== 1,
                    },
                  )}
                >
                  <i className="text-2xl far fa-lightbulb" />
                  <span className="text-lg">Program Benefits</span>
                  <span className="text-xs">Summary of Program Benefits</span>
                </div>
                {/* TODO - Hidden until License text is updated
                <button
                  onClick={() => setTab(2)}
                  className={cn(
                    "group w-1/3 rounded-tl-lg flex flex-col items-center leading-snug py-4 px-1 font-medium leading-5",
                    {
                      "bg-primary text-white border-b-2 border-primary ":
                        tab === 2,
                      "bg-gray-100 text-gray-500 hover:text-gray-700 hover:border-gray-300":
                        tab !== 2,
                    }
                  )}
                >
                  <i className="text-2xl fas fa-tasks" />
                  <span className="text-lg">License Grant</span>
                  <span className="text-xs">Summary of License Grant</span>
                </button> */}
              </nav>
            </div>
          </div>
        </div>

        {tab === 1 && (
          <div className="mt-5">
            <h2 className="mt-1 text-3xl text-center tracking-tight leading-10 font-bold text-gray-900 sm:leading-snug">
              Summary of Program benefits
            </h2>
            <p className="mt-3 text-gray-600 font-bold text-sm text-center">
              A full description of the Program can be found at&nbsp;
              <a
                className="text-primary hover:text-primary-light cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pmi.org/-/media/pmi/documents/public/pdf/microsites/rep-and-atp-resource-center/authorized-training-partner-handbook.pdf?v=bd07fb35-a387-4f1b-abd5-f6d539a51e0b"
              >
                Program Handbook
              </a>
              . Below is a summary of Program benefits available to Program participants. PMI reserves the right to
              change Program components and opportunities at any time within its sole discretion.
            </p>

            <div className="mt-10">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <HomeInfoCard title="PMI-authorized training content">
                  Use of exclusive, PMI-authorized training content, aligned to evolving PMP® examination subject areas,
                  for PMP® examination preparation.
                </HomeInfoCard>
                <HomeInfoCard title="Train-the-trainer instruction">
                  Train-the-trainer instruction to prepare your instructors to provide high quality examination
                  preparation instruction with up to date training methodologies on relevant topics.
                </HomeInfoCard>
                <HomeInfoCard title="Exclusive use of digital platform">
                  Exclusive use of a digital platform (“Platform”) to deliver your courses to students across the globe.
                </HomeInfoCard>
                <HomeInfoCard title="Authorized Training Partner">
                  Permission to publicize your organization as a PMI® (ATP) solely in conjunction with PMI authorized
                  examination preparation courses and courses listed in PMI&apos;s Continuing Certification Requirements
                  System (CCRS)**. Permission does not extend PMI recognition to other business activities unrelated to
                  the PMI® Authorized PMP® examination preparation course or other courses covered under the Program
                  designed to meet credential holders’ certification maintenance requirements (“professional development
                  units” or “PDUs”).
                </HomeInfoCard>
                <HomeInfoCard title="Pre-approved for PDUs">
                  Courses listed in CCRS can be claimed for pre-approved PDUs by credential holders, as well as for
                  contact hours for future credential applicants.
                </HomeInfoCard>
                <HomeInfoCard title="Batch PDU Submission">
                  Ability to submit batch PDU claims to PMI for students completing your courses. This allows you to
                  submit PDU claims conveniently on behalf of your students, benefiting you and your students.
                </HomeInfoCard>
                <HomeInfoCard title="PMI Authorized Training Partner logo">
                  License to use the official PMI® Authorized Training Partner Seal (PMI ATP Seal) The PMI ATP Seal must
                  be used in compliance with Program policies explained in the Authorized Training Partner Guide.
                </HomeInfoCard>
                <HomeInfoCard title="Publish Courses in CCRS">
                  Your company profile and courses can be viewed by students searching the unique web page on pmi.org
                  where ATP information is made available to prospective students and CCRS Directories*
                </HomeInfoCard>
                <HomeInfoCard title="Authorized Trainer Partner Community">
                  <p className="pb-2">
                    ATP Monthly pdate e-newsletter sent to primary and compliance contacts. Contains timely information
                    regarding the Program and other PMI products and services.
                  </p>
                  <p className="pb-2">Access to an exclusive ATP Events.</p>
                  <p className="pb-2">Program updates and network with others in the ATP Community.</p>
                </HomeInfoCard>
                <HomeInfoCard title="Access to global organizations">
                  <p className="pb-2">
                    Access to Request for Group Training Proposals (RFP) from global organizations.
                  </p>
                  <p>
                    This benefit provides opportunities to submit proposals to organizations with specific PM training.
                  </p>
                </HomeInfoCard>
              </div>
            </div>
          </div>
        )}

        {tab === 2 && (
          <div className="home-page-provider-reqs mt-5">
            <p>
              ATPs receive a license (“PMI Content License”) to use certain PMI materials as follows: Upon acceptance
              into the Program, and your execution of this Application and Agreement, you are granted a limited,
              nontransferable, non-exclusive, revocable, worldwide right and License to access, use, and distribute,
              solely for your internal certification examination preparation training (“Certification Exam Prep
              Training”), the PMI® Authorized Training Partner Certification Exam Prep Training Materials
              (“Certification Exam Prep Training Materials”) as listed below in it’s original form, with the original
              content, and via the approved channels provided by PMI (“Certification Exam Prep Training Material
              License”).
            </p>
            <p>The material included in PMI’s PMP Exam Prep Instructor Led course:</p>
            <ul className="list-disc ml-3 list-inside my-2">
              <li>
                A student manual and corresponding instructor edition - 35 hours/5 days of training in duration
                (approximately 400 pages in length)
              </li>
              <li>
                Real world activities designed to provide students with practical exposure to the professional practice
                of project management.
              </li>
              <li>
                Any separate supporting files (templates, worksheets, etc.) required to perform student activities.
              </li>
              <li>Editable instructor slides for use in presenting key concepts and leading activities.</li>
              <li>Online student checklists that ensure proper coverage of all key concepts.</li>
              <li>
                Spotlight videos/media to be utilized by instructors as part of the training event and by students as
                after-class learning.
              </li>
              <li>Skills assessment to check comprehension of key concepts.</li>
              <li>Mastery Builders for in-class review or after-class exam preparation</li>
              <li>End of course survey to be completed by student.</li>
              <li>
                Premier ATPs receive approximately 200 cloned PMP exam questions to use to create practice exercises for
                students
              </li>
            </ul>
            <p className="mt-2">
              You are also granted a limited, nontransferable, non-exclusive, revocable, worldwide right and License to
              access, use and reproduce unlimited figures and excerpts from the most current editions of PMI standards
              listed in the following link&nbsp;
              <a
                className="text-primary hover:text-primary-light"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pmi.org/pmbok-guide-standards/foundational"
              >
                &quot;PMI Standards&quot;
              </a>
              . (“Standards Licensed Content”) for any training other than Certification Exam Prep Training noted above
              (however, ATP may not reproduce or distribute any PMI standard in its entirety), and the PMI® Authorized
              Training Partner Seal (collectively, “PMI Licensed Materials”), solely and exclusively to provide
              instruction, training and education directly related to the PMI® Authorized Training Partner Program and
              your role as an ATP (“
              <a
                className="text-primary hover:text-primary-light"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pmi.org/-/media/pmi/documents/public/pdf/microsites/rep-and-atp-resource-center/pmi-atp-licensed-content.pdf?v=62adfe8b-8ae8-47a5-9848-dbd9c7502efe"
              >
                PMI Content License
              </a>
              ”). The Certification Exam Prep Training Materials License does not permit any adaptation, re-sale,
              assignment or other transfer of the Certification Exam Prep Training Materials to third parties. Any such
              re-sale, assignment or other transfer of content using PMI IP is strictly prohibited. The license granted
              above is effective during the term of your membership in the Program and will terminate immediately and
              automatically when your membership in the Program terminates or is cancelled, as more fully described in
              this application and related documents. PMI reserves the right to remove ATPs immediately from the program
              for non-compliance with the License.
            </p>
            <p>
              ATPs may add their own, wholly owned, original content to supplement the PMI Licensed Materials as part of
              the overall content provided to students under the PMI Content License (“Supplemental Materials”). ATPs
              may not sell or reuse such Supplemental Materials outside of the ATP Program. PMI reserves the right in
              its sole discretion to request review of any and all such Supplemental Materials, and to approve, reject
              or require modification for use of such content to the extent that it uses PMI Licensed Materials in a
              manner inconsistent with PMI requirements and guidelines.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
