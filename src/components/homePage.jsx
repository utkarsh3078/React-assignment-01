import { Link } from "react-router-dom";
import "./homePage.css";

const tools = [
  {
    title: "Jokes",
    description:
      "Fetch a fresh random joke from FreeAPI whenever you need a quick laugh.",
    path: "/jokes",
    cta: "Open Jokes",
  },
  {
    title: "Quotes",
    description:
      "Discover inspirational and technology quotes curated from the API.",
    path: "/quotes",
    cta: "Open Quotes",
  },
  {
    title: "Random User",
    description:
      "Generate random user profiles with personal and location details.",
    path: "/users",
    cta: "Open Users",
  },
  {
    title: "Random Cats",
    description: "Get random cat breeds with images, traits, and quick facts.",
    path: "/cats",
    cta: "Open Cats",
  },
  {
    title: "Meals",
    description:
      "Search meals by keyword and explore ingredients and instructions.",
    path: "/meals",
    cta: "Open Meals",
  },
  {
    title: "Products",
    description:
      "Browse random product results by category with prices and previews.",
    path: "/products",
    cta: "Open Products",
  },
  {
    title: "YouTube Videos",
    description: "Search YouTube videos with sorting and pagination controls.",
    path: "/youtube-videos",
    cta: "Open Videos",
  },
];

function HomePage() {
  return (
    <section className="home-layout">
      {/* <header className="home-hero card">
        <p className="home-eyebrow">Liquid UI Playground</p>
        <h1 className="home-heading">
          Explore every API tool from one dashboard
        </h1>
        <p className="home-lead">
          Jump into jokes, quotes, users, cats, meals, products, and YouTube
          data with a single consistent liquid interface.
        </p>
      </header> */}

      <div className="home-page">
        {tools.map((tool, index) => (
          <article className="card home-tile" key={tool.path}>
            <p className="home-tile-index">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="home-title">{tool.title}</h2>
            <p className="home-description">{tool.description}</p>
            <div className="button-row">
              <Link to={tool.path} className="button primary">
                {tool.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
