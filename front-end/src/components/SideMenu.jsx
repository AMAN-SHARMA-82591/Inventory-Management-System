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
    <div className="h-full flex-col justify-between bg-white dark:bg-gray-800 hidden md:flex fixed transition-colors duration-300">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                isActive
                  ? "text-blue-400 bg-blue-50 dark:bg-gray-700 dark:text-blue-300"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
              }`
            }
          >
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Dashboard</span>
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                isActive
                  ? "text-blue-400 bg-blue-50 dark:bg-gray-700 dark:text-blue-300"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
              }`
            }
          >
            <ClipboardDocumentIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Inventory</span>
          </NavLink>
          <NavLink
            to="/product-category"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                isActive
                  ? "text-blue-400 bg-blue-50 dark:bg-gray-700 dark:text-blue-300"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
              }`
            }
          >
            <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Product Category</span>
          </NavLink>
          <NavLink
            to="/supplier-directory"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                isActive
                  ? "text-blue-400 bg-blue-50 dark:bg-gray-700 dark:text-blue-300"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
              }`
            }
          >
            <UserGroupIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Supplier Directory</span>
          </NavLink>
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                isActive
                  ? "text-blue-400 bg-blue-50 dark:bg-gray-700 dark:text-blue-300"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
              }`
            }
          >
            <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Sales</span>
          </NavLink>
          <NavLink
            to="/purchase"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                isActive
                  ? "text-blue-400 bg-blue-50 dark:bg-gray-700 dark:text-blue-300"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
              }`
            }
          >
            <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Purchase Orders</span>
          </NavLink>
          <NavLink
            to="/manage-store"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                isActive
                  ? "text-blue-400 bg-blue-50 dark:bg-gray-700 dark:text-blue-300"
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
              }`
            }
          >
            <BuildingStorefrontIcon className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-medium">Manage Store</span>
          </NavLink>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          <UserCircleIcon
            className="h-6 w-6 dark:text-white"
            aria-hidden="true"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium dark:text-white">
                {truncate(user?.username, { length: 20 })}
              </strong>
              <span className="dark:text-gray-400">
                {" "}
                {truncate(user?.email, { length: 20 })}{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
