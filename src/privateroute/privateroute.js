import React from "react";
import { Navigate } from "react-router-dom";
import { getJwtStorage } from "../services/localstorage";

const PrivateRoute = (props) => {
  const { children } = props;

  var localData = getJwtStorage();
  var userLogggedIn =
    localData.clmJwt !== null &&
    localData.clmUserId !== null &&
    localData.clmName !== null;

  return userLogggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
