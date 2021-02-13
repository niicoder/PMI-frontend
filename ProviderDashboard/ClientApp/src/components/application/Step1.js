import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import CircleCheck from '../common/CircleCheck';
import { makeRequest } from '../../utils/request';

const Step1 = ({ application, onSuccess, admin }) => {
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const path = admin ? `/admin/application/${application.id}/step2` : `/application/${application.id}/step2`;

  // eslint-disable-next-line consistent-return
  const next = async (nextTab) => {
    if (tab < 9) {
      if (application.canEdit) {
        setLoading(true);
        await makeRequest('post', `/api/providerapplication/${application.id}/${tab}`);
        setLoading(false);
        window.scrollTo({ top: 100, behavior: 'smooth' });
        onSuccess();
      }

      if (tab === 8) return history.push(path);
      setTab(nextTab || tab + 1);
    }
  };

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">
          General Organizational Requirements and Responsibilities
        </div>

        {application.canEdit && (
          <div className="text-right" style={{ width: '350px' }}>
            <ButtonWithIcon isLoading={loading} onClick={() => next()} title="Agree & Move Next">
              <span className="w-6 text-xl">
                <i className="fas fa-edit" />
              </span>
            </ButtonWithIcon>
          </div>
        )}
      </div>

      <div className="flex justify-between bg-gray-100 overflow-x-auto">
        <CircleCheck isChecked={application.criterion01Checked} number={1} setTab={next} tab={tab} />

        <CircleCheck isChecked={application.criterion02Checked} number={2} setTab={next} tab={tab} />

        <CircleCheck isChecked={application.criterion03Checked} number={3} setTab={next} tab={tab} />

        <CircleCheck isChecked={application.criterion04Checked} number={4} setTab={next} tab={tab} />

        <CircleCheck isChecked={application.criterion05Checked} number={5} setTab={next} tab={tab} />
        <CircleCheck isChecked={application.criterion06Checked} number={6} setTab={next} tab={tab} />
        <CircleCheck isChecked={application.criterion07Checked} number={7} setTab={next} tab={tab} />
        <CircleCheck isChecked={application.criterion08Checked} number={8} setTab={next} tab={tab} />
      </div>

      <div className="px-8 py-4">
        {tab === 1 && (
          <div>
            <p className="text-sm mt-2">General Requirements</p>
            <p className="text-sm mt-2">
              Participants in the PMI® Authorized Training Partner Program (“PMI ATP Program” or “Program”)) shall
              acquaint themselves with all Program requirements and shall have the requisite experience, resources,
              facilities, and administrative support to effectively participate in the Program, including the ability to
              comply consistently with all ATP responsibilities and procedures. ATP status is awarded only to high
              quality professional training and development providers who meet all Program requirements, and are aligned
              to PMI core values. PMI reserves the right in its sole discretion to deny or revoke admission to the
              Program to any applicant who does not meet Program requirements, for non-compliance with Program rules and
              criteria, for actions that could constitute a violation of applicable law or PMI’s Code of Ethics and
              Professional Conduct, or for any other reason that, in PMI’s judgment, could adversely affect the
              credibility or integrity of the Program.
            </p>

            <p className="text-sm mt-2">
              Each ATP organization acknowledges and agrees that it is subject to the following:
            </p>

            <p className="text-sm mt-2">
              a. An ATP must have been actively engaged in a professional development training business for no less than
              three (3) years as of the date of application. Organizations that have more than three (3) years of
              business activities dedicated to examination preparation training are preferred.
            </p>

            <p className="text-sm mt-2">
              b. ATPs must demonstrate financial stability meeting PMI requirements. PMI will perform an evaluation of
              the ATP organization at the time of application that will include, without limitation, evaluation of the
              organization’s Dun & Bradstreet report. Applicants to the Program are required to provide the
              organizations’ EIN and Duns numbers, as well as other business information, as requested.
            </p>

            <p className="text-sm mt-2">
              c. ATPs will be and remain in compliance with all applicable laws and requirements while in the Program.
            </p>

            <p className="text-sm mt-2">
              d. ATP organizations must have a division, department, unit or role that is responsible for administration
              of the required ATP reports, documentation, and communications. Information about these key roles and
              their responsibilities can be found in the&nbsp;
              <a
                className="text-primary hover:text-primary-light cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pmi.org/-/media/pmi/documents/public/pdf/microsites/rep-and-atp-resource-center/authorized-training-partner-handbook.pdf?v=bd07fb35-a387-4f1b-abd5-f6d539a51e0b"
              >
                PMI Authorized Training Partner Handbook
              </a>
              .
            </p>

            <p className="text-sm mt-2">
              e. ATPs will have a clearly worded mission statement and strategic objectives.
            </p>

            <p className="text-sm mt-2">
              f. ATPs will provide participants in their training programs with appropriate documentation (such as
              certificates of completion, letters of attendance, etc.) upon successful completion of each course.
            </p>

            <p className="text-sm mt-2">
              g. ATPs will ensure that attendance/participation records are kept for a minimum of two (2) calendar years
              after completion.
            </p>

            <p className="text-sm mt-2">
              h. ATPs will refrain from any form of misrepresentation or dissemination of misleading or inaccurate
              information with respect to PMI, any PMI examination, the ATP organization itself, the ATP organization’s
              employees, and any course or program provided to the public. In particular, an ATP will not state that
              enrollees in its courses are “guaranteed” to pass any examination.
            </p>

            <p className="text-sm mt-2">
              i. ATPs will refrain from any manner of discrimination or harassment of enrollees and applicants for
              training with respect to the training programs they provide, including, but not limited to, discrimination
              or harassment on the basis of race or ethnic origin, gender, nationality, disability, veteran status,
              religion or sexual orientation.
            </p>

            <p className="text-sm mt-2">
              j. Unless prohibited by legal restrictions that apply to certain governmental entities outside of
              Pennsylvania, the ATP agrees that this agreement shall be governed by the laws of the Commonwealth of
              Pennsylvania, USA, and shall be the exclusive jurisdiction for any disputes arising out of this
              Application and Agreement and/or the ATP’s participation in the Program. ATPs that are government entities
              may receive a waiver of this requirement upon submission of written request for waiver with accompanying
              explanation and proof of the need for waiver.
            </p>

            <p className="text-sm mt-2">
              k. ATP agrees that it will: (a) use only the authorized certification examination preparation training
              materials ( “Certification Exam Prep Training Materials”) provided by PMI to prepare candidates for the
              applicable certification examination, (b) require ATP’s instructors to participate in required
              train-the-trainer instruction to learn how to prepare candidates for the certification examination, if
              required (c) utilize the Program digital platform as instructed, (d) pay per candidate fees set by PMI,
              (e) ensure its instructors meet all requirements as outlined in this application and (f) meet any other
              specific requirements noted for each certification.
            </p>
            <p className="text-sm mt-2">
              l. ATPs may create materials that can be used to supplement the licensed Certification Exam Prep Training
              Materials (“Supplemental Materials”). This may include student handouts, case studies, white papers,
              books, or other materials to provide enrollees with further useful information in preparing for a
              certification examination. Supplemental Materials may not be marketed, or advertised as an alternative to
              taking a Certification Exam Prep Training course. The Supplemental Materials created by the ATP may be
              used alongside the Certification Exam Prep Training course but may not be used as a course substitute or
              offered or sold separately. PMI may request review of Supplemental Materials in its discretion.
              Supplemental Materials must be submitted to PMI for review upon PMI’s written request and PMI may approve,
              reject or require modifications for use of such Supplemental Materials at any time. For more information
              on all these requirements, see&nbsp;
              <a
                className="text-primary hover:text-primary-light cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pmi.org/-/media/pmi/documents/public/pdf/microsites/rep-and-atp-resource-center/authorized-training-partner-handbook.pdf?v=bd07fb35-a387-4f1b-abd5-f6d539a51e0b"
              >
                PMI Authorized Training Partner Handbook
              </a>
              .
            </p>
            <p className="text-sm mt-2">
              m. Any subsidiary, related or affiliated entity, or any contractor or sub-contractor of ATP that has not
              been awarded ATP status separately by PMI may not identify itself as an ATP. ATP must take reasonable
              steps to prevent any and all such entities from representing themselves as ATPs, including without
              limitation prohibiting such entities from using the PMI® Authorized Training Partner Seal (“PMI ATP Seal”)
              and reporting any violations of this requirement to PMI. Additionally, ATP must ensure that any of its
              subsidiary, parent, or otherwise affiliated entities, or any of its contractors or sub-contractors, that
              has not been awarded ATP status separately, will not use the same or substantially similar branding as ATP
              and will not use any ATP logo or other indicia of ATP status which could cause confusion as to the ATP
              status of the non-ATP entity.
            </p>
          </div>
        )}
        {tab === 2 && (
          <div>
            <p className="text-sm mt-2">
              n. ATP’s may develop and use their own materials for project management-related courses that are offered
              for professional development and to meet certification maintenance requirements for Professional
              Development Units (PDUs) as described below.
            </p>
            <p className="text-sm mt-2 ml-3">
              1. PDUs must be of high quality and aligned to the PMI Talent Triangle®. Appropriate knowledge experts
              must develop and/or review all course content prior to delivery to the general public.
            </p>
            <p className="text-sm mt-2 ml-3">
              2. PDUs must align with the most recent edition of
              <span className="italic"> A Guide to the Project Management Body of Knowledge (PMBOK® Guide) </span>
              and other appropriate PMI global standards and guides. The content of courses or educational products
              offered for PDU credit must be substantially consistent with the concepts and terminology found in the
              current edition of the
              <span className="italic"> PMBOK® Guide </span>
              and aligned to at least one section of the PMI Project Management theories or practices different from
              those described in the
              <span className="italic"> PMBOK® Guide </span>
              are permissible in course materials but shall be clearly identified as such to course participants.
            </p>
            <p className="text-sm mt-2 ml-3">
              3. Subject matter experts, instructional designers and developers for PDU courses must have appropriate
              qualifications to develop effectively all courses, including the requisite formal education, experience,
              PMI credentials or other recognized credentials appropriate to the subject matter.
            </p>
            <p className="text-sm mt-2 ml-3">
              4. PDU courses must be designed around clearly identified, measurable learning outcomes. Material should
              be clearly worded and arranged in a logical manner that facilitates achievement of the learning
              objectives.
            </p>
            <p className="text-sm mt-2 ml-3">
              5. All course materials shall have, and instructors must follow, an outline/syllabus that is organized in
              a clear and logical manner.
            </p>
            <p className="text-sm mt-2 ml-3">
              6. With respect to all PDU content and other training materials, ATPs must abide by applicable
              intellectual property law, as well as the terms and restrictions for use of PMI trademarks and copyrighted
              material as stated in this Application and Agreement and as found in the most current&nbsp;
              <a
                className="text-primary hover:text-primary-light cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pmi.org/-/media/pmi/documents/public/pdf/microsites/rep-and-atp-resource-center/authorized-training-partner-handbook.pdf?v=bd07fb35-a387-4f1b-abd5-f6d539a51e0b"
              >
                PMI Authorized Training Partner Handbook
              </a>
              .
            </p>
            <p className="text-sm mt-2 ml-3">
              7. DA certification holders are required to earn 7 PDU’s annually to maintain their certification. DA PDU
              content does not need to align to PMI Talent Triangle. For more information, please consult the&nbsp;
              <a
                className="text-primary hover:text-primary-light cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pmi.org/-/media/pmi/documents/public/pdf/microsites/rep-and-atp-resource-center/authorized-training-partner-handbook.pdf?v=bd07fb35-a387-4f1b-abd5-f6d539a51e0b"
              >
                PMI Authorized Training Partner Handbook
              </a>
              .
            </p>
          </div>
        )}

        {tab === 3 && (
          <div>
            <p className="text-sm mt-2">Courses and Learning Objectives</p>
            <p className="text-sm mt-2">
              To ensure that identified learning objectives will be met, PMI requires that ATP training personnel have
              the requisite experience.
            </p>
            <p className="text-sm mt-2">ATPs must:</p>
            <p className="text-sm mt-2">
              a. Have processes in place to select qualified instructors and ensure instructional effectiveness for all
              courses.
            </p>
            <p className="text-sm mt-2">
              b. Use instructional methods and learning resources appropriate to achievement of the learning objectives.
            </p>
            <p className="text-sm mt-2">
              c. Ensure that all instructors affiliated with the ATP receive a badge issued by an authorized PMI badging
              vendor verifying that they have completed the Train-the-Trainer session provided by PMI and are authorized
              to provide Certification Exam Prep Training.
            </p>
            <img className="mt-2 w-full h-full" src="images/step01-crit3-table.png" alt="" />
          </div>
        )}

        {tab === 4 && (
          <div>
            <p className="text-sm mt-2">
              To ensure that participants are awarded the appropriate number of PDUs upon completion of a course, and
              that assignment of PDUs is uniform throughout the Authorized Training Partner Program, the following
              requirements apply:
            </p>
            <p className="text-sm mt-2">
              a. The ATP will calculate the PDU value of each course delivered via classroom or distance learning
              instructional methodologies using current industry methods of contact hour equivalencies listed below.
            </p>
            <p className="text-sm mt-2 ml-3">
              1. Courses delivered shall be assigned one (1) PDU for each contact hour of instructional interaction. One
              (1) PDU is issued for every contact hour of a planned, structured learning activity.
            </p>
            <p className="text-sm mt-2 ml-3">2. No course pre-work or homework assignments are eligible for PDUs.</p>
            <p className="text-sm mt-2 ml-3">
              3. Courses must align to at least one (1) segment of the PMI Talent Triangle®.
            </p>
            <p className="text-sm mt-2 ml-3">4. PDUs may be awarded in increments as small as 0.25 PDU.</p>
            <p className="text-sm mt-2 ml-3">
              5. Courses delivered on demand shall be assigned PDUs based on the average time (in hours) needed to
              complete the course by a minimum of 20 sample participants. PMI reserves the right to audit any course for
              any reason, and specifically, courses in which the PDU total conflicts with the time spent in a structured
              learning environment. In the event that an audit occurs the ATP must produce an electronically
              generated/time stamped verification document showing the amount of time 20 students took to complete the
              course.
            </p>
            <p className="text-sm mt-2 ml-3">
              6. If a student is taking an on demand online course, the ATP must obtain and be able to show to PMI a
              time-stamped document that shows how long each student was in the course.
            </p>
            <p className="text-sm mt-2">b. Courses providing PDUs must be listed in PMI’s CCRS directory.</p>
            <p className="text-sm mt-2">
              c. If PDUs assigned to a course by the ATP do not match the time a student is confirmed to have been in
              the online learning environment, the ATP will be subject to removal from the Program.
            </p>
          </div>
        )}

        {tab === 5 && (
          <div>
            <p className="text-sm mt-2">
              To ensure that courses for PDU credit being offered under the ATP Program meet student expectations and
              achieve their stated learning objectives, ATPs shall have a process in place for continuously improving
              their courses based on student evaluations, external audits, course changes or other monitoring methods.
              ATPs must abide by the following requirements with respect to course submission, evaluation, maintenance
              and improvement:
            </p>
            <p className="text-sm mt-2">
              a. A course number is one course/event. Since students cannot submit multiple claims against a single
              activity number, ATPs may not create a single activity with multiple courses. Courses over 35 PDUs entered
              in CCRS appearing to be more than one unit of study will not be allowed.
            </p>
            <p className="text-sm mt-2">
              b. Course listings in CCRS Directory shall be current at all times with the content contained within their
              courses.
            </p>
            <p className="text-sm mt-2">
              c. No course will be allowed in CCRS that accounts for a total cycle&apos;s worth of a credential holder’s
              PDUs. The purpose of this requirement is for credential holders to continuously enhance skills over the
              3-year cycle period.
            </p>
            <p className="text-sm mt-2">
              d. ATPs should submit batch PDU claims for students. When a batch claim is submitted, the course survey
              goes out to the students.
            </p>
          </div>
        )}

        {tab === 6 && (
          <div>
            <p className="text-sm mt-2">Marketing Guidelines</p>
            <p className="text-sm mt-2">
              ATPs must adhere to the following PMI ATP Program marketing guidelines to ensure that the ATP acts in an
              honest, ethical, and professional manner, and avoids any misleading statements about courses or results
              achieved from enrollment, and to ensure the relationship between PMI and the ATP is accurately represented
              to the public. ATPs must seek to ensure that their designation as ATPs, and use of the PMI ATP Seal and
              ATP number, are used only in appropriate ways consistent with Program guidelines and only by ATPs
              themselves. ATPs agree as follows:
            </p>
            <p className="text-sm mt-2">
              a. The PMI ATP Seal may be used only in conjunction with authorized Certification Exam Prep Training
              Materials and PDU courses in CCRS. The PMI ATP Seal cannot be used with other organizations’ certification
              courses, by organizations affiliated with the ATP who are not ATPs, or on any third party platforms.
            </p>
            <p className="text-sm mt-2">
              b. ATPs are NOT permitted to offer the Certification Exam Prep Training via Massive Open Online Courses
              (MOOCs). ATPs further are NOT permitted to display the PMI ATP Seal or the PMI Logo on a MOOC website to
              market or advertise the Certification Exam Prep Training course.
            </p>
            <p className="text-sm mt-2">
              c. ATPs will act in an honest, ethical and professional manner in its dealings with PMI and the public.
              ATPs must:
            </p>
            <p className="text-sm mt-2 ml-3">
              1. Accurately represent the scope and quality of their offerings to prospective and enrolled students, PMI
              staff, and public.
            </p>
            <p className="text-sm mt-2 ml-3">
              2. Use the words &quot;organization has been reviewed and approved by the PMI® Authorized Training Partner
              Program &quot;. Never use “accredited”, “certified”, “sponsored”, “endorsed”, or “guaranteed” by the PMI®
              Authorized Training Partner Program or PMI.
            </p>
            <p className="text-sm mt-2 ml-3">
              3. Include proper notice of PMI ownership of its copyrights, trade, service or certification marks with
              all uses of such copyrights and marks as instructed by the current&nbsp;
              <a
                className="text-primary hover:text-primary-light cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pmi.org/-/media/pmi/documents/public/pdf/microsites/rep-and-atp-resource-center/authorized-training-partner-handbook.pdf?v=bd07fb35-a387-4f1b-abd5-f6d539a51e0b"
              >
                PMI Authorized Training Partner Handbook
              </a>
              .
            </p>
            <p className="text-sm mt-2 ml-3">
              4. Refrain from using any PMI logo, trade, service or certification mark in any domain name, e-mail
              account or company name. If there is any doubt about such usage, the ATP should consult with the
              designated PMI ATP Program contact person at PMI to obtain direction.
            </p>
            <p className="text-sm mt-2 ml-3">
              5. Abide by PMI&apos;s advertising policies when advertising offerings. The PMI Advertising Policy is
              found within the Authorized Training Partner Program Resources.
            </p>
            <p className="text-sm mt-2">
              *Approved logos and marketing statements can be found in the&nbsp;
              <a
                className="text-primary hover:text-primary-light cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pmi.org/-/media/pmi/documents/public/pdf/microsites/rep-and-atp-resource-center/authorized-training-partner-handbook.pdf?v=bd07fb35-a387-4f1b-abd5-f6d539a51e0b"
              >
                PMI Authorized Training Partner Handbook
              </a>
              .
            </p>
          </div>
        )}

        {tab === 7 && (
          <div>
            <p className="text-sm mt-2">Use and Protection of PMI Intellectual Property and Brand</p>
            <p className="text-sm mt-2">
              ATPs commit to best practices regarding their use of PMI content in accordance with the unique License
              granted to ATPs and the requirements of this Application and Agreement. In addition to acceptance of the
              terms of the License granted to the ATP upon acceptance into the Program, ATP agrees that:
            </p>
            <p className="text-sm mt-2">
              a. PMI owns all right, title and interest in the PMI Licensed Material and the Certification Exam Prep
              Training Materials and reserves all rights to publish and use, and to license others to publish and use,
              the PMI Licensed Material and the Certification Exam Prep Training Materials and any portion thereof, in
              any manner whatsoever and in any location without restriction. The Certification Exam Prep Training
              Materials, and any rights not explicitly granted to ATP in the PMI Licensed Material or the Certification
              Exam Prep Training Materials are reserved to and shall remain with PMI (or its successors or assigns).
            </p>
            <p className="text-sm mt-2">
              b. ATP shall promptly notify PMI of any infringement or unauthorized use of the PMI Licensed Material or
              Certification Training Materials by a third party, any claim that the PMI Licensed Material or
              Certification Training Materials infringe upon the intellectual property rights of a third party, or any
              act of unfair competition by third parties relating to the PMI Licensed Material or Certification Training
              Materials, whenever ATP becomes aware of such an act or claim.
            </p>
            <p className="text-sm mt-2">
              c. PMI’s platform vendor for the ATP Program provides secure hosting of the PMI Licensed Material,
              Certification Exam Prep Training Materials, and other materials to which ATPs receive access. However, to
              the extent that the PMI Licensed Material is incorporated into activities or activity materials made
              available to students by an ATP via the internet or otherwise in a manner other than via the platform
              vendor’s secure hosting, the ATP agrees that neither the PMI Licensed Material nor Certification Exam Prep
              Training Materials will be displayed on a website accessible to the general public. All Certification Exam
              Prep Training Materials and ATP online courses containing PMI Licensed Material must be posted to password
              protected areas of the ATP website.
            </p>
            <p className="text-sm mt-2">
              d. Appropriate credit to PMI&apos;s copyrighted material must be provided, either on the first page of the
              quoted text or in the figure legend in the format as follows: &quot;Project Management Institute, [Insert
              title of PMI Licensed Material or PMI Certification Exam Prep Training Material], Copyright 2020.
              Copyright and all rights reserved. Material from this publication has been reproduced with the permission
              of PMI.&quot;
            </p>
          </div>
        )}

        {tab === 8 && (
          <div>
            <p className="text-sm mt-2">
              e. No Misrepresentations: ATPs will not place PMI web pages in a “frame” within their own websites without
              specific written permission from PMI.
            </p>
            <p className="text-sm mt-2">
              f. No Negative References: ATPs may not make negative or disparaging references to PMI, its services or
              its members to otherwise compare PMI, its services or its members unfavorably to others.
            </p>
            <p className="text-sm mt-2">
              g. No Objectionable Content: ATPs’ websites must not contain, or link to, content that may be interpreted
              as libelous, obscene, or criminal, or which may infringe or violate any third party rights.
            </p>
            <p className="text-sm mt-2">
              h. No Conflicts of Interest: ATPs will not conduct any business that represents a conflict of interest or
              interferes with the integrity of PMI&apos;s examination certification program. In that regard, ATPs may
              not use actual questions or items from PMI certification examinations for examination preparation
              training. ATPs may not act as or operate a PMI certification examination business and simultaneously
              maintain ATP status.
            </p>
            <p className="text-sm mt-2">
              i. Protection of Marks: ATPs may not use PMI names, marks or other materials in a manner that is likely to
              cause confusion with another source or to dilute or damage the reputation or image of PMI.
            </p>
            <p className="text-sm mt-2">
              j. Indemnification: PMI shall have no responsibility or liability for any content appearing on the ATP’s
              website or otherwise displayed or used publically by the ATP. ATP agrees to indemnify and defend PMI
              against all claims arising out of or based upon content appearing on its website or otherwise used by or
              displayed to third parties by the ATP.
            </p>
            <p className="text-sm mt-2">
              k. Proper use of PMI Talent Triangle Logo: ATP’s use of the PMI Talent Triangle® logo (“Talent Triangle
              Logo”) will conform in all respects to the logo usage guidelines as defined in the PMI List of Marks. When
              placed on a website, the Talent Triangle Logo may only be used to show ATP’s course alignment to skills
              defined in the PMI Talent Triangle® and must link to the following URL:&nbsp;
              <a
                className="text-primary hover:text-primary-light"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pmi.org/learning/training-development/talent-triangle"
              >
                https://www.pmi.org/learning/training-development/talent-triangle
              </a>
              .
            </p>
            <p className="text-sm mt-2">
              l. Right to Revoke: PMI grants ATPs the right to link to the PMI website as appropriate to provide easy
              access to information about PMI certification programs. PMI reserves the right at any time and in its sole
              discretion to revoke the right to link to PMI’s website and request that the ATP remove from its website
              any link to the PMI website.
            </p>
            <p className="text-sm mt-2">
              i. Amendment to Terms and Conditions Related to Links: An ATP applicant cannot use or publicize the PMI
              ATP Seal or the ATP designation, until it has received written confirmation from PMI that it has been
              accepted into the Program and paid the membership fee.
            </p>
            <p className="text-sm mt-2">
              j. An ATP applicant cannot use or publicize the PMI ATP Seal or the ATP designation, until it has received
              written confirmation from PMI that it has been accepted into the Program and paid the membership fee.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center py-5">
        {application.canEdit && (
          <ButtonWithIcon isLoading={loading} onClick={() => next()} title="Agree & Move Next">
            <span className="w-6 text-xl">
              <i className="fas fa-edit" />
            </span>
          </ButtonWithIcon>
        )}
      </div>
    </div>
  );
};

export default Step1;
