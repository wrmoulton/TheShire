import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

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

const COLORS = ['#3b82f6', '#06b6d4', '#6366f1', '#8b5cf6'];

const processApplicationsOverTime = (jobs: Job[]) => {
  const counts: Record<string, number> = {};
  jobs.forEach(({ date_applied }) => {
    counts[date_applied] = (counts[date_applied] || 0) + 1;
  });
  return Object.entries(counts).map(([date, count]) => ({ date, count }));
};

const processJobTypes = (jobs: Job[]) => {
  const counts: Record<string, number> = {};
  jobs.forEach(({ type }) => {
    counts[type] = (counts[type] || 0) + 1;
  });
  return Object.entries(counts).map(([type, value]) => ({ name: type, value }));
};

const processStatuses = (jobs: Job[]) => {
  const counts: Record<string, number> = {};
  jobs.forEach(({ status }) => {
    counts[status] = (counts[status] || 0) + 1;
  });
  return Object.entries(counts).map(([status, count]) => ({ status, count }));
};

type ChartsProps = {
  jobs: Job[];
};

const Charts: React.FC<ChartsProps> = ({ jobs }) => {
  const timeData = processApplicationsOverTime(jobs);
  const pieData = processJobTypes(jobs);
  const barData = processStatuses(jobs);

  return (
    <div className="space-y-6">
      {/* Applications Over Time - Line Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-blue-500/30">
        <h2 className="text-white text-md mb-2 font-semibold">Applications Over Time</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timeData}>
            <XAxis dataKey="date" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} labelStyle={{ color: '#fff' }} />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Job Type Distribution - Pie Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-blue-500/30">
        <h2 className="text-white text-md mb-2 font-semibold">Job Type Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#3b82f6" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} labelStyle={{ color: '#fff' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Jobs by Status - Bar Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-blue-500/30">
        <h2 className="text-white text-md mb-2 font-semibold">Jobs by Status</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="status" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} labelStyle={{ color: '#fff' }} />
            <Legend wrapperStyle={{ color: '#cbd5e1' }} />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
