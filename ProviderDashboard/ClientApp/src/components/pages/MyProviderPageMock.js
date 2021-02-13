import React from 'react';
import TopMenu from '../common/TopMenu';

const MyProviderPage = () => {
  return (
    <div>
      <TopMenu />
      <div className="pt-24">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <div className="font-bold text-3xl mb-3">My Provider Page</div>
            <div className="font-bold text-xl">Placeholder. Coming soon...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProviderPage;
