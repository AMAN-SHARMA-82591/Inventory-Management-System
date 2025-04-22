import React, { useState, useEffect, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Markdown from "react-markdown";
import AddCategory from "../components/AddCategory";
import AuthContext from "../AuthContext";
import { handleError } from "../components/ErrorHandler";
import axiosInstance from "../components/AxiosInstance";

function ProductCategory() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [supplierList, setSupplierList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchSupplierData();
  }, [updatePage]);

  const fetchSupplierData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/category");
      if (response.data) {
        setTimeout(() => setLoading(false), 1500);
        setSupplierList(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const addCategoryModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddCategory
            addCategoryModalSetting={addCategoryModalSetting}
            // products={products}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Category List</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addCategoryModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Category
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Description
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td colSpan="2" className="text-center py-4">
                    <ClipLoader color="#3b82f6" size={35} />
                    {/* loading */}
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-gray-200">
                {supplierList.map((element) => {
                  return (
                    <tr key={element.id}>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                        {element.name}
                      </td>
                      <td className="px-4 py-2 text-gray-700 break-words max-w-[300px]">
                        <Markdown>{element.description}</Markdown>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductCategory;
