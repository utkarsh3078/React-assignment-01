import GetJokes from "./components/getJokes.jsx";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

function HomePage() {
  return (
    <section className="card">
      <h1 className="home-title">Jokes</h1>
      <p className="home-description">
        Use the navbar buttons to move to the jokes page and fetch a random joke
        from the API.
      </p>
      <div className="button-row">
        <Link to="/jokes" className="button primary">
          View Jokes
        </Link>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="page">
      <header className="navbar">
        <Link to="/" className="button">
          <strong>React Assignment</strong>
        </Link>

        <nav className="button-row">
          <Link to="/jokes" className="button primary">
            Jokes
          </Link>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jokes" element={<GetJokes />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
