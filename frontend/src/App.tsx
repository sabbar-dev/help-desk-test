import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SupportTicketForm from "./pages/TicketSubmit";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SupportTicketForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
