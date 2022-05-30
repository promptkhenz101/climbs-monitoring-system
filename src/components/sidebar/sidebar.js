import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { clearJwtStorage, getJwtStorage } from "../../services/localstorage";

const Sidebar = (props) => {
  var currentRoute = useLocation().pathname;
  let navigate = useNavigate();

  const user = getJwtStorage();

  const logout = () => {
    clearJwtStorage();
    navigate("/login");
  };

  return (
    <div
      className={`${
        props.showSidebar ? "block" : "hidden"
      } fixed w-56 z-50 lg:block min-h-screen space-y-5 flex-col items-center justify-center bg-blue-700 divide-y-2 divide-yellow-300`}
    >
      <div className="flex items-center px-5 py-3">
        <div>
          <img
            src="https://i.imgur.com/3YQWF9J.png"
            alt="Profile"
            className="h-8 mb-2 ml-4 mt-2 pr-4"
          />
        </div>
        <div className="text-center">
          <span>
            <h1 className="text-white font-bold mr-2 cursor-pointer text-lg">
              {user.clmName}
            </h1>
          </span>
        </div>
      </div>
      <ul className="text-base">
        <li
          className={`${
            currentRoute === "/" ? "bg-yellow-200 text-blue-800" : ""
          } flex space-x-2 font-mono mt-4 px-6 py-4 text-white hover:bg-yellow-200 hover:text-blue-800 font-bold hover:rounded-br-3xl hover:rounded-tr-3xl transition duration-100 cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <Link to="/">Dashboard</Link>
        </li>
        <li
          className={`${
            currentRoute === "/accomplishment"
              ? "bg-yellow-200 text-blue-800"
              : ""
          } flex space-x-2 font-mono mt-4 px-6 py-4 text-white hover:bg-yellow-200 hover:text-blue-800 font-bold hover:rounded-br-3xl hover:rounded-tr-3xl transition duration-100 cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <Link to="/accomplishment">Accomplishment</Link>
        </li>
        <li
          className={`${
            currentRoute === "/reports" ? "bg-yellow-200 text-blue-800" : ""
          } flex space-x-2 font-mono mt-4 px-6 py-4 text-white hover:bg-yellow-200 hover:text-blue-800 font-bold hover:rounded-br-3xl hover:rounded-tr-3xl transition duration-100 cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <Link to="/reports">Itinerary</Link>
        </li>
        <li
          className={`${
            currentRoute === "/monitoring" ? "bg-yellow-200 text-blue-800" : ""
          } ${
            localStorage.getItem("clmPolicy") !== "1" ? "hidden" : ""
          } flex space-x-2 font-mono mt-4 px-6 py-4 text-white hover:bg-yellow-200 hover:text-blue-800 font-bold hover:rounded-br-3xl hover:rounded-tr-3xl transition duration-100 cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <Link to="/monitoring">Monitoring</Link>
        </li>
        <li
          className={`${
            currentRoute === "/employees" ? "bg-yellow-200 text-blue-800" : ""
          } ${
            localStorage.getItem("clmPolicy") !== "1" ? "hidden" : ""
          } flex space-x-2 font-mono mt-4 px-6 py-4 text-white hover:bg-yellow-200 hover:text-blue-800 font-bold hover:rounded-br-3xl hover:rounded-tr-3xl transition duration-100 cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <Link to="/employees">Employees</Link>
        </li>
        <li
          className={`${
            currentRoute === "/settings" ? "bg-yellow-200 text-blue-800" : ""
          } flex space-x-2 font-mono mt-4 px-6 py-4 text-white hover:bg-yellow-200 hover:text-blue-800 font-bold hover:rounded-br-3xl hover:rounded-tr-3xl transition duration-100 cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <Link to="/settings">Settings</Link>
        </li>
        <ul>
          <li
            className={`flex space-x-2 font-mono mt-4 px-6 py-4 text-white hover:bg-red-400 hover:text-white font-bold hover:rounded-br-3xl hover:rounded-tr-3xl transition duration-100 cursor-pointer`}
            onClick={() => logout()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
