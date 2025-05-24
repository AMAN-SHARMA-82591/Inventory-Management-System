import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { handleError } from "../components/ErrorHandler";
import axiosInstance from "../components/AxiosInstance";
import AddPurchase from "../components/AddPurchase";

function PurchaseOrder() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchaseList, setPurchaseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatePage, setUpdatePage] = useState(true);

  useEffect(() => {
    fetchSupplierData();
  }, [updatePage]);

  const fetchSupplierData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/purchase");
      if (response.data) {
        setLoading(false);
        setPurchaseList(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const addPurchaseModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="grid grid-cols-1col-span-12 lg:col-span-10 mt-16 md:mt-0 p-4">
      <div className=" flex flex-col gap-5">
        {showPurchaseModal && (
          <AddPurchase
            addPurchaseModalSetting={addPurchaseModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Purchase Orders</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addPurchaseModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Purchase
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Supplier Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Store Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Quantity
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Cost
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Purchase Date
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <ClipLoader color="#3b82f6" size={35} />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-gray-200">
                {purchaseList.length > 0 ? (
                  purchaseList.map((element) => {
                    return (
                      <tr key={element.id}>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                          {element.product_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                          {element.supplier_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                          {element.store_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                          {element.quantity}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                          {element.total_cost + " $"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                          {new Date(element.purchase_date).toDateString()}
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

export default PurchaseOrder;
