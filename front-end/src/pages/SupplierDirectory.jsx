import React, { useState, useEffect, useContext } from "react";
// import Spinner from "react-spinner";
import AddSupplierDetails from "../components/AddSupplierDetails";
import AuthContext from "../AuthContext";
import { handleError } from "../components/ErrorHandler";
import axiosInstance from "../components/AxiosInstance";
import ClipLoader from "react-spinners/ClipLoader";

function SupplierDirectory() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [supplierList, setSupplierList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchSupplierData();
  }, [updatePage]);

  // Fetching Data of All Purchase items
  const fetchSupplierData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/supplier");
      if (response.data) {
        setLoading(false);
        setSupplierList(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="grid grid-cols-1 col-span-12 lg:col-span-10 p-4 mt-16 md:mt-0">
      <div className=" flex flex-col gap-5">
        {showPurchaseModal && (
          <AddSupplierDetails
            addSaleModalSetting={addSaleModalSetting}
            // products={products}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Supplier Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addSaleModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Supplier
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Company Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Email Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Contact Person
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Address
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <ClipLoader color="#3b82f6" size={35} />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-gray-200">
                {supplierList.length > 0 ? (
                  supplierList.map((element) => {
                    return (
                      <tr key={element.id}>
                        <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                          {element.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {element.email}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {/* {new Date(element.PurchaseDate).toLocaleDateString() ==
                      new Date().toLocaleDateString()
                        ? "Today"
                        : element.PurchaseDate} */}
                          {element.contact_person}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {element.address}
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
        </div>
      </div>
    </div>
  );
}

export default SupplierDirectory;
