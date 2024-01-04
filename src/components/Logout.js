import { useEffect } from "react";
import LocalStorage from "../helpers/Localstorage";
import { Redirect } from "./Redirect";
export default function Logout() {
  useEffect(() => {
    LocalStorage.remove("token");
  }, []);

  return <Redirect url="/" />;
}
