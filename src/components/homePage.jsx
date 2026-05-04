import { Link } from "react-router-dom";
function HomePage() {
  return (
    <>
      <section className="card">
        <h1 className="home-title">Jokes</h1>
        <p className="home-description">
          Use the navbar buttons to move to the jokes page and fetch a random
          joke from the API.
        </p>
        <div className="button-row">
          <Link to="/jokes" className="button primary">
            View Jokes
          </Link>
        </div>
      </section>
      <br></br>
      <section className="card">
        <h1 className="home-title">Quotes</h1>
        <p className="home-description">
          Use the navbar buttons to move to the jokes page and fetch a random
          joke from the API.
        </p>
        <div className="button-row">
          <Link to="/quotes" className="button primary">
            View Quotes
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
