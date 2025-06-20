import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({ size }) {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white dark:bg-gray-900 transition-colors duration-300 fixed inset-0 z-50">
      <ClipLoader color="#3b82f6" size={size} />
    </div>
  );
}
