import { useState, useEffect } from "react";
import "./getRandomCats.css";

function GetCats() {
  const [loading, setLoading] = useState(false);
  const [adaptibility, setAdaptibility] = useState(0);
  const [affectionLevel, setAffectionLevel] = useState(0);
  const [countryCode, setCountryCode] = useState("");
  const [description, setDescription] = useState("");
  const [dogFriendly, setDogFriendly] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [healthIssues, setHealthIssues] = useState(0);
  const [image, setImage] = useState("");
  const [intelligence, setIntelligence] = useState(0);
  const [lifeSpan, setLifeSpan] = useState("");
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [temperament, setTemperament] = useState("");
  const [weight, setWeight] = useState("");
  const [intelegence, setIntelegence] = useState(0);
  const [sheddingLevel, setSheddingLevel] = useState(0);

  async function fetchCats() {
    const url = "https://api.freeapi.app/api/v1/public/cats/cat/random";
    const options = { method: "GET", headers: { accept: "application/json" } };
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setAdaptibility(data?.data?.adaptability);
      setAffectionLevel(data?.data?.affection_level);
      setCountryCode(data?.data?.country_code);
      setDescription(data?.data?.description);
      setDogFriendly(data?.data?.dog_friendly);
      setEnergyLevel(data?.data?.energy_level);
      setHealthIssues(data?.data?.health_issues);
      setImage(data?.data?.image);
      setIntelligence(data?.data?.intelegence);
      setLifeSpan(data?.data?.life_span);
      setName(data?.data?.name);
      setOrigin(data?.data?.origin);
      setTemperament(data?.data?.temperament);
      setWeight(data?.data?.weight?.imperial);
      setIntelegence(data?.data?.intelligence);
      setSheddingLevel(data?.data?.shedding_level);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCats();
  }, []);
  return (
    <section className="cats-page">
      <div className="cats-card">
        <div className="cats-header">
          <div>
            <p className="cats-label">Random Cats</p>
            <h1 className="cats-title">
              {loading ? "Loading cat profile..." : name || "Cat details"}
            </h1>
            <p className="cats-subtitle">
              {loading
                ? "Fetching breed information and image"
                : origin || description || "Breed information loaded"}
            </p>
          </div>

          <div className="cats-image-wrap">
            {image ? (
              <img
                src={image}
                alt={loading ? "Loading cat" : name || "Random cat"}
                className="cats-image"
              />
            ) : (
              <div className="cats-image cats-image-placeholder">
                {loading ? "..." : name?.charAt(0) || "C"}
              </div>
            )}
          </div>
        </div>

        <div className="cats-highlights">
          <article className="cats-highlight-card">
            <span className="cats-highlight-label">Temperament</span>
            <strong className="cats-highlight-value">
              {loading ? "Loading..." : temperament || "Not available"}
            </strong>
          </article>
          <article className="cats-highlight-card">
            <span className="cats-highlight-label">Country Code</span>
            <strong className="cats-highlight-value">
              {loading ? "Loading..." : countryCode || "Not available"}
            </strong>
          </article>
          <article className="cats-highlight-card">
            <span className="cats-highlight-label">Life Span</span>
            <strong className="cats-highlight-value">
              {loading ? "Loading..." : lifeSpan || "Not available"}
            </strong>
          </article>
          <article className="cats-highlight-card">
            <span className="cats-highlight-label">Weight</span>
            <strong className="cats-highlight-value">
              {loading ? "Loading..." : weight || "Not available"}
            </strong>
          </article>
        </div>

        <div className="cats-grid">
          <article className="cats-field">
            <span className="cats-field-label">Adaptability</span>
            <strong className="cats-field-value">
              {loading ? "Loading..." : adaptibility}
            </strong>
          </article>
          <article className="cats-field">
            <span className="cats-field-label">Affection Level</span>
            <strong className="cats-field-value">
              {loading ? "Loading..." : affectionLevel}
            </strong>
          </article>
          <article className="cats-field">
            <span className="cats-field-label">Dog Friendly</span>
            <strong className="cats-field-value">
              {loading ? "Loading..." : dogFriendly}
            </strong>
          </article>
          <article className="cats-field">
            <span className="cats-field-label">Energy Level</span>
            <strong className="cats-field-value">
              {loading ? "Loading..." : energyLevel}
            </strong>
          </article>
          <article className="cats-field">
            <span className="cats-field-label">Health Issues</span>
            <strong className="cats-field-value">
              {loading ? "Loading..." : healthIssues}
            </strong>
          </article>
          <article className="cats-field">
            <span className="cats-field-label">Intelligence</span>
            <strong className="cats-field-value">
              {loading ? "Loading..." : intelegence}
            </strong>
          </article>
          <article className="cats-field cats-field-wide">
            <span className="cats-field-label">Shedding Level</span>
            <strong className="cats-field-value">
              {loading ? "Loading..." : sheddingLevel}
            </strong>
          </article>
        </div>

        <div className="cats-description">
          <span className="cats-field-label">Description</span>
          <p>
            {loading
              ? "Loading description..."
              : description || "No description available."}
          </p>
        </div>

        <div className="cats-actions">
          <button onClick={() => fetchCats()} className="button primary">
            Fetch New Cat
          </button>
        </div>
      </div>
    </section>
  );
}

export default GetCats;
