import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";
import Loading from "../components/Loading";

const Login = lazy(() => import("../pages/Login"));
const Sales = lazy(() => import("../pages/Sales"));
const Store = lazy(() => import("../pages/Store"));
const Register = lazy(() => import("../pages/Register"));
const Layout = lazy(() => import("../components/Layout"));
const Inventory = lazy(() => import("../pages/Inventory"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NoPageFound = lazy(() => import("../pages/NoPageFound"));
// const ProtectedWrapper = lazy(() => import("../ProtectedWrapper"));
const SupplierDirectory = lazy(() => import("../pages/SupplierDirectory"));
const ProductCategory = lazy(() => import("../pages/ProductCategory"));
const PurchaseOrder = lazy(() => import("../pages/PurchaseOrder"));

function AppRoutes({ userId }) {
  return (
    <Suspense fallback={<Loading size={48} />}>
      <Routes>
        {!userId ? (
          <>
            <Route path="/*" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/manage-store" element={<Store />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchase" element={<PurchaseOrder />} />
            <Route path="/product-category" element={<ProductCategory />} />
            <Route path="/supplier-directory" element={<SupplierDirectory />} />
            <Route path="*" element={<NoPageFound />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
}
export default AppRoutes;
