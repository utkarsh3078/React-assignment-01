import { useEffect } from "react";
import { useState } from "react";
import "./getQuotes.css";

function GetQuotes() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const query = ["technology", "human", "life", "inspirational"];
  let randomIndex = Math.floor(Math.random() * query.length);

  async function fetchQuote() {
    setLoading(true);
    try {
      const url = `https://api.freeapi.app/api/v1/public/quotes?page=1&limit=1&query=${query[randomIndex]}`;
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      //   console.log(data);
      setAuthor(data?.data?.data?.[0]?.author ?? "not able to fetch author");
      setQuote(data?.data?.data?.[0]?.content ?? "not able to fetch quote");
    } catch (error) {
      console.error("Error fetching quote:", error);
      setAuthor("not able to fetch author");
      setQuote("not able to fetch quote");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section className="quotes-page">
      <div className="quotes-card">
        <p className="quotes-label">Quote</p>
        <br />
        <blockquote className="quotes-quote">
          {loading ? "Loading..." : quote}
        </blockquote>
        <p className="quotes-author">
          <b>Author: {loading ? "Loading..." : author}</b>
        </p>
        <p>Category: {loading ? "Loading..." : query[randomIndex]}</p>
        <div className="quotes-actions">
          <button onClick={() => fetchQuote()} className="button primary">
            Fetch New Quote
          </button>
        </div>
      </div>
    </section>
  );
}

export default GetQuotes;
