import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import { GoThreeBars } from "react-icons/go";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="relative bg-indigo-50 shadow-xl overflow-x-hidden">
      <Sidebar showSidebar={showSidebar} />
      <main
        className={`${
          showSidebar ? "pl-56" : ""
        } lg:pl-56 h-auto flex-col bg-indigo-50  w-full pr-6 ml-3 pt-3`}
      >
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-lg">
          <div className="hamburger-title flex justify-between items-center">
            <GoThreeBars
              className="mr-3 cursor-pointer block lg:hidden text-blue-700 hover:text-yellow-400 transition ease-in-out delay-100"
              size={25}
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            />
            <h1 className="text-sm md:text-xl lg:text-2xl font-bold text-gray-700">
              Welcome to Dashboard
            </h1>
          </div>
          <div className="flex justify-between w-2/7">
            <div className="flex items-left space-x-6 pl-8 ">
              <img
                src="https://i.imgur.com/0wNbS5N.png"
                alt="climbs icon"
                className="cursor-pointer text-right h-5 w-5 object-cover md:h-10 md:w-10"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 content-center mb-6 mt-6 ms:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/accomplishment">
            <div className=" shadow-lg flex items-center justify-around bg-white rounded-xl px-5 py-3">
              <img
                src="https://i.imgur.com/RX3ZjaG.png"
                alt=""
                className="h-5 w-5 object-cover md:h-12 md:w-12 my-5"
              />
              <div className="text-center">
                <h1 className="text-sm md:text-xl lg:text-base font-bold text-gray-800 ">
                  Weekly
                </h1>
                <span className="text-sm md:text-xl lg:text-base  text-gray-500 ">
                  Accomplishment
                </span>
              </div>
            </div>
          </Link>
          <Link to="/reports">
            <div className=" shadow-lg flex items-center  justify-around bg-white rounded-xl  px-5 py-3">
              <img
                src="https://i.imgur.com/8F1emud.png"
                alt=""
                className="h-5 w-5 object-cover md:h-12 md:w-12 my-5"
              />
              <div className="text-center">
                <h1 className="text-sm md:text-xl lg:text-base  font-bold text-gray-800">
                  Itinerary
                </h1>
                <span className=" text-sm md:text-xl lg:text-base  text-gray-500">
                  Report
                </span>
              </div>
            </div>
          </Link>
          <Link to="/monitoring">
            <div className=" shadow-lg flex items-center justify-around bg-white rounded-xl  px-5 py-3">
              <img
                src="https://i.imgur.com/Av0VWRX.jpg"
                alt=""
                className="h-5 w-5 object-cover md:h-12 md:w-12 my-5"
              />
              <div className="text-center">
                <h1 className="text-sm md:text-xl lg:text-base  font-bold text-gray-800">
                  Monitoring
                </h1>
              </div>
            </div>
          </Link>
          <Link to="/employees">
            <div className=" shadow-lg flex items-center justify-around bg-white rounded-xl px-5 py-3">
              <img
                src="https://i.imgur.com/o8dppcn.png"
                alt=""
                className="h-5 w-5 object-cover md:h-12 md:w-12 my-5"
              />
              <div className="text-center">
                <h1 className="text-sm md:text-xl lg:text-base  font-bold text-gray-800">
                  Employees
                </h1>
              </div>
            </div>
          </Link>
          <Link to="/settings">
            <div className=" shadow-lg flex items-center justify-around bg-white rounded-xl  px-5 py-3">
              <img
                src="https://i.imgur.com/FsWgV0l.png"
                alt=""
                className="h-5 w-5 object-cover md:h-12 md:w-12  my-5"
              />
              <div className="text-center">
                <h1 className="text-sm md:text-xl lg:text-base font-bold text-gray-800">
                  Settings
                </h1>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
