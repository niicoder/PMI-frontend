import React, { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import VoucherList from '../atpprovider/VoucherList';
import InstructorList from '../atpprovider/InstructorList';
import { makeRequest, fetcher } from '../../utils/request';
import { getUserId } from '../../utils/persist';

const InstructorDashboard = () => {
  const personId = getUserId();
  const [providerId, setProviderId] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    makeRequest('get', `/api/ProviderRelationship/GetProviderId/${personId}`)
      .then((providerId) => {
        setProviderId(providerId);
        setLoading(false);
      })
      .catch(() => {
        setProviderId(-1);
        setLoading(false);
      });
  }, []);

  const { data: vouchers } = useSWR(providerId !== 0 ? `/api/voucher/byprovider/${providerId}` : null, fetcher);

  const pmpT3Vouchers = useMemo(() => {
    return vouchers && vouchers.filter((item) => item.applicationTypeId === 2);
  }, [vouchers]);

  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="m-8">Loading....</div>
      </div>
    );
  }

  if (providerId === -1) {
    return (
      <div className="container mx-auto">
        <div className="m-8">This account is not a provider.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="m-8">
        <InstructorList providerId={providerId} pmpT3Vouchers={pmpT3Vouchers} />
      </div>
      <div className="m-8">
        <VoucherList providerId={providerId} pmpT3Vouchers={pmpT3Vouchers} />
      </div>
    </div>
  );
};

export default InstructorDashboard;
