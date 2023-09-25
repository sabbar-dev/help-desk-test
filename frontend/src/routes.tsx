// routes.tsx
import { createBrowserRouter } from "react-router-dom";
import SupportTicketForm from "./pages/TicketSubmit";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SupportTicketForm />,
  },
]);
// Add more routes as needed

export default routes;
