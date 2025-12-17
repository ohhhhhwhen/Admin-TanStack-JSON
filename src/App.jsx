import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Application from "./pages/Application";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/application" element={<Application />} /> */}
      </Routes>
    </div>
  );
}

export default App;
