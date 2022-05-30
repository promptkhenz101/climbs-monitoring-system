import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { getPositions } from "../../services/position";
import { getPolicies } from "../../services/policy";
import { createUser, getUser, updateUser } from "../../services/users";

const EditEmployeeModal = (props) => {
  const [date, setDate] = useState(null);
  const [posiList, setPosiList] = useState([]);
  const [poliList, setPoliList] = useState([]);
  const name = useRef();
  const position = useRef();
  const policy = useRef();
  const number = useRef();
  const email = useRef();
  const username = useRef();
  const [successMessage, setSuccessMessage] = useState("");
  const [msgColor, setMsgColor] = useState("green");

  useEffect(() => {
    fetchPositionPolicy();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [props.editId, props.toggleModal]);

  const fetchPositionPolicy = async () => {
    const positions = await getPositions();
    const policies = await getPolicies();

    if (positions.success) {
      setPosiList(positions.data.data);
    }

    if (policies.success) {
      setPoliList(policies.data.data);
    }
  };

  const fetchUser = async () => {
    const user = await getUser(props.editId);
    if (user.success) {
      name.current.value = user.data.name;
      position.current.value = user.data.positionId;
      policy.current.value = user.data.policyId;
      number.current.value = user.data.number;
      email.current.value = user.data.email;
      username.current.value = user.data.username;
      setDate(new Date(user.data.birthdate));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (localStorage.getItem("clmPolicy")) {
      if (date !== null) {
        var dateNow = new Date(date);
        // dateNow.setDate(dateNow.getDate() + 1);
        dateNow.toISOString().slice(0, 10);
        var data = {
          name: name.current.value,
          positionId: position.current.value,
          policyId: policy.current.value,
          number: number.current.value,
          email: email.current.value,
          birthdate: dateNow,
          username: username.current.value,
        };
        const updatedUser = await updateUser(props.editId, data);
        if (updatedUser.success) {
          setMsgColor("green");
          setSuccessMessage("Employee updated successfully");
          setDate(null);
          name.current.value = "";
          position.current.value = "";
          policy.current.value = "";
          number.current.value = "";
          email.current.value = "";
          username.current.value = "";
          props.setReloadAccom(true);
        } else {
          setMsgColor("red");
          setSuccessMessage(updatedUser.error);
          setDate(null);
          name.current.value = "";
          position.current.value = "";
          policy.current.value = "";
          number.current.value = "";
          email.current.value = "";
          username.current.value = "";
        }
      }
    }
  };

  return (
    <div
      id="add-modal"
      aria-hidden="true"
      className={`${
        props.toggleModal ? "" : "hidden"
      } fixed font-nunito overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center h-screen w-screen inset-0 bg-slate-500/[0.5]`}
    >
      <div className="w-full max-w-lg h-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-toggle="add-modal"
              onClick={() => {
                props.setToggleModal(false);
                name.current.value = "";
                position.current.value = "";
                policy.current.value = "";
                number.current.value = "";
                email.current.value = "";
                username.current.value = "";
                setSuccessMessage("");
              }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 px-6 lg:px-8 pb-6 xl:pb-8 overflow-y-auto"
          >
            <h3 className="text-xl text-center font-bold text-blue-500">
              Edit Employee
            </h3>

            <div>
              <input
                type="name"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Name"
                required
                ref={name}
              />
            </div>
            <div>
              {/* <input
                type="position"
                name="position"
                id="position"
                placeholder="Position"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                ref={position}
              /> */}
              <select
                type="position"
                name="position"
                id="position"
                placeholder="Position"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                ref={position}
              >
                {posiList.map((value, index) => {
                  return (
                    <option key={index} value={value.id}>
                      {value.attributes.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <select
                placeholder="Policy"
                name="policy"
                type="policy"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                ref={policy}
                required
              >
                {poliList.map((value, index) => {
                  return (
                    <option key={index} value={value.id}>
                      {value.attributes.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                ref={number}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                ref={email}
              />
            </div>
            <div>
              <input
                type="username"
                name="username"
                id="username"
                placeholder="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                ref={username}
              />
            </div>
            <div className="mx-24 my-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Birthday"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <button
              type="submit"
              className="text-white w-full flex justify-center font-bold items-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br rounded-lg text-lg px-3 py-2 text-center"
            >
              Save
            </button>
            <p
              className={`text-sm font-medium text-${msgColor}-500 text-center`}
            >
              {successMessage}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
