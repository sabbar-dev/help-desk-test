// TicketCard.tsx
import React from "react";
import { TicketResponseData } from "../interfaces/ticket.types";
interface TicketCardProps {
  ticketDetail: TicketResponseData;
  onViewDetailsClick: () => void;
  ticketData: (data: TicketResponseData) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticketDetail,
  ticketData,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full relative ">
      <div className="font-semibold text-lg mb-2">
        {" "}
        Name : {ticketDetail.name}
      </div>
      <div className="text-gray-600">Email : {ticketDetail.email}</div>
      {/* <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-bl-lg cursor-pointer">
        View Details
      </button> */}
      <button
        className="absolute bottom-0 right-0 p-2 bg-transparent border border-blue-500 text-blue-500 rounded-bl-lg cursor-pointer"
        onClick={() => ticketData(ticketDetail)}
      >
        View Details
      </button>
    </div>
  );
};

export default TicketCard;
