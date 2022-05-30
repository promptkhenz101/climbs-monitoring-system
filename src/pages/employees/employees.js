import React, { useState, useEffect } from "react";
import AddEmployeeModal from "../../components/modals/AddEmployeeModal";
import EditEmployeeModal from "../../components/modals/EditEmployeeModal";
import Sidebar from "../../components/sidebar/sidebar";
import { GoThreeBars } from "react-icons/go";
import { getUsers } from "../../services/users";
import { getPosition } from "../../services/position";
import { getPolicy } from "../../services/policy";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const [toggleAddEmp, setToggleAddEmp] = useState(false);
  const [toggleEditEmp, setToggleEditEmp] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [userList, setUserList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [policyList, setPolicyList] = useState([]);
  const [reloadAccom, setReloadAccom] = useState(false);
  const [editId, setEditId] = useState(null);

  var navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (localStorage.getItem("clmPolicy") !== "1") {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [reloadAccom]);

  const fetchUsers = async () => {
    const users = await getUsers();
    if (users.success) {
      var usr = users.data;
      var tempPos = [];
      var tempPol = [];
      for (var x = 0; x < usr.length; x++) {
        const position = await getPosition(usr[x].positionId);
        const policy = await getPolicy(usr[x].policyId);

        if (position.success) {
          // console.log(position.data.data);
          tempPos.push({
            id: position.data.data.id,
            title: position.data.data.attributes.title,
          });
        }
        if (policy.success) {
          // console.log(policy.data.data);
          tempPol.push({
            id: policy.data.data.id,
            name: policy.data.data.attributes.name,
          });
        }
        setReloadAccom(false);
      }
      // console.log(tempPol);
      setUserList(usr);
      setPositionList(tempPos);
      setPolicyList(tempPol);
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
              Employee Information
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
        <div className="grid grid-cols-1 items-center  justify-between p-4 bg-white mt-3 rounded-xl shadow-lg gap-3">
          <div className="justify-self-end grid grid-cols-1w-3/4 md:w-1/3">
            <div className="justify-self-end">
              <button
                onClick={() => {
                  setToggleAddEmp(!toggleAddEmp);
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
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Policy
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Birthday
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {userList.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 "
                    >
                      <td className="px-6 py-4">{value.name}</td>
                      <td className="px-6 py-4">{positionList[index].title}</td>
                      <td className="px-6 py-4">{policyList[index].name}</td>
                      <td className="px-6 py-4">{value.number}</td>
                      <td className="px-6 py-4">{value.email}</td>
                      <td className="px-6 py-4">{value.birthdate}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            console.log(editId);
                            setToggleEditEmp(!toggleAddEmp);
                            setEditId(value.id);
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
      <AddEmployeeModal
        toggleModal={toggleAddEmp}
        setToggleModal={setToggleAddEmp}
        setReloadAccom={setReloadAccom}
      />
      <EditEmployeeModal
        toggleModal={toggleEditEmp}
        setToggleModal={setToggleEditEmp}
        setReloadAccom={setReloadAccom}
        editId={editId}
      />
    </div>
  );
};

export default Employees;
