
import React, { useState } from "react";
import { createTicket } from "../../../services/createTask.service";
import { FormData } from "../../../interfaces/ticket.types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = import.meta.env.VITE_DOMAIN_URL;

export default function Example() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    description: "",
  });
  const [errorsFormData, setErrorsFormData] = useState<Partial<FormData>>({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorsFormData((prevData) => ({
      ...prevData,
      [name]: "",
    }));
  };

  const showSuccessToast = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const errors: Partial<FormData> = {};
      if (formData.name === "") {
        errors.name = "required";
      }
      if (formData.email === "") {
        errors.email = "required";
      } else {
        if (!emailRegex.test(formData.email)) {
          errors.email = "email not valid";
        }
      }

      if (formData.description == "") {
        errors.description = "required";
      }
      setErrorsFormData(errors);

      if (Object.keys(errors).length > 0) {
        return;
      }
      await createTicket(`${url}/ticket/create`, formData);
      showSuccessToast("Ticket successfully submitted.");
      setFormData({
        name: "",
        email: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create Ticket
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="username"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 placeholder:px-1"
                    placeholder="name"
                  />
                </div>
                {"name" in errorsFormData ? (
                  <span className="text-red-600">
                    {errorsFormData["name"]}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="email"
                    id="username"
                    onChange={handleChange}
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
                {"email" in errorsFormData ? (
                  <span className="text-red-600">
                    {errorsFormData["email"]}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="description"
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              {"description" in errorsFormData ? (
                <span className="text-red-600">{errorsFormData["description"]}</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
