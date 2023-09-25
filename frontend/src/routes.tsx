// routes.tsx
import { createBrowserRouter } from "react-router-dom";
import SupportTicketForm from "./pages/Users/TicketSubmit";
import TickeList from "./pages/Admin/Dashboard";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <TickeList />,
  },
  {
    path: "/create",
    element: <SupportTicketForm />,
  },
]);
// Add more routes as needed

export default routes;
