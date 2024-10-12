import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./form";
import Users from "./Users";
import Admin from "./Admin";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
