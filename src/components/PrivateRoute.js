import React from "react";
import { Navigate, Route } from "react-router-dom";
import LocalStorage from "../helpers/Localstorage";
import PropType from "prop-types";
export default function PrivateRoute({ validator, element, Failure }) {
  return validator() ? element : Failure;
}

PrivateRoute.propTypes = {
  element: PropType.element,
  validator: PropType.func,
  Failure: PropType.element,
};
PrivateRoute.defaultProps = {
  validator: () => LocalStorage.get("token"),
  Failure: <Navigate to={"/login"} />,
};
