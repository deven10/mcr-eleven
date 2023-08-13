import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { SingleMoviePage } from "./pages/SingleMoviePage";
import { WatchListPage } from "./pages/WatchListPage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:movieID" element={<SingleMoviePage />} />
        <Route path="/watch-list" element={<WatchListPage />} />
      </Routes>
    </div>
  );
}

export default App;
