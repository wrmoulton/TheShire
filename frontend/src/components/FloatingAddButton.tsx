const FloatingAddButton = ({ onClick }: { onClick: () => void }) => {
    return (
      <button
        onClick={onClick}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-xl text-sm font-semibold transition duration-200"
      >
        + Add Job
      </button>
    );
  };
  
  export default FloatingAddButton;
  