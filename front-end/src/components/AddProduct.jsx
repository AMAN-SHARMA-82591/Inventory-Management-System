import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import axiosInstance from "./AxiosInstance";
import { handleError } from "./ErrorHandler";
import { toastSuccess } from "./ToastContainer";

export default function AddProduct({
  addProductModalSetting,
  handlePageUpdate,
}) {
  const [product, setProduct] = useState({
    name: "",
    price: 0.0,
    quantity: 0,
    category_id: null,
    supplier_id: null,
    description: "",
  });
  const [open, setOpen] = useState(true);
  const [suppliers, setAllSuppliers] = useState([]);
  const [categories, setAllCategories] = useState([]);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    fetchSupplierData();
    fetchCategoryData();
  }, []);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const fetchSupplierData = async () => {
    try {
      const response = await axiosInstance.get("/supplier");
      if (response.data) {
        setAllSuppliers(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axiosInstance.get("/category");
      if (response.data) {
        setAllCategories(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const addProduct = async () => {
    try {
      const response = await axiosInstance.post("/product", product);
      if (response.data) {
        toastSuccess("New product added successfully!");
        handlePageUpdate();
        addProductModalSetting();
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="w-full flex items-center mb-4">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <h1 className="text-lg ml-2 py-4 font-semibold leading-6 text-gray-900 ">
                      Add Product
                    </h1>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                    <form action="#">
                      <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={product.name}
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Ex. Apple iMac 27&ldquo;"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="category_id"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Category Name
                          </label>
                          <select
                            id="category_id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            name="category_id"
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                          >
                            <option selected="">Select Category</option>
                            {categories.map((element) => {
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
                            htmlFor="supplier_id"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Supplier Name
                          </label>
                          <select
                            id="supplier_id"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            name="supplier_id"
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                          >
                            <option selected="">Select Supplier</option>
                            {suppliers.map((element) => {
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
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            value={product.price}
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="$299"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="quantity"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Quantity
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            value={product.quantity}
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="0 - 999"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            rows="5"
                            name="description"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Write a description..."
                            value={product.description}
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                          >
                            Standard glass, 3.8GHz 8-core 10th-generation Intel
                            Core i7 processor, Turbo Boost up to 5.0GHz, 16GB
                            2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of
                            GDDR6 memory, 256GB SSD storage, Gigabit Ethernet,
                            Magic Mouse 2, Magic Keyboard - US
                          </textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto cursor-pointer"
                    onClick={addProduct}
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                    onClick={() => addProductModalSetting()}
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
