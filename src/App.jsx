import { Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import { DARK } from "./helpers/colors";
import { useState } from "react";

const App = () => {
  const [todosPage, setTodosPage] = useState(true);
  return (
    <div className="min-h-screen" style={{ backgroundColor: DARK }}>
      <Navbar setTodosPage={setTodosPage} todosPage={todosPage} />
      <Routes>
        <Route path="/" element={<Navigate to="/todos" />} />
        <Route path="/todos" element={<Todos todosPage={todosPage} />} />
      </Routes>
    </div>
  );
};

export default App;
