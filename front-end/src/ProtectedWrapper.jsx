import AuthContext from "./AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router";

function ProtectedWrapper({ children }) {
  const { user } = useContext(AuthContext);
  if (!user.id) {
    return <Navigate replace to="/login" />;
  }
  return children;
}
export default ProtectedWrapper;
