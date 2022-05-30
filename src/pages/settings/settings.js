import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { GoThreeBars } from "react-icons/go";
import { getUser, updateUser } from "../../services/users";

const Settings = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const email = useRef();
  const password = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    fetchUser();
  });

  const fetchUser = async () => {
    const user = await getUser(localStorage.getItem("clmUserId"));
    if (user.success) {
      email.current.value = user.data.email;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var data = {
      password: password.current.value,
    };
    const updatePassword = await updateUser(
      localStorage.getItem("clmUserId"),
      data
    );
    if (updatePassword.success) {
      console.log("Success");
      password.current.value = "";
    }
  };

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
              Setting
            </h1>
          </div>
          <div className="flex justify-between w-2/7">
            <div className="flex items-left space-x-6 pl-8">
              <img
                src="https://i.imgur.com/0wNbS5N.png"
                alt="climbs icon"
                className="cursor-pointer text-right h-5 w-5 object-cover md:h-10 md:w-10"
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto ">
          <div className="bg-white min-h-screen pt-2 font-mono my-2 shadow-md sm:rounded-lg lg:rounded-lg">
            <div className="container mx-auto">
              <div className="inputs w-full max-w-2xl p-6 mx-auto">
                <h2 className="text-2xl text-gray-900">Account Setting</h2>
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 border-t border-gray-400 pt-4"
                >
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-text-1"
                      >
                        Email Address
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        id="grid-text-1"
                        type="text"
                        placeholder="Enter email"
                        ref={email}
                        disabled={true}
                        required
                      />
                    </div>
                    <div className="w-full md:w-full px-3 mb-6 ">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        New Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        id="grid-text-1"
                        type="password"
                        placeholder="Enter password"
                        ref={password}
                        required
                      />
                    </div>
                    <div className="personal w-full border-t bg-white pt-4">
                      <div className="flex justify-end">
                        <button
                          className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3"
                          type="submit"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
