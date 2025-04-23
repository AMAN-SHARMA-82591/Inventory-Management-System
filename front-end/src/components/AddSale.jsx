import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import axiosInstance from "./AxiosInstance";
import { handleError } from "./ErrorHandler";
import { toastSuccess } from "./ToastContainer";

export default function AddSale({ addSaleModalSetting, handlePageUpdate }) {
  const [sale, setSale] = useState({
    product_id: "",
    store_id: "",
    quantity: "",
    sales_date: "",
    total_amount: "",
  });
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    fetchProductsData();
    fetchStoresData();
  }, []);

  // Handling Input Change for input fields
  const handleInputChange = (key, value) => {
    setSale({ ...sale, [key]: value });
  };

  // Fetching Data of All Products
  const fetchProductsData = async () => {
    try {
      const response = await axiosInstance.get("/product");
      if (response.data) {
        setAllProducts(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Fetching Data of All Stores
  const fetchStoresData = async () => {
    try {
      const response = await axiosInstance.get("/store");
      if (response.data) {
        setAllStores(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const addSale = async () => {
    try {
      const response = await axiosInstance.post("/sale", sale);
      if (response.data) {
        toastSuccess("New Sale Added");
        handlePageUpdate();
        addSaleModalSetting();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg overflow-y-scroll">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="w-full flex items-center mb-4">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <h1 className="text-lg ml-2 py-4 font-semibold leading-6 text-gray-900 ">
                      Add Sale
                    </h1>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                    <form action="#">
                      <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="product_id"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Product Name
                          </label>
                          <select
                            id="product_id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            name="product_id"
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                          >
                            <option selected="">Select Products</option>
                            {products.map((element) => {
                              return (
                                <option key={element.id} value={element.id}>
                                  {element.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="quantity"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Stock Sold
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            value={sale.quantity}
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="0 - 999"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="store_id"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Store Name
                          </label>
                          <select
                            id="store_id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            name="store_id"
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                          >
                            <option selected="">Select Store</option>
                            {stores.map((element) => {
                              return (
                                <option key={element.id} value={element.id}>
                                  {element.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="total_amount"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Total Sale Amount
                          </label>
                          <input
                            type="number"
                            name="total_amount"
                            id="price"
                            value={sale.total_amount}
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="$299"
                          />
                        </div>
                        <div className="h-fit w-fit">
                          {/* <Datepicker
                              onChange={handleChange}
                              show={show}
                              setShow={handleClose}
                            /> */}
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900"
                            htmlFor="salesDate"
                          >
                            Sales Date
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            type="date"
                            id="sales_date"
                            name="sales_date"
                            value={sale.sales_date}
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto cursor-pointer"
                    onClick={addSale}
                  >
                    Add Sale
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                    onClick={() => addSaleModalSetting()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
