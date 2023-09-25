import routes from "./routes";
import { RouterProvider } from "react-router-dom";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <>
      <MenuBar />
      <div className="max-w-[75%] mx-auto mt-7">
        <RouterProvider router={routes} />
      </div>
    </>
  );
}

export default App;
