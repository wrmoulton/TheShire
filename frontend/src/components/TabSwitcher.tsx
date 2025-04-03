import { useState } from 'react';
import Jobs from '../pages/Jobs';
import Projects from '../pages/Projects';

const TabSwitcher = () => {
    const [activeTab, setActiveTab] = useState<'jobs' | 'projects'>('jobs');
  
    const tabStyles = (tab: 'jobs' | 'projects') =>
      `px-4 py-2 rounded-md text-sm sm:text-base font-medium transition 
       ${
         activeTab === tab
           ? 'bg-blue-600 text-white shadow'
           : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
       }`;
  
    return (
      // Outer full-screen wrapper for background
      <div className="min-h-screen w-full bg-gray-900 text-gray-100">
        {/* Inner centered layout container */}
        <div className="max-w-3xl mx-auto flex flex-col">
          {/* Tab Navigation */}
          <div className="w-full flex justify-center gap-4 p-4 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
            <button className={tabStyles('jobs')} onClick={() => setActiveTab('jobs')}>
              🗂 Jobs
            </button>
            <button className={tabStyles('projects')} onClick={() => setActiveTab('projects')}>
              📁 Projects
            </button>
          </div>
  
          {/* Tab Content */}
          <div className="w-full px-4 py-6">
            {activeTab === 'jobs' ? <Jobs /> : <Projects />}
          </div>
        </div>
      </div>
    );
  };
  
  export default TabSwitcher;
  
