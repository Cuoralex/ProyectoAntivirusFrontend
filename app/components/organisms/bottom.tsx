import { Link } from "@remix-run/react";

const FloatingButton = () => {
  return (
    <div className="relative">
      <Link 
        to="/tu-ruta" 
        className="fixed bottom-5 right-5 lg:bottom-10 lg:right-10 z-20"
      >
        <div className="p-3 rounded-full border-4 border-white bg-green-600 shadow-lg hover:bg-green-700 transition">
          <svg
            className="w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 text-white"
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
    </div>
  );
};

export default FloatingButton;
