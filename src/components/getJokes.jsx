import { useEffect, useState } from "react";

function GetJokes() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 1;
  const query = ["science", "technology", "general"];
  let randomIndex = Math.floor(Math.random() * query.length);

  async function fetchJoke() {
    const response = await fetch(
      `https://api.freeapi.app/api/v1/public/randomjokes?limit=${limit}&query=${query[randomIndex]}&inc=categories%252Cid%252Ccontent&page=1`,
      { method: "GET", headers: { accept: "application/json" } },
    );
    const data = await response.json(); //json to js object
    const content = data?.data?.data?.[0]?.content ?? "No joke found.";
    setJoke(content);
    setLoading(false);
    // console.log(data);
  }

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <>
      <h1>Jokes</h1>
      <p>
        <b>Category</b>: {query[randomIndex]}
      </p>
      <p>{loading ? "Loading..." : joke}</p>
      <button onClick={() => fetchJoke()} className="button primary">
        Fetch New Joke
      </button>
    </>
  );
}

export default GetJokes;
