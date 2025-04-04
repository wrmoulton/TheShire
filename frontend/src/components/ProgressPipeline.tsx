import React from 'react';

type Job = {
  id: number;
  title: string;
  company: string;
  date_applied: string;
  start_date?: string;
  status: string;
  type: string;
  link?: string;
};

type Props = {
  jobs: Job[];
};

const stages = ['Applied', 'Interview', 'Offer', 'Accepted'];

const ProgressPipeline = ({ jobs }: Props) => {
  const statusCounts: Record<string, number> = {
    Applied: jobs.length,
    Interview: jobs.filter(job =>
      ['Interview', 'Offer', 'Accepted'].includes(job.status)
    ).length,
    Offer: jobs.filter(job => ['Offer', 'Accepted'].includes(job.status)).length,
    Accepted: jobs.filter(job => job.status === 'Accepted').length,
  };

  return (
    <div className="w-full flex flex-wrap sm:flex-nowrap gap-6 items-center justify-between bg-gray-800/70 p-4 rounded-lg shadow-md mb-6">
      {stages.map((stage, idx) => (
        <div key={stage} className="flex-1 flex flex-col items-center relative">
          <div
            className={`w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center 
              ${statusCounts[stage] > 0 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
          >
            {statusCounts[stage]}
          </div>
          <span className="text-xs mt-1 text-gray-300">{stage}</span>
          {idx < stages.length - 1 && (
            <div className="hidden sm:block absolute top-5 right-0 w-full h-1 bg-gray-600 -z-10 translate-x-1/2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressPipeline;
