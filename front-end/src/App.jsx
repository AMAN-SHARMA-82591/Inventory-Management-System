import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { jwtDecode } from "jwt-decode";
import Login from "./pages/Login";
import Sales from "./pages/Sales";
import Store from "./pages/Store";
import AuthContext from "./AuthContext";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import NoPageFound from "./pages/NoPageFound";
import ProtectedWrapper from "./ProtectedWrapper";
import SupplierDirectory from "./pages/SupplierDirectory";
import { ToastContainer } from "react-toastify";
import ProductCategory from "./pages/ProductCategory";
import ClipLoader from "react-spinners/ClipLoader";
import PurchaseOrder from "./pages/PurchaseOrder";

function App() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let myLoginToken = localStorage.getItem("user");
    if (myLoginToken) {
      myLoginToken = jwtDecode(myLoginToken);
      setUser(myLoginToken);
    } else {
      setUser("");
    }
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const signin = (newUser, callback) => {
    const decodedToken = jwtDecode(newUser);
    setUser(decodedToken);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout };

  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader color="#3b82f6" size={70} />
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/manage-store" element={<Store />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="purchase" element={<PurchaseOrder />} />
            <Route path="/product-category" element={<ProductCategory />} />
            <Route path="/supplier-directory" element={<SupplierDirectory />} />
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
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
