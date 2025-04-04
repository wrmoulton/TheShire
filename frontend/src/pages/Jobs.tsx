import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import AddJob from '../components/AddJob';
import FloatingAddButton from '../components/FloatingAddButton';
import ProgressPipeline from '../components/ProgressPipeline';
import GraphModal from "../components/GraphModal";
import { BarChart3} from 'lucide-react';

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

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showGraphModal, setShowGraphModal] = useState(false);


  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs:", err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (id: number, newStatus: string) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );

    // Optional: send PATCH/PUT request to backend to persist status change
    fetch(`http://127.0.0.1:8000/jobs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    }).catch((err) => console.error('Failed to update status:', err));
  };
  const handleDelete = (id: number) => {
    fetch(`http://127.0.0.1:8000/jobs/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setJobs((prev) => prev.filter((job) => job.id !== id));
      })
      .catch((err) => console.error("Failed to delete job:", err));
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-400">Job Applications</h1>
            <p className="text-sm text-gray-400">Track and manage the jobs you've applied to.</p>
          </div>

          <button
              onClick={() => setShowGraphModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md text-sm font-semibold transition duration-200"
            >
              <BarChart3 className="w-5 h-5 text-white" />
            </button>
        </div>
      {!loading && jobs.length > 0 && <ProgressPipeline jobs={jobs} />}
      {loading ? (
        <p className="text-gray-400">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found. Add your first one!</p>
      ) : (
        jobs.map((job) => (
          <JobCard 
            key={job.id} 
            job={job} 
            onStatusChange={handleStatusChange} 
            onEdit={(job) => 
                {
                setEditingJob(job);
                setShowModal(true);
                }}
            onDelete={handleDelete}
          />
        ))
      )}

    {showModal && (
      <AddJob
        jobToEdit={editingJob}
        onClose={() => {
          setShowModal(false);
          setEditingJob(null);
        }}
      onSubmit={(jobData) => {
        const isEditing = Boolean(editingJob);

      const method = isEditing ? 'PATCH' : 'POST';
      const endpoint = isEditing && editingJob
        ? `http://127.0.0.1:8000/jobs/${editingJob.id}`
        : `http://127.0.0.1:8000/jobs`;

      fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (isEditing) {
            setJobs((prev) =>
              prev.map((job) => (job.id === data.id ? data : job))
            );
          } else {
            setJobs((prev) => [...prev, data]);
          }

          setShowModal(false);
          setEditingJob(null);
        })
        .catch((err) => console.error('Failed to save job:', err));
    }}
  />
)}

<FloatingAddButton onClick={() => setShowModal(true)} />
{showGraphModal && <GraphModal onClose={() => setShowGraphModal(false)} jobs={jobs} />}

    </div>
    
  );
};

export default Jobs;
