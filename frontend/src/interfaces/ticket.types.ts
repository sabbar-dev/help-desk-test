export interface FormData {
  name: string;
  email: string;
  description: string;
}

export interface TicketResponseData {
  id: number;
  name: string;
  email: string;
  description: string;
  status: "new" | "in_progress" | "resolved";
  created_at: string;
  updated_at: string;
  userId: number | null;
}
