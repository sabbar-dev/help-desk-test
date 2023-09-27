import { useState, useEffect } from "react";
import { TicketResponseData } from "../../../interfaces/ticket.types";
import TicketDetailModal from "../../../components/TicketDetailModal";

const url = import.meta.env.VITE_DOMAIN_URL;

import { getTicketkList } from "../../../services/createTask.service";
import Spinner from "../../../components/Spinner";

const STATUSES = {
  new: 'New',
  in_progress: 'In Progress',
  resolved: 'Resolved'
}

export default function Example() {
  const [ticketsList, setTicketsList] = useState<TicketResponseData[]>([]);
  const [ticketData, setTicketData] = useState<TicketResponseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  console.log(isLoading);

  const fetchTickets = async () => {

    try {
      setIsLoading(true)
      const { data } = await getTicketkList(`${url}/ticket`);
      setTicketsList(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets();
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getTicketData = (data: TicketResponseData) => {
    setIsModalOpen(true);
    setTicketData(data);
  };

  return (
    <div className="pb-4">
      <h2 className="text-sm font-medium text-gray-500">Recent Tickets</h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      >
        {isLoading ? <>
          <Spinner />
        </> :
          <>
            {ticketsList.map((ticket, i) => (
              <li
                key={ticket.id}
                className="col-span-1 flex rounded-md shadow-sm cursor-pointer "
                onClick={() => getTicketData(ticket)}
              >
                <div
                  className={`${i % 2 === 0 ? "bg-purple-600" : "bg-blue-600"
                    } flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white`}
                >
                  {ticket.name.slice(0, 2).toUpperCase()}
                </div>
                <div className=" flex flex-1 items-start justify-between flex-col px-4  py-2  truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white" style={{ border: "1px solid black" }}>
                  <div className="flex-1 truncate   text-sm">
                    <a className="font-medium text-gray-900 hover:text-gray-600">
                      {ticket.name}
                    </a>
                    <p className="text-gray-500 pr-1">{ticket.email}</p>
                  </div>
                  <div className="  flex-1  truncate text-sm w-[100px] pt-3" >
                    <div className="inline-flex h-8 w-14  rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open options</span>
                      <span className="  rounded-md bg-gray-50 p-2   text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {STATUSES[ticket.status]}
                      </span>
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
