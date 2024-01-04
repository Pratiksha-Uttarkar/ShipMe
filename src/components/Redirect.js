import { useEffect } from "react";
export function Redirect({ url }) {
  useEffect(() => {
    window.location.href = url;
  }, []);
  return null;
}
