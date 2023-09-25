import axios from "axios";
import { FormData } from "../interfaces/ticket.types";
export const createTicket = async (url: string, data: FormData) => {
  return await axios.post(url, data);
};
export const getTicketkList = async (url: string) => {
  return await axios.get(url);
};
export const updateTicketStatus = async (
  url: string,
  data: { newStatus: string }
) => {
  return await axios.put(url, data);
};
