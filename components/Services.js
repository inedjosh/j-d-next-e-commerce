import React from "react";

function Services(props) {
  return (
    <div className=" justify-between p-4 md:py-10 md:px-20 columns-2 sm:columns-4 gap-5 bg-white">
      <div className="flex flex-col mb-5 sm:mb-0 items-center justify-center">
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          ></path>
        </svg>
        <h4 className="font-bold text-xs">High-Qulaity goods</h4>
        <p className="text-gray-400 text-xs w-40 text-center">
          Enjoy top quality items for less
        </p>
      </div>
      <div className="flex mb-5 sm:mb-0  flex-col items-center">
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          ></path>
        </svg>
        <h4 className="font-bold text-xs">24/7 Live chat</h4>
        <p className="text-gray-400 text-xs w-40 text-center">
          Get instant assistance whenever you need it
        </p>
      </div>
      <div className="flex mb-5 sm:mb-0  flex-col items-center">
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          ></path>
        </svg>
        <h4 className="font-bold text-xs">Express shipping</h4>
        <p className="text-gray-400 text-xs w-40 text-center">
          Fast & reliable delivery options
        </p>
      </div>
      <div className="flex mb-5 sm:mb-0 flex-col items-center">
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          ></path>
        </svg>
        <h4 className="font-bold text-xs">Secure payment</h4>
        <p className="text-gray-400 text-xs w-40 text-center">
          Multiple safe payment methods
        </p>
      </div>
    </div>
  );
}

export default Services;
