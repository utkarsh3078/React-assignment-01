import GetJokes from "./components/getJokes.jsx";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import HomePage from "./components/homePage.jsx";
import GetQuotes from "./components/getQuotes.jsx";
import GetRandomUsers from "./components/getRandomUsers.jsx";
import GetCats from "./components/getRandomCats.jsx";
import Meals from "./components/meals.jsx";
import GetRandomProduct from "./components/getRandomProduct.jsx";
import GetYoutubeVideo from "./components/getYoutubeVideo.jsx";
import Register from "./auth/register.jsx";
import Login from "./auth/login.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={`page ${darkMode ? "dark" : "light"}`}>
      {!isAuthRoute ? (
        <header className="navbar">
          <Link to="/" className="button">
            <strong>React Assignment</strong>
          </Link>

          <nav className="button-row">
            <Link to="/register" className="button">
              Register
            </Link>
            <Link to="/login" className="button">
              Login
            </Link>
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
      ) : null}

      <main className={isAuthRoute ? "content auth-content" : "content"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jokes" element={<GetJokes />} />
          <Route path="/quotes" element={<GetQuotes />} />
          <Route path="/users" element={<GetRandomUsers />} />
          <Route path="/cats" element={<GetCats />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/products" element={<GetRandomProduct />} />
          <Route path="/youtube-videos" element={<GetYoutubeVideo />} />
          <Route
            path="/register"
            element={
              <Register
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
