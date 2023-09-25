import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SupportTicketForm from "./pages/TicketSubmit";
import AdminLogin from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SupportTicketForm />} />
          <Route path="/login" element={<AdminLogin />} />
          {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
