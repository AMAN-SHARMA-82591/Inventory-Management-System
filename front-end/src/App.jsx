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
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  useEffect(() => {
    let myLoginToken = JSON.parse(localStorage.getItem("user"));
    if (myLoginToken) {
      setUser(myLoginToken);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

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

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  let value = { user, darkMode, signin, signout, toggleDarkMode };

  if (loading) return <Loading size={75} />;
  return (
    <AuthContext.Provider value={value}>
      <AppRoutes userId={user?.id} />
      <ToastContainer
        position="bottom-right"
        autoClose={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        theme={darkMode ? "dark" : "light"}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}

export default App;
