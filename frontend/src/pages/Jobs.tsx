import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import AddJob from '../components/AddJob';
import FloatingAddButton from '../components/FloatingAddButton';


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
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-400">Job Applications</h1>
      <p className="text-sm text-gray-400 mb-6">Track and manage the jobs you've applied to.</p>

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

    </div>
    
  );
};

export default Jobs;
