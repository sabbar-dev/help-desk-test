import axios from "axios";
import { FormData } from "../interfaces/ticket.types";
export const createTicket = async (url: string, data: FormData) => {
  return await axios.post(url, data);
};
