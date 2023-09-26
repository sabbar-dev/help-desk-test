import { Route, Routes } from 'react-router-dom';
import TicketList from './pages/Admin/Dashboard';
import MenuBar from "./components/MenuBar";
import TicketSubmit from './pages/Users/TicketSubmit';

function App() {
  return (
    <>
      <MenuBar />
      <div className="max-w-[75%] mx-auto mt-7">
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/create" element={<TicketSubmit />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
