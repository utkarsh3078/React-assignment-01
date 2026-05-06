import { useEffect, useState } from "react";
import "./meal.css";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("rice");
  const [error, setError] = useState("");

  async function fetchMeals(searchTerm = query) {
    setLoading(true);
    setError("");

    try {
      const url =
        "https://api.freeapi.app/api/v1/public/meals?page=1&limit=10&query=" +
        encodeURIComponent(searchTerm);
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      const response = await fetch(url, options);

      const data = await response.json();
      const list = data?.data?.data ?? [];
      setMeals(list);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch meals.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeals("rice");
  }, []);

  function getIngredients(meal) {
    const items = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal["strIngredient" + i];
      const measure = meal["strMeasure" + i];

      if (ingredient && ingredient.trim() !== "") {
        items.push(
          (measure && measure.trim() ? measure.trim() + " " : "") +
            ingredient.trim(),
        );
      }
    }

    return items;
  }

  return (
    <section className="meals-page">
      <div className="meals-card">
        <p className="meals-label">Meals API</p>
        <h1 className="meals-title">Recipe Listing</h1>
        <p className="meals-subtitle">
          Search meals like rice, chicken, pasta, or beef.
        </p>

        <form
          className="meals-search"
          onSubmit={function (event) {
            event.preventDefault();
            fetchMeals(query);
          }}
        >
          <input
            type="text"
            value={query}
            onChange={function (event) {
              setQuery(event.target.value);
            }}
            placeholder="Search meals..."
            className="meals-input"
          />
          <button type="submit" className="button primary">
            Search
          </button>
        </form>

        {loading ? (
          <p>Loading meals...</p>
        ) : error ? (
          <p>{error}</p>
        ) : meals.length === 0 ? (
          <p>No meals found.</p>
        ) : (
          <div className="meals-grid">
            {meals.map(function (meal) {
              const ingredients = getIngredients(meal);

              return (
                <article key={meal.idMeal} className="meal-card">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="meal-image"
                  />

                  <div className="meal-content">
                    <p className="meal-meta">
                      {meal.strCategory} • {meal.strArea}
                    </p>
                    <h2 className="meal-name">{meal.strMeal}</h2>

                    <p className="meal-instructions">{meal.strInstructions}</p>

                    <div className="meal-ingredients">
                      <h3>Ingredients</h3>
                      <ul>
                        {ingredients.slice(0, 6).map(function (item, index) {
                          return <li key={index}>{item}</li>;
                        })}
                      </ul>
                    </div>

                    {meal.strYoutube ? (
                      <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noreferrer"
                        className="meal-link"
                      >
                        Watch on YouTube
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Meals;
