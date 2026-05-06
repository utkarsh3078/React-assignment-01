import GetJokes from "./components/getJokes.jsx";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import HomePage from "./components/homePage.jsx";
import GetQuotes from "./components/getQuotes.jsx";
import GetRandomUsers from "./components/getRandomUsers.jsx";
import GetCats from "./components/getRandomCats.jsx";
import Meals from "./components/meals.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={`page ${darkMode ? "dark" : "light"}`}>
      <header className="navbar">
        <Link to="/" className="button">
          <strong>React Assignment</strong>
        </Link>

        <nav className="button-row">
          <button
            className="button"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            Dark Mode
          </button>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jokes" element={<GetJokes />} />
          <Route path="/quotes" element={<GetQuotes />} />
          <Route path="/users" element={<GetRandomUsers />} />
          <Route path="/cats" element={<GetCats />} />
          <Route path="/meals" element={<Meals />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
