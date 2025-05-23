import React, {
  useState,
  useEffect,
  //  useContext
} from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";
import axiosInstance from "../components/AxiosInstance";
import { handleError } from "../components/ErrorHandler";
// import locationIcon from "../assets/location-icon.png";
import ClipLoader from "react-spinners/ClipLoader";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  // const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching all stores data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/store");
      if (response.data) {
        setLoading(false);
        setAllStores(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showModal && <AddStore handlePageUpdate={handlePageUpdate} />}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Manage Store</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={modalSetting}
              >
                Add Store
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Store Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Manager Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Location
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    <ClipLoader color="#3b82f6" size={35} />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-gray-200">
                {stores.length > 0 ? (
                  stores.map((element) => {
                    return (
                      <tr key={element.id}>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                          {element.name && element.name}
                        </td>
                        <td className="px-4 py-2 text-gray-700">
                          {element.manager && element.manager}
                        </td>
                        <td className="px-4 py-2 text-gray-700 break-words max-w-[300px]">
                          {element.location && element.location}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
          {/* {stores.map((element, index) => {
              return (
                <div
                  className="bg-white w-50 h-fit flex flex-col gap-4 p-4 "
                  key={element._id}
                >
                  <div>
                    <img
                      alt="store"
                      className="h-60 w-full object-cover"
                      src={element.image}
                    />
                  </div>
                  <div className="flex flex-col gap-3 justify-between items-start">
                    <span className="font-bold">{element.name}</span>
                    <div className="flex">
                      <img
                        alt="location-icon"
                        className="h-6 w-6"
                        src={locationIcon}
                      />
                      <span>{element.address + ", " + element.city}</span>
                    </div>
                  </div>
                </div>
              );
            })} */}
        </div>
      </div>
    </div>
  );
}

export default Store;
