import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { ToastContainer } from "react-toastify";
import axiosInstance from "./components/AxiosInstance";
import AppRoutes from "./routes/AppRoutes";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let myLoginToken = JSON.parse(localStorage.getItem("user"));
    if (myLoginToken) {
      setUser(myLoginToken);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = async () => {
    setUser(null);
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("user");
    } catch (error) {
      console.error(error);
    }
  };

  let value = { user, signin, signout };

  if (loading) return <Loading size={75} />;

  return (
    <AuthContext.Provider value={value}>
      <AppRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        // theme={"dark"}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}

export default App;
