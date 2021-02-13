import React from 'react';

const SiteFooter = () => {
  return (
    <div className="bg-gray-100 mt-10">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 flex items-center justify-between lg:px-8">
        <div className="flex flex-col w-3/4 mr-5">
          <div className="w-64 flex justify-start mb-2">
            <a href="https://www.pmi.org">
              <img src="images/pmi-logo-new.png" alt="PMI Logo" />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-between ml-5 mb-5">
            <a className="hover:text-primary" href="https://www.pmi.org/privacy">
              Privacy
            </a>
            <a className="hover:text-primary" href="https://www.pmi.org/sitemap-page">
              Sitemap
            </a>
            <a className="hover:text-primary" href="https://www.pmi.org/terms">
              Terms of Use
            </a>
            <a className="hover:text-primary" href="https://www.pmi.org/about/purchasing-terms-and-conditions">
              Purchasing Terms and Conditions
            </a>
            <a className="hover:text-primary" href="https://www.pmi.org/about/advertising-sponsorship">
              Advertising Sponsorship
            </a>
          </div>
          <div className="flex text-base leading-6 text-gray-800 ml-5">
            <span className="mr-3">&copy; 2020 Project Management Institute, Inc.</span>
            <img src="images/flag.svg" alt="flag" />
            <span className="ml-1">USA</span>
          </div>
        </div>
        <div className="flex flex-col w-1/4 mt-12">
          <img className="w-40 bg-white" src="images/pmi-old-logo.svg" alt="PMI Old Logo" />
        </div>
      </div>
    </div>
  );
};

export default SiteFooter;
