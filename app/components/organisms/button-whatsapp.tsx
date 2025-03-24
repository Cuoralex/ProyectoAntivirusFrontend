import { Link } from "@remix-run/react";

const FloatingButton = () => {
  return (
    <Link 
      to="https://wa.me/3173831481"
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 md:bottom-24 md:right-8 lg:bottom-28 lg:right-10 z-30"
    >
      <div className="p-2 md:p-3 lg:p-4 rounded-full border-4 border-white bg-green-600 shadow-lg hover:bg-green-700 transition">
        <svg
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
};

export default FloatingButton;
