import React, { useState, useEffect } from "react";
import { TicketResponseData } from "../../../interfaces/ticket.types";
import TicketDetailModal from "../../../components/TicketDetailModal";

const url = import.meta.env.VITE_DOMAIN_URL;

import { getTicketkList } from "../../../services/createTask.service";

export default function Example() {
  const [ticketsList, setTicketsList] = useState<TicketResponseData[]>([]);
  const [ticketData, setTicketData] = useState<TicketResponseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      getTicketkList(`${url}/ticket`).then((res) => {
        setTicketsList(res.data);
      });
    } catch (error) {
      console.log("error", error);

    } finally {
      setIsLoading(false)
    }

  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getTicketData = (data: TicketResponseData) => {
    setIsModalOpen(true);
    setTicketData(data);
  };

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">Recent Tickets</h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {isLoading ? <>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
            >
          </div>
        </> :
          <>
            {ticketsList.map((ticket, i) => (
              <li
                key={i}
                className="col-span-1 flex rounded-md shadow-sm cursor-pointer"
                onClick={() => getTicketData(ticket)}
              >
                <div
                  className={`${i % 2 === 0 ? "bg-purple-600" : "bg-blue-600"
                    } flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white`}
                >
                  {ticket.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                  <div className="flex-1 truncate px-4 py-2 text-sm">
                    <a className="font-medium text-gray-900 hover:text-gray-600">
                      {ticket.name}
                    </a>
                    <p className="text-gray-500">{ticket.email}</p>
                  </div>
                  <div className="flex-shrink-0 pr-2">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open options</span>
                      <span className="mr-5 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {ticket.status}
                      </span>
                      {/* <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  /> */}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </>}

      </ul>

      <TicketDetailModal
        ticketData={ticketData}
        setTicketData={setTicketData}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
