import React from 'react';
import { useHistory } from 'react-router';
import cn from 'classnames';
import useSWR from 'swr';
import PlanCard from '../common/PlanCard';
import { fetcher, makeRequest } from '../../utils/request';

const Step6 = ({ application, onSuccess, admin }) => {
  const history = useHistory();

  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
  });

  const { data: plans } = useSWR(application ? `/api/plans/${application.id}` : null, fetcher);

  const path = admin ? `/admin/application/${application.id}/status` : `/application/${application.id}/step7`;

  const choosePlan = async (plan) => {
    if (!application.canEdit) return;

    await makeRequest('post', `/api/providerapplication/SelectPlan/${application.id}/${plan.planId}`);
    onSuccess();

    history.push(path);
  };

  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Select Plan</div>
      </div>

      <div className="px-8 py-4">
        <div className="flex justify-between items-center h-full">
          {plans &&
            plans.map((plan) => (
              <div key={plan.planId} className="w-2/5">
                <PlanCard
                  title={plan.planName}
                  onClick={() => choosePlan(plan)}
                  chosen={plan.planId === application.planId}
                >
                  {plan.planTypeId === 'PLAN_PREMIUM' && (
                    <div className="plan-premium-banner relative">
                      <i className="absolute text-base fas fa-star text-white mt-3" style={{ marginLeft: '-10px' }} />
                    </div>
                  )}
                  <div
                    className={cn('text-3xl font-bold', {
                      'mt-32': plan.planTypeId === 'PLAN_BASIC',
                      'mt-6': plan.planTypeId === 'PLAN_PREMIUM',
                    })}
                  >
                    <sup>$</sup>
                    {formatter.format(plan.planFee)}
                  </div>
                </PlanCard>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Step6;
