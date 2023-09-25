import axios from "axios";
import { FormData, LoginInfo } from "../interfaces/ticket.types";

export const createTicket = async (url: string, data: FormData) => {
  return await axios.post(url, data);
};

export const login = async (url: string, data: LoginInfo) => {
  return await axios.post(url, data);
};
