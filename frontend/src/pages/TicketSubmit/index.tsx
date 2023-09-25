import React, { useState } from "react";
import { FormData, PartialFormData } from "../../interfaces/ticket.types";
import { createTicket } from "../../services/createTask.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateTicket from "../../component/CreateTicket";
import { showLoading, showSuccessToast, url } from "../../helpers";

const SupportTicketForm: React.FC = () => {
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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const errors: PartialFormData = {};
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

    if (Object.keys(errors).length == 0) {
      showLoading("Processing");
      createTicket(`${url}/ticket/create`, formData)
        .then((res) => {
          if (res.status == 201) {
            showSuccessToast("ticket successfully created!");
            setFormData({
              name: "",
              email: "",
              description: "",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("something went wrong")
        });
    }
  };

  return (
    <>
      <CreateTicket
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errorsFormData={errorsFormData}
      />
    </>
  );
};

export default SupportTicketForm;

