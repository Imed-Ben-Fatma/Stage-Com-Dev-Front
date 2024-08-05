import { useClient } from 'next/client';

function Button({ type, onClick }) {
  useClient(); // Mark the component as a Client Component

  return (
    <button
      type="button"
      className="w-44 py-2 px-3 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      onClick={onClick}
    >
      {type}
    </button>
  );
}

export default Button;
