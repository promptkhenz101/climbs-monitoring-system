import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { GoThreeBars } from "react-icons/go";
import Datepicker from "../../components/datapicker/datepicker";
import { getReports } from "../../services/reports";
import { getAccomplishments } from "../../services/accomplishment";
import { getUser } from "../../services/users";
import { getPosition } from "../../services/position";
import { useNavigate } from "react-router-dom";

const Monitoring = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [accomList, setAccomList] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [reportUserList, setReportUserList] = useState([]);
  const [accomUserList, setAccomUserList] = useState([]);

  var dateNow = new Date();
  // dateNow.setDate(dateNow.getDate() + 1);
  var d1 = dateNow.toISOString().split("T")[0];
  const [reportDate, setReportDate] = useState([d1, d1]);
  const [accomDate, setAccomDate] = useState([d1, d1]);

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
    fetchReports();
    fetchAccomplishments();
  }, [reportDate, accomDate]);

  const fetchReports = async () => {
    const report = await getReports(reportDate);
    if (report.success) {
      var rep = report.data.data;
      var tempUser = [];
      for (var x = 0; x < rep.length; x++) {
        const user = await getUser(rep[x].attributes.employeeId);
        if (user.success) {
          const position = await getPosition(user.data.id);
          if (position.success) {
            tempUser.push({
              name: user.data.name,
              position: position.data.data.attributes.title,
            });
          }
        }
      }
      setReportList(rep);
      setReportUserList(tempUser);
    }
  };

  const fetchAccomplishments = async () => {
    const accom = await getAccomplishments(accomDate);
    if (accom.success) {
      var acc = accom.data.data;
      var tempUser = [];
      for (var x = 0; x < acc.length; x++) {
        const user = await getUser(acc[x].attributes.employeeId);
        if (user.success) {
          const position = await getPosition(user.data.id);
          if (position.success) {
            tempUser.push({
              name: user.data.name,
              position: position.data.data.attributes.title,
            });
          }
        }
      }
      setAccomList(acc);
      setAccomUserList(tempUser);
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
              Employee Monitoring
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
        <div className="monitoring-tables  justify-between p-4 bg-white mt-3 rounded-xl shadow-lg gap-3">
          <div className="my-5 font-bold">
            <h1>Itinererary Report</h1>
          </div>
          <div className="justify-self-start">
            <div className="mb-3">
              <Datepicker setDate={setReportDate} date={reportDate} />
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-black ">
              <thead className="text-xs text-white uppercase bg-blue-600   ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Activities(Name of coops/non coops)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Purpose
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Expected Output
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportList.map((value, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b odd:bg-white even:bg-yellow-200"
                    >
                      <td className="px-6 py-4">
                        {reportUserList[index].name}
                      </td>
                      <td className="px-6 py-4">
                        {reportUserList[index].position}
                      </td>
                      <td className="px-6 py-4">{value.attributes.date}</td>
                      <td className="px-6 py-4">{value.attributes.activity}</td>
                      <td className="px-6 py-4">{value.attributes.product}</td>
                      <td className="px-6 py-4">{value.attributes.purpose}</td>
                      <td className="px-6 py-4">{value.attributes.output}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="my-5 font-bold border-t">
            <h1 className="my-5">Weekly Accomplishment</h1>
          </div>
          <div className="mb-3">
            <Datepicker setDate={setAccomDate} date={accomDate} />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-black ">
              <thead className="text-xs text-white uppercase bg-blue-600  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name of coops
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Purpose
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Remarks/ Feedbacks
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
                      <td className="px-6 py-4">{accomUserList[index].name}</td>
                      <td className="px-6 py-4">
                        {accomUserList[index].position}
                      </td>
                      <td className="px-6 py-4">{value.attributes.date}</td>
                      <td className="px-6 py-4">
                        {value.attributes.coop_name}
                      </td>
                      <td className="px-6 py-4">{value.attributes.product}</td>
                      <td className="px-6 py-4">{value.attributes.purpose}</td>
                      <td className="px-6 py-4">{value.attributes.remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Monitoring;
