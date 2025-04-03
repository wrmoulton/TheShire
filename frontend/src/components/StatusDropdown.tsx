import { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // You can also use a unicode arrow if you prefer

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const statuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

const statusColors: Record<string, string> = {
  Applied: 'bg-blue-600',
  Interview: 'bg-purple-500',
  Offer: 'bg-green-500',
  Rejected: 'bg-red-500',
};

const StatusDropdown = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left w-28">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-2 py-1 rounded text-sm text-white ${statusColors[value] || 'bg-gray-700'}`}
      >
        <span>{value}</span>
        <ChevronDown className="w-4 h-4 text-white ml-2" />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full rounded shadow-md bg-gray-800 border border-gray-700 overflow-hidden">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => {
                onChange(status);
                setOpen(false);
              }}
              className={`w-full text-left px-2 py-1 text-sm text-white hover:bg-gray-600 ${
                statusColors[status]
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
