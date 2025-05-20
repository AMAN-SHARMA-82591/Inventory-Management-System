import AuthContext from "./AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router";

function ProtectedWrapper(props) {
  const auth = useContext(AuthContext);
  if (!auth.user) {
    return <Navigate replace to="/login" />;
  }

  return props.children;
}
export default ProtectedWrapper;
