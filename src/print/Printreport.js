import React, { forwardRef, useRef } from "react";
import { Link } from "react-router-dom";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const ComponentToPrint = forwardRef((props, ref) => {
  return (
    <div className="" ref={ref}>
      {" "}
      <div className="relative overflow-x-auto  sm:rounded-lg mt-10">
        <div className="grid grid-cols-2 text-2xl ml-6 mb-6 mt-4 font-semibold">
          <h1>
            ITINERARY REPORT
            <p className="text-sm">(For the ASM's,RSM's, GAMS's,AM's, BDO)</p>
          </h1>
          <div className="justify-self-end pr-12 row-span-4">
            <img
              src="https://i.imgur.com/0wNbS5N.png"
              alt="climbs icon"
              className=" h-28 w-26 pr-28"
            />
          </div>
          <div className="grid grid-cols-2 text-lg w-96">
            <h6 className="pt-3">Date of Submission:</h6>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "26ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                className="font-bold text-base justify-self-start "
                id="standard-basic"
                placeholder="MM/DD/YY"
                variant="standard"
              />
            </Box>
          </div>
          <div className="grid grid-cols-2 text-lg w-96">
            <h6 className="pt-3">Inclusive Date:</h6>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "38ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                className="font-bold text-base justify-self-start w-94"
                id="standard-basic"
                placeholder="MM/DD/YY - MM/DD/YY"
                variant="standard"
              />
            </Box>
          </div>
          <div className="grid grid-cols-2 text-lg w-96">
            <h6 className="pt-3">To:</h6>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "38ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                className="font-bold text-base justify-self-start w-94"
                id="standard-basic"
                placeholder="Name and Position"
                variant="standard"
              />
            </Box>
          </div>
        </div>
        <div className="pl-28">
          <table className=" w-11/12 text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-white uppercase bg-blue-600 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Activity
                </th>

                <th scope="col" className="px-6 py-3">
                  Purpose
                </th>
                <th scope="col" className="px-6 py-3">
                  Expected Output
                </th>
                <th scope="col" className="px-6 py-3">
                  Resources
                </th>
              </tr>
            </thead>
            <tbody>
              {props.forPrint.map((value, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b  odd:bg-white even:bg-gray-50 "
                  >
                    <td className="px-6 py-4">{value.attributes.date}</td>
                    <td className="px-6 py-4">{value.attributes.activity}</td>
                    <td className="px-6 py-4">{value.attributes.purpose}</td>
                    <td className="px-6 py-4">{value.attributes.output}</td>
                    <td className="px-6 py-4">{value.attributes.product}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="report-summary ml-6 mt-2">
          <div className="rich-editor mb-5">
            <input
              type="text"
              id="messageA"
              className="block mb-2 p-2.5 w-full text-sm text-gray-700 bg-white border-none focus:border-0 active:border-0"
              placeholder="Title A"
            />
            <textarea
              id="message"
              rows="2"
              className="pl-5 block mb-2 p-2.5 w-full text-sm text-gray-700 bg-white border-none focus:border-0 active:border-0"
              placeholder="Content for A"
            ></textarea>
            <input
              type="text"
              id="messageB"
              className="block mb-2 p-2.5 w-full text-sm text-gray-700 bg-white border-none focus:border-0 active:border-0"
              placeholder="Title B"
            />
            <textarea
              id="message"
              rows="2"
              className="pl-5 block mb-2 p-2.5 w-full text-sm text-gray-700 bg-white border-none focus:border-0 active:border-0"
              placeholder="Content for A"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
});

const Print = (props) => {
  const ref = useRef();
  return (
    <div>
      <div>
        <div className="inline-block px-6 mx-6  my-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          <Link to="/reports">Back</Link>
        </div>
        <ReactToPrint content={() => ref.current}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <button
                className="inline-block px-6 mx-6 my-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={handlePrint}
              >
                Print
              </button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        <ComponentToPrint
          ref={ref}
          forPrint={props.forPrint}
          titleA={props.titleA.current.value}
          titleB={props.titleB.current.value}
          contentA={props.contentA.current.value}
          contentB={props.contentB.current.value}
        />
      </div>
    </div>
  );
};

export default Print;
