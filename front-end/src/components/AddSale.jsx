import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "./AxiosInstance";
import { handleError } from "./ErrorHandler";
import { toastSuccess } from "./ToastContainer";

export default function AddSale({ addSaleModalSetting, handlePageUpdate }) {
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    fetchProductsData();
    fetchStoresData();
  }, []);

  const fetchProductsData = async () => {
    try {
      const response = await axiosInstance.get("/product/input?filterQuantity=1");
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

  const fetchProductDetails = async (productId, setFieldValue) => {
    setFieldValue("quantity", 0);
    setFieldValue("total_amount", 0.0);
    if (!productId) {
      setProductDetails(null);
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/product/${productId}?fieldName=id,name,price,quantity`
      );
      if (response.data) {
        setProductDetails(response.data.result);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleCalculateSaleAmount = (quantity, setFieldValue) => {
    const unitPrice = productDetails?.price || 0;
    const totalAmount = unitPrice * quantity;

    // Update the total_amount field in Formik
    setFieldValue("total_amount", parseFloat(totalAmount.toFixed(2)));
  };

  const addSale = async (values) => {
    try {
      const response = await axiosInstance.post("/sale", values);
      if (response.data) {
        toastSuccess("New Sale Added");
        handlePageUpdate();
        addSaleModalSetting();
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    product_id: Yup.number().required("Product is required"),
    store_id: Yup.number().required("Store is required"),
    quantity: Yup.number()
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required")
      .test(
        "max-stock",
        () =>
          `Only ${productDetails?.quantity || 0} units are available in stock.`,
        (value) => {
          if (!productDetails?.quantity) return true; // Skip validation if no product is selected
          return value <= productDetails.quantity; // Validate against available stock
        }
      ),
    sales_date: Yup.date().required("Sales date is required"),
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg overflow-y-scroll">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="w-full flex items-center mb-4">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <h1 className="text-lg ml-2 py-4 font-semibold leading-6 text-gray-900">
                      Add Sale
                    </h1>
                  </div>
                  <Formik
                    initialValues={{
                      product_id: "",
                      store_id: "",
                      quantity: 0,
                      sales_date: "",
                      total_amount: 0.0,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={addSale}
                  >
                    {({
                      // values,
                      handleChange,
                      setFieldValue,
                    }) => (
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
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                              onChange={(e) => {
                                handleChange(e);
                                fetchProductDetails(
                                  e.target.value,
                                  setFieldValue
                                );
                              }}
                            >
                              <option value="">Select Products</option>
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
                              htmlFor="per_unit_price"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Per Unit Price
                            </label>
                            <Field
                              disabled
                              value={productDetails?.price || ""}
                              type="number"
                              name="per_unit_price"
                              id="per_unit_price"
                              className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                              placeholder="0$"
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
                              Stock Sold
                            </label>
                            <Field
                              type="number"
                              name="quantity"
                              id="quantity"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                              placeholder="0 - 999"
                              onChange={(e) => {
                                handleChange(e);
                                handleCalculateSaleAmount(
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
                              htmlFor="sales_date"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Sales Date
                            </label>
                            <Field
                              type="date"
                              name="sales_date"
                              id="sales_date"
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
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            />
                            <ErrorMessage
                              name="sales_date"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="total_amount"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Total Sale Amount
                            </label>
                            <Field
                              type="number"
                              name="total_amount"
                              id="total_amount"
                              disabled
                              className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                              placeholder="$299"
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
                            onClick={() => addSaleModalSetting()}
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
