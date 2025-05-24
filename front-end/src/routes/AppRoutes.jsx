import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Loading from "../components/Loading";

const Loadable = (Component) => {
  const DynamicComponent = (props) => {
    return (
      <Suspense fallback={<Loading size={48} />}>
        <Component {...props} />
      </Suspense>
    );
  };
  return DynamicComponent;
};

const Login = Loadable(lazy(() => import("../pages/Login")));
const Sales = Loadable(lazy(() => import("../pages/Sales")));
const Store = Loadable(lazy(() => import("../pages/Store")));
const Register = Loadable(lazy(() => import("../pages/Register")));
const Layout = Loadable(lazy(() => import("../components/Layout")));
const Inventory = Loadable(lazy(() => import("../pages/Inventory")));
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const NoPageFound = Loadable(lazy(() => import("../pages/NoPageFound")));
const ProtectedWrapper = Loadable(lazy(() => import("../ProtectedWrapper")));
const SupplierDirectory = Loadable(
  lazy(() => import("../pages/SupplierDirectory"))
);
const ProductCategory = Loadable(
  lazy(() => import("../pages/ProductCategory"))
);
const PurchaseOrder = Loadable(lazy(() => import("../pages/PurchaseOrder")));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedWrapper>
        <Layout />
      </ProtectedWrapper>
    ),
    errorElement: <NoPageFound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/sales",
        element: <Sales />,
      },
      {
        path: "/manage-store",
        element: <Store />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/purchase",
        element: <PurchaseOrder />,
      },
      {
        path: "/product-category",
        element: <ProductCategory />,
      },
      {
        path: "/supplier-directory",
        element: <SupplierDirectory />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
