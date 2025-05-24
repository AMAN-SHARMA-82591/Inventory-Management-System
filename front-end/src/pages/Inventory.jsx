import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import ClipLoader from "react-spinners/ClipLoader";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import searchIcon from "../assets/search-icon.png";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import axiosInstance from "../components/AxiosInstance";
import { toastSuccess } from "../components/ToastContainer";
import { handleError } from "../components/ErrorHandler";

function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [inventory, setInventoryData] = useState({});
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductsData();
    fetchOverallInventoryData();
  }, [updatePage]);

  // Fetching Data of All Products
  const fetchProductsData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/product?fieldName=all");
      if (response.data) {
        setLoading(false);
        setAllProducts(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Fetching Overall Inventory Data
  const fetchOverallInventoryData = async () => {
    try {
      const response = await axiosInstance.get("/product/overall-inventory");
      if (response.data) {
        setInventoryData(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const fetchSearchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/product?searchTerm=${searchTerm}`
      );
      if (response.data) {
        setAllProducts(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };

  // Modal for Product UPDATE
  const updateProductModalSetting = (selectedProductData) => {
    setUpdateProduct(selectedProductData);
    setShowUpdateModal(!showUpdateModal);
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      const response = await axiosInstance.delete(`/product/${id}`);
      if (response.data) {
        toastSuccess("Successfully deleted product");
        handlePageUpdate();
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="grid grid-cols-1 col-span-12 mt-16 md:mt-0 lg:col-span-10 p-4">
      <div className=" flex flex-col gap-5">
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Overall Inventory</span>
          <div className=" flex flex-col md:flex-row justify-center items-center  ">
            <div className="flex flex-col p-10  w-full  md:w-3/12  ">
              <span className="font-semibold text-blue-600 text-base">
                Total Products
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {inventory?.total_products ?? 0}
              </span>
              <span className="font-thin text-gray-400 text-xs">
                Last 30 days
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Stores
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {inventory?.revenue?.total_stores ?? 0}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Stores
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {inventory?.revenue?.total_revenue ?? 0} $
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Revenue
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-purple-600 text-base">
                Top Selling (Top-5)
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {inventory?.topSelling?.total_sold_items ?? 0}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Items Sold
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {inventory?.topSelling?.total_sales_value ?? 0} $
                  </span>
                  <span className="font-thin text-gray-400 text-xs">Cost</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Low Stocks
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {inventory?.not_in_stock ?? 0}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Not in Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateProduct
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
          />
        )}

        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Products</span>
              <div className="flex justify-center items-center px-2 py-0.5 border-2 rounded-md ">
                <img alt="search-icon" className="w-5 h-5" src={searchIcon} />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addProductModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Product
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Products
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Category Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <ClipLoader color="#3b82f6" size={35} />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-gray-200">
                {products.length > 0 ? (
                  products.map((element) => {
                    return (
                      <tr key={element.id}>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          {element.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {element.category_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {element.quantity || "Not in Stock"}
                        </td>
                        <td className="px-4 py-2 text-gray-700 break-words max-w-[300px]">
                          <Markdown>{element.description}</Markdown>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {element.price + " $"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          <button
                            disabled
                            className="text-green-700 disabled:text-gray-400"
                            onClick={() => updateProductModalSetting(element)}
                          >
                            <PencilIcon
                              className="h-5 w-5 text-red"
                              aria-hidden="true"
                            />{" "}
                          </button>
                          <button
                            disabled
                            className="text-red-600 px-2 disabled:text-gray-400"
                            onClick={() => deleteItem(element.id)}
                          >
                            <TrashIcon
                              className="h-5 w-5 text-red"
                              aria-hidden="true"
                            />
                          </button>
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

export default Inventory;
