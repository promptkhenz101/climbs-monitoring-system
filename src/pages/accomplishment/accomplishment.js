import React, { useState, useEffect } from "react";
import AddAccomplishment from "../../components/modals/addAccomModal";
import EditAccomplishment from "../../components/modals/EditAccomplishmentModal";
import Sidebar from "../../components/sidebar/sidebar";
import { GoThreeBars } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { getPositionIdByAreaId } from "../../services/position";
import { getUserIdByPositionId } from "../../services/users";
import Datepicker from "../../components/datapicker/datepicker";
import {
  getAccomplishments,
  getAccomplishmentsByUserId,
} from "../../services/accomplishment";

const Accomplishment = (props) => {
  const [toggleAddAccom, setToggleAddAccom] = useState(false);
  const [toggleEditAddAccom, setToggleEditAddAccom] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [accomList, setAccomList] = useState([]);
  const [reloadAccom, setReloadAccom] = useState(false);
  const [editId, setEditId] = useState(null);

  var dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);
  var d1 = dateNow.toISOString().split("T")[0];
  const [date, setDate] = useState([d1, d1]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    fetchAccomplishments();
  }, [date, reloadAccom]);

  const fetchAccomplishments = async () => {
    var policy = localStorage.getItem("clmPolicy");
    if (policy === "1" || policy === "4") {
      await adminViewer();
    } else if (policy === "2") {
      await accomplishmentsAsm();
    } else if (policy === "3") {
      await accomplishmentRsm();
    }
    setReloadAccom(false);
  };

  const adminViewer = async () => {
    const accom = await getAccomplishments(date);
    if (accom.success) {
      setAccomList(accom.data.data);
      props.setForPrint(accom.data.data);
    }
  };

  const accomplishmentsAsm = async () => {
    const positionIds = await getPositionIdByAreaId(
      localStorage.getItem("clmArea")
    );

    if (positionIds.success) {
      const userIds = await getUserIdByPositionId(positionIds.data);
      if (userIds.success) {
        const accom = await getAccomplishmentsByUserId(userIds.data, date);
        if (accom.success) {
          setAccomList(accom.data.data);
          props.setForPrint(accom.data.data);
        }
      }
    }
  };

  const accomplishmentRsm = async () => {
    const accom = await getAccomplishmentsByUserId(
      [localStorage.getItem("clmUserId")],
      date
    );
    if (accom.success) {
      setAccomList(accom.data.data);
      props.setForPrint(accom.data.data);
    }
  };

  return (
    <div className="relative bg-indigo-50 shadow-xl overflow-x-hidden">
      <Sidebar showSidebar={showSidebar} />
      <main
        className={`${
          showSidebar ? "pl-56" : ""
        } lg:pl-56 h-auto flex-col bg-indigo-50  w-full pr-6 ml-3 mb-5 pt-3`}
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
              Weekly Accomplishment
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
        <div className="accom-table justify-between p-4 bg-white mt-3 rounded-xl shadow-lg gap-3">
          <div className="justify-self-start mb-4">
            <div>
              <Datepicker setDate={setDate} date={date} />
            </div>
          </div>
          <div
            className={`flex justify-end mb-5 ${
              localStorage.getItem("clmPolicy") === "4" ? "hidden" : ""
            }`}
          >
            <div className="mr-5">
              <Link
                to="/printaccomplishment"
                className="text-white flex justify-center font-bold items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br rounded-lg text-sm px-2 py-1.5 text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print
              </Link>
            </div>
            <div className="">
              <button
                onClick={() => {
                  setToggleAddAccom(!toggleAddAccom);
                }}
                className="text-white flex justify-center font-bold items-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br rounded-lg text-sm px-2 py-1.5 text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:h-5 W-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add
              </button>
            </div>
          </div>
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-black ">
              <thead className="text-xs text-white uppercase bg-blue-600 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name of coops/Non coops
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Purpose
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remarks/Feedbacks
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {accomList.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b odd:bg-white even:bg-yellow-200"
                    >
                      <td className="px-6 py-4">{value.attributes.date}</td>
                      <td className="px-6 py-4">
                        {value.attributes.coop_name}
                      </td>
                      <td className="px-6 py-4">{value.attributes.product}</td>
                      <td className="px-6 py-4">{value.attributes.purpose}</td>
                      <td className="px-6 py-4">{value.attributes.remarks}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            if (localStorage.getItem("clmPolicy") !== "4") {
                              setToggleEditAddAccom(!toggleEditAddAccom);
                              setEditId(value.id);
                            }
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <AddAccomplishment
        toggleModal={toggleAddAccom}
        setToggleModal={setToggleAddAccom}
        setReloadAccom={setReloadAccom}
      />
      <EditAccomplishment
        toggleModal={toggleEditAddAccom}
        setToggleModal={setToggleEditAddAccom}
        setReloadAccom={setReloadAccom}
        editId={editId}
      />
    </div>
  );
};

export default Accomplishment;
