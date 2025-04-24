import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import axiosInstance from "./AxiosInstance";
import { toastSuccess } from "./ToastContainer";
import { handleError } from "./ErrorHandler";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddPurchase({
  addPurchaseModalSetting,
  handlePageUpdate,
}) {
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [suppliers, setAllSuppliers] = useState([]);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    fetchProductsData();
    fetchStoresData();
    fetchSupplierData();
  }, []);

  const fetchProductsData = async () => {
    try {
      const response = await axiosInstance.get(
        "/product/input?filterQuantity=0"
      );
      if (response.data) {
        setAllProducts(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

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

  const addPurchase = async (values) => {
    const { unit_cost, ...entities } = values;
    try {
      if (unit_cost < 0) return;
      const response = await axiosInstance.post("/purchase", entities);
      if (response.data) {
        toastSuccess("Purchase details added successfully!");
        handlePageUpdate();
        addPurchaseModalSetting();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdatePurchaseAmount = (unitCost, quantity, setFieldValue) => {
    const totalCost = unitCost * quantity;
    setFieldValue("total_cost", totalCost);
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    product_id: Yup.number().required("Product is required"),
    supplier_id: Yup.number().required("Supplier is required"),
    store_id: Yup.number().required("Store is required"),
    quantity: Yup.number()
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required"),
    purchase_date: Yup.date()
      .required("Purchase date is required")
      .max(new Date(), "Purchase date cannot be in the future"),
    total_cost: Yup.number()
      .min(1, "Total cost must be greater than 0")
      .required("Total cost is required"),
    unit_cost: Yup.number().min(1, "Total cost must be greater than 0"),
  });

  return (
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
              leaveFrom="opacity-100 sm:scale-100"
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
                      Add Purchase
                    </h1>
                  </div>
                  <Formik
                    initialValues={{
                      product_id: "",
                      supplier_id: "",
                      store_id: "",
                      quantity: 0,
                      purchase_date: "",
                      total_cost: 0.0,
                      unit_cost: 0.0,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={addPurchase}
                  >
                    {({ values, handleChange, setFieldValue }) => (
                      <Form>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="product_id"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Product Name
                            </label>
                            <Field
                              as="select"
                              id="product_id"
                              name="product_id"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                              <option value="">Select Product</option>
                              {products.map((element) => (
                                <option key={element.id} value={element.id}>
                                  {element.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="product_id"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="supplier_id"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Supplier Name
                            </label>
                            <Field
                              as="select"
                              id="supplier_id"
                              name="supplier_id"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                              <option value="">Select Supplier</option>
                              {suppliers.map((element) => (
                                <option key={element.id} value={element.id}>
                                  {element.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="supplier_id"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="store_id"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Store Name
                            </label>
                            <Field
                              as="select"
                              id="store_id"
                              name="store_id"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                              <option value="">Select Store</option>
                              {stores.map((element) => (
                                <option key={element.id} value={element.id}>
                                  {element.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="store_id"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="quantity"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Stock Purchased
                            </label>
                            <Field
                              type="number"
                              name="quantity"
                              id="quantity"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="0 - 999"
                              onChange={(e) => {
                                handleChange(e);
                                handleUpdatePurchaseAmount(
                                  values.unit_cost,
                                  e.target.value,
                                  setFieldValue
                                );
                              }}
                            />
                            <ErrorMessage
                              name="quantity"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="unit_cost"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Unit Cost
                            </label>
                            <Field
                              type="number"
                              name="unit_cost"
                              id="unit_cost"
                              onChange={(e) => {
                                handleChange(e);
                                handleUpdatePurchaseAmount(
                                  e.target.value,
                                  values.quantity,
                                  setFieldValue
                                );
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Eg: 999$"
                            />
                            <ErrorMessage
                              name="unit_cost"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="total_cost"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Total Purchase Amount
                            </label>
                            <Field
                              type="number"
                              name="total_cost"
                              id="total_cost"
                              disabled
                              className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="$299"
                            />
                            <ErrorMessage
                              name="total_cost"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900"
                              htmlFor="purchase_date"
                            >
                              Purchase Date
                            </label>
                            <Field
                              type="date"
                              id="purchase_date"
                              name="purchase_date"
                              min={
                                new Date(
                                  new Date().setFullYear(
                                    new Date().getFullYear() - 1
                                  )
                                )
                                  .toISOString()
                                  .split("T")[0]
                              }
                              max={new Date().toISOString().split("T")[0]}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                            <ErrorMessage
                              name="purchase_date"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto cursor-pointer"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                            onClick={() => addPurchaseModalSetting()}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
