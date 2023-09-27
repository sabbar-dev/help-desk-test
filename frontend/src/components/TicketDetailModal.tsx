import React, { Fragment, useState } from "react";
import { TicketResponseData } from "../interfaces/ticket.types";
import { updateTicketStatus } from "../services/createTask.service";
import { Dialog } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "./Dropdown";
import Spinner from "./Spinner";
const url = import.meta.env.VITE_DOMAIN_URL;
interface TicketDetailModalProps {
  isOpen: boolean;
  ticketData: TicketResponseData | null;
  setTicketData: (value: TicketResponseData | null) => void;
  onClose: () => void;
}

const statusList: string[] = ["new", "in_progress", "resolved"];


const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  isOpen,
  ticketData,
  setTicketData,
  onClose,
}) => {
  const [isloading, setIsLoading] = useState<boolean>(false)
  if (!isOpen || !ticketData) return null;

  const updateStatus = async (value: "new" | "in_progress" | "resolved") => {
    try {
      setIsLoading(true)
      await updateTicketStatus(`${url}/ticket/${ticketData.id}`, {
        newStatus: value,
      });
      setTicketData({
        ...ticketData,
        status: value
      })
      setIsLoading(false)
    } catch (error) {
      toast.error('Something went wrong.', {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                <Dialog.Panel className="absolute top-[30%] transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Name : {ticketData.name}
                      </Dialog.Title>
                      <div className="mt-2 flex ">
                        <p className="">Email : </p>
                        <p className="text-sm text-gray-500 mt-1 ml-1">
                          {ticketData.email}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-x-4">
                        <p className="">Status: </p>
                        <div className="w-full">
                          <Dropdown
                            selected={ticketData.status}
                            onChange={(value: "new" | "in_progress" | "resolved") => {
                              updateStatus(value)
                            }}
                            options={statusList}
                          />
                        </div>
                        {isloading ? <Spinner /> : null}
                      </div>
                      <div className="mt-2 flex ">
                        <p className="">Description : </p>
                        <p className="text-sm text-gray-500 mt-1 ml-1 max-h-20 overflow-auto">
                          {ticketData.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={onClose}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default TicketDetailModal;
