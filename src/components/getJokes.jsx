import { useEffect, useState } from "react";
import "./getJokes.css";

function GetJokes() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 1;
  const query = ["science", "technology", "human"];
  let randomIndex = Math.floor(Math.random() * query.length);

  async function fetchJoke() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/randomjokes?limit=${limit}&query=${query[randomIndex]}&inc=categories%252Cid%252Ccontent&page=1`,
        { method: "GET", headers: { accept: "application/json" } },
      );
      const data = await response.json();
      const content = data?.data?.data?.[0]?.content ?? "No joke found.";
      setJoke(content);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("No joke found.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <section className="jokes-page">
      <div className="jokes-card">
        <p className="jokes-label">Jokes</p>
        <h1 className="jokes-title">A laugh for the moment</h1>
        <blockquote className="jokes-quote">
          {loading ? "Loading..." : joke}
        </blockquote>
        <p className="jokes-category">
          Category: {loading ? "Loading..." : query[randomIndex]}
        </p>

        <div className="jokes-actions">
          <button onClick={() => fetchJoke()} className="button primary">
            Fetch New Joke
          </button>
        </div>
      </div>
    </section>
  );
}

export default GetJokes;
