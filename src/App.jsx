import { Route, Routes } from "react-router";
import Orders from "./pages/Orders";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Orders />} />
    </Routes>
  );
}

export default App;
