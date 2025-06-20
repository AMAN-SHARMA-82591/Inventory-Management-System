import { useContext } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";

export default function SwitchDarkMode({ absolute }) {
  const authContext = useContext(AuthContext);
  return (
    <button
      type="button"
      onClick={authContext.toggleDarkMode}
      className={
        absolute
          ? "absolute top-5 right-10 cursor-pointer mx-2 rounded-full dark:bg-gray-800 p-1"
          : "cursor-pointer mx-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
      }
    >
      {authContext.darkMode ? (
        <SunIcon
          className={`h-6 w-6 ${!!absolute && "text-gray-400"}`}
          aria-hidden="true"
        />
      ) : (
        <MoonIcon
          className={`h-6 w-6 ${!!absolute && "text-gray-600"}`}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
