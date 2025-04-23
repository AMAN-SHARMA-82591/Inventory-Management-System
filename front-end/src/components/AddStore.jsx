import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
// import UploadImage from "./UploadImage";
import { handleError } from "./ErrorHandler";
import axiosInstance from "./AxiosInstance";
import { toastSuccess } from "./ToastContainer";

export default function AddStore({ handlePageUpdate }) {
  // const authContext = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    location: "",
    manager: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const addProduct = async () => {
    try {
      const response = await axiosInstance.post("/store", form);
      if (response.data) {
        toastSuccess("New Store added");
        setOpen(false);
        handlePageUpdate();
      }
    } catch (error) {
      handleError(error);
    }
  };

  // // Uploading image to cloudinary
  // const uploadImage = async (image) => {
  //   const data = new FormData();
  //   data.append("file", image);
  //   data.append("upload_preset", "inventoryapp");

  //   await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
  //     method: "POST",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setForm({ ...form, image: data.url });
  //       alert("Store Image Successfully Uploaded");
  //     })
  //     .catch((error) => console.log(error));
  // };

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
                      Supplier Details
                    </h1>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                    <form action="#">
                      <div className="grid gap-4 mt-6 mb-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Store Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Enter Store Name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="manager"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Manager Name
                          </label>
                          <input
                            type="text"
                            name="manager"
                            id="manager"
                            value={form.manager}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Enter Manager Name"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="location"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            location
                          </label>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            value={form.location}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Enter Location"
                          />
                        </div>
                        {/* <div>
                            <label
                              htmlFor="category"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Category
                            </label>
                            <select
                              id="category"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  category: e.target.value,
                                })
                              }
                            >
                              <option selected="" value="Electronics">
                                Electronics
                              </option>
                              <option value="Groceries">Groceries</option>
                              <option value="Wholesale">WholeSale</option>
                              <option value="SuperMart">SuperMart</option>
                              <option value="Phones">Phones</option>
                            </select>
                          </div> */}
                        {/* <div className="sm:col-span-2">
                            <label
                              htmlFor="address"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Address
                            </label>
                            <textarea
                              id="address"
                              rows="5"
                              name="address"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                              placeholder="Write a address..."
                              value={form.address}
                              onChange={handleInputChange}
                            ></textarea>
                          </div> */}
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
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                    onClick={() => setOpen(false)}
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
