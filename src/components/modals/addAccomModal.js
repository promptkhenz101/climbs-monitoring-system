import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { createAccomplishment } from "../../services/accomplishment";

const AddAccomplishment = (props) => {
  const [date, setDate] = useState(null);
  const coopname = useRef();
  const purpose = useRef();
  const product = useRef();
  const remarks = useRef();

  const [successMessage, setSuccessMessage] = useState("");
  const [msgColor, setMsgColor] = useState("green");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (date !== null) {
      var dateNow = new Date(date);
      dateNow.setDate(dateNow.getDate() + 1);
      dateNow.toISOString().slice(0, 10);
      var data = {
        date: dateNow,
        coop_name: coopname.current.value,
        product: product.current.value,
        purpose: purpose.current.value,
        remarks: remarks.current.value,
        employeeId: localStorage.getItem("clmUserId"),
      };
      const newAccom = await createAccomplishment(data);
      if (newAccom.success) {
        setMsgColor("green");
        setSuccessMessage("Accomplishment added successfully");
        setDate(null);
        coopname.current.value = "";
        product.current.value = "";
        purpose.current.value = "";
        remarks.current.value = "";
        props.setReloadAccom(true);
      } else {
        setMsgColor("red");
        setSuccessMessage("An error occured");
        setDate(null);
        coopname.current.value = "";
        product.current.value = "";
        purpose.current.value = "";
        remarks.current.value = "";
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
                coopname.current.value = "";
                purpose.current.value = "";
                product.current.value = "";
                remarks.current.value = "";
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
              Add New Weekly Accomplishment
            </h3>
            <div className="mx-24">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Pick date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div>
              <input
                type="coopname"
                name="coopname"
                id="cooname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Name of Coop"
                required
                ref={coopname}
              />
            </div>
            <div>
              <input
                type="products"
                name="products"
                id="products"
                placeholder="Products"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                ref={product}
              />
            </div>
            <div className="flex flex-col ">
              <textarea
                type="text"
                name=""
                placeholder="Purpose"
                className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm h-18"
                id=""
                required
                ref={purpose}
              ></textarea>
            </div>
            <div className="flex flex-col ">
              <textarea
                type="text"
                name=""
                placeholder="Remarks"
                className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm h-18"
                id=""
                required
                ref={remarks}
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white w-full flex justify-center font-bold items-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br rounded-lg text-lg px-3 py-2 text-center"
            >
              Add
            </button>
            <button
              type="submit"
              className="text-white w-full flex justify-center font-bold items-center bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br rounded-lg text-lg px-3 py-2 text-center"
            >
              Delete
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

export default AddAccomplishment;
