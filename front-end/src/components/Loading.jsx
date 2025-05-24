import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({ size }) {
  return (
    <div className="flex justify-center h-[85vh] items-center col-span-6">
      <ClipLoader className="" color="#3b82f6" size={size} />
    </div>
  );
}
