import { useContext } from "react";
import { NavLink } from "react-router";
import { truncate } from "lodash";
import {
  HomeIcon,
  UserGroupIcon,
  Squares2X2Icon,
  UserCircleIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  ClipboardDocumentIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";

function SideMenu() {
  const { user } = useContext(AuthContext);

  return (
    <div className="h-full flex-col justify-between bg-white hidden md:flex fixed">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
                isActive
                  ? "text-blue-400 bg-blue-50"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
              }`
            }
          >
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Dashboard</span>
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
                isActive
                  ? "text-blue-400 bg-blue-50"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
              }`
            }
          >
            <ClipboardDocumentIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Inventory</span>
          </NavLink>
          <NavLink
            to="/product-category"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
                isActive
                  ? "text-blue-400 bg-blue-50"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
              }`
            }
          >
            <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Product Category</span>
          </NavLink>
          <NavLink
            to="/supplier-directory"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
                isActive
                  ? "text-blue-400 bg-blue-50"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
              }`
            }
          >
            <UserGroupIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Supplier Directory</span>
          </NavLink>
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
                isActive
                  ? "text-blue-400 bg-blue-50"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
              }`
            }
          >
            <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Sales</span>
          </NavLink>
          <NavLink
            to="/purchase"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
                isActive
                  ? "text-blue-400 bg-blue-50"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
              }`
            }
          >
            <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Purchase Orders</span>
          </NavLink>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-blue-500">
              <NavLink
                to="/manage-store"
                className={({ isActive }) =>
                  `flex items-center gap-2 ${
                    isActive
                      ? "text-blue-400"
                      : "text-gray-500 hover:text-blue-500"
                  }`
                }
              >
                <BuildingStorefrontIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">Manage Store</span>
              </NavLink>
            </summary>
          </details>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <UserCircleIcon className="h-6 w-6" aria-hidden="true" />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">
                {truncate(user?.username, { length: 20 })}
              </strong>
              <span> {truncate(user?.email, { length: 20 })} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
