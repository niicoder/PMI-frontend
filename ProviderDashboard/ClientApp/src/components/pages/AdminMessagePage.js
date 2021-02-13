import React, { useState } from 'react';
import ButtonWithIcon from '../buttons/ButtonWithIcon';
import AdminTab from '../admin/AdminTab';
import Message from '../admin/Message';
import ComposeMessage from '../admin/ComposeMesssage';

const AdminMessagePage = () => {
  const [tab] = useState(3);
  const [messageCount] = useState(5);

  const [compTab, setCompTab] = useState(1);
  const [compApplication, setCompApplication] = useState(3);
  const [compStep, setCompStep] = useState(1);
  const [compVisible, setCompVisible] = useState(false);

  const mock = [
    {
      type: 'Request',
      to: 'ACME Corporation',
      from: 'Applicant: Michael Scott',
      hasReply: true,
      expanded: true,
      messages: [
        {
          subject: 'Lorem Ipsum',
          date: '03/15/2020',
          time: '11:25AM',
          re: 'Administrative contact Update',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh vitae eu feugiat tincidunt scelerisque. Et malesuada tristique diam a, viverra id. Sagittis odio proin sit metus, sapien at varius vehicula quis. Praesent nec id pellentesque luctus enim quis. Velit aliquet sem vulputate ipsum id. Platea velit, diam amet, volutpat. Mi volutpat sed tellus eu et sit tempor. At urna faucibus nibh aliquam. Nunc ultricies egestas ultrices volutpat fames porttitor. Placerat quis congue neque, scelerisque. Ullamcorper sit orci eget adipiscing. Netus et egestas commodo vestibulum amet ipsum. Erat suspendisse metus ultrices elementum sit elementum lorem. Ut facilisis et velit tempus vitae massa leo. Sed blandit eget diam duis dignissim blandit. Nisl volutpat eget mattis lectus. At nunc malesuada molestie eget diam nibh. Non tristique integer nec imperdiet tempus scelerisque arcu. Nulla massa accumsan',
        },
        {
          subject: 'Lorem Ipsum',
          date: '03/15/2020',
          time: '11:25AM',
          replyto: 'PMI Staff (John Fineman)',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh vitae eu feugiat tincidunt scelerisque. Et malesuada tristique diam a, viverra id. Sagittis odio proin sit metus, sapien at varius vehicula quis. Praesent nec id pellentesque luctus enim quis. Velit aliquet sem vulputate ipsum id. Platea velit, diam amet, volutpat. Mi volutpat sed tellus eu et sit tempor. At urna faucibus nibh aliquam. Nunc ultricies egestas ultrices volutpat fames porttitor. Placerat quis congue neque, scelerisque. Ullamcorper sit orci eget adipiscing. Netus et egestas commodo vestibulum amet ipsum. Erat suspendisse metus ultrices elementum sit elementum lorem. Ut facilisis et velit tempus vitae massa leo. Sed blandit eget diam duis dignissim blandit. Nisl volutpat eget mattis lectus. At nunc malesuada molestie eget diam nibh. Non tristique integer nec imperdiet tempus scelerisque arcu. Nulla massa accumsan',
        },
      ],
    },
    {
      type: 'Application',
      to: 'ACME Corporation',
      from: 'Michael Scott',
      hasReply: false,
      expanded: false,
      messages: [
        {
          subject: 'Lorem Ipsum',
          date: '03/15/2020',
          time: '11:25AM',
          re: 'Administrative contact Update',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh vitae eu feugiat tincidunt scelerisque. Et malesuada tristique diam a, viverra id. Sagittis odio proin sit metus, sapien at varius vehicula quis. Praesent nec id pellentesque luctus enim quis. Velit aliquet sem vulputate ipsum id. Platea velit, diam amet, volutpat. Mi volutpat sed tellus eu et sit tempor. At urna faucibus nibh aliquam. Nunc ultricies egestas ultrices volutpat fames porttitor. Placerat quis congue neque, scelerisque. Ullamcorper sit orci eget adipiscing. Netus et egestas commodo vestibulum amet ipsum. Erat suspendisse metus ultrices elementum sit elementum lorem. Ut facilisis et velit tempus vitae massa leo. Sed blandit eget diam duis dignissim blandit. Nisl volutpat eget mattis lectus. At nunc malesuada molestie eget diam nibh. Non tristique integer nec imperdiet tempus scelerisque arcu. Nulla massa accumsan',
        },
      ],
    },
    {
      type: 'Application',
      to: 'ACME Corporation',
      from: 'Michael Scott',
      hasReply: false,
      expanded: false,
      messages: [
        {
          subject: 'Lorem Ipsum',
          date: '03/15/2020',
          time: '11:25AM',
          re: 'Administrative contact Update',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh vitae eu feugiat tincidunt scelerisque. Et malesuada tristique diam a, viverra id. Sagittis odio proin sit metus, sapien at varius vehicula quis. Praesent nec id pellentesque luctus enim quis. Velit aliquet sem vulputate ipsum id. Platea velit, diam amet, volutpat. Mi volutpat sed tellus eu et sit tempor. At urna faucibus nibh aliquam. Nunc ultricies egestas ultrices volutpat fames porttitor. Placerat quis congue neque, scelerisque. Ullamcorper sit orci eget adipiscing. Netus et egestas commodo vestibulum amet ipsum. Erat suspendisse metus ultrices elementum sit elementum lorem. Ut facilisis et velit tempus vitae massa leo. Sed blandit eget diam duis dignissim blandit. Nisl volutpat eget mattis lectus. At nunc malesuada molestie eget diam nibh. Non tristique integer nec imperdiet tempus scelerisque arcu. Nulla massa accumsan',
        },
      ],
    },
  ];

  return (
    <div className="mb-12">
      <AdminTab tab={tab} messageCount={messageCount} />
      <div className="container mx-auto mt-12 text-left">
        <div className="mb-4">
          <ButtonWithIcon
            title="Compose"
            rtl
            size={2}
            onClick={() => {
              setCompStep(1);
              setCompVisible(true);
            }}
          >
            <span className="w-6 text-sm">
              <i className="far fa-edit" />
            </span>
          </ButtonWithIcon>
        </div>
      </div>

      {mock.map((item) => (
        <Message
          type={item.type}
          to={item.to}
          from={item.from}
          hasReply={item.hasReply}
          expanded={item.expanded}
          messages={item.messages}
          onReply={() => {
            setCompStep(2);
            setCompVisible(true);
          }}
        />
      ))}

      {compVisible && (
        <ComposeMessage
          step={compStep}
          tab={compTab}
          application={compApplication}
          onApplicationChange={(index) => setCompApplication(index)}
          onTabChange={(index) => setCompTab(index)}
          onClose={() => setCompVisible(false)}
          onNext={() => {
            setCompStep(compStep + 1);
            if (compStep + 1 > 2) {
              setCompVisible(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default AdminMessagePage;
