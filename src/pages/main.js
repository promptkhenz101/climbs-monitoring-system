import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Login from "./login/login";
import Employees from "./employees/employees";
import Settings from "./settings/settings";
import Accomplishment from "./accomplishment/accomplishment";
import Monitoring from "./monitoring/monitoring";
import Reports from "./reports/reports";
import Print from "../print/Printreport";
import Printacc from "../print/printAccomplisment";
import PrivateRoute from "../privateroute/privateroute";
import { getJwtStorage } from "../services/localstorage";

const Main = () => {
  const [userId, setUserId] = useState(null);
  const [forPrint, setForPrint] = useState([]);
  const [forPrintReport, setForPrintReport] = useState([]);

  const setStates = async () => {
    const currentUser = getJwtStorage();
    setUserId(currentUser.clmUserId);
  };

  useEffect(() => {
    setStates();
  }, [userId]);

  return (
    <div className="main-wrapper h-screen">
      <div className="main-body">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/employees"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/accomplishment"
            element={
              <PrivateRoute>
                <Accomplishment setForPrint={setForPrint} />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/monitoring"
            element={
              <PrivateRoute>
                <Monitoring />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/reports"
            element={
              <PrivateRoute>
                <Reports setForPrint={setForPrintReport} />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/print"
            element={
              <PrivateRoute>
                <Print forPrint={forPrintReport} />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/printaccomplishment"
            element={
              <PrivateRoute>
                <Printacc forPrint={forPrint} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
