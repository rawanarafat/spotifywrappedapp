import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { TopTracks } from "./pages/topTracks";
import { Navbar } from "./pages/navbar";
import { TopArtists } from "./pages/topArtists";

function App() {
  return (
    <div className="App flex items-center justify-center w-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mytop/TopTracks" element={<TopTracks />} />
          <Route path="/mytop/topArtists" element={<TopArtists />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
