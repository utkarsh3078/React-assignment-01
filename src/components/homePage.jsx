import { Link } from "react-router-dom";
function HomePage() {
  return (
    <>
      {/* Joke section */}
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
      {/* Quote section */}
      <section className="card">
        <h1 className="home-title">Quotes</h1>
        <p className="home-description">
          Use the navbar buttons to move to the quotes page and fetch a random
          quote from the API.
        </p>
        <div className="button-row">
          <Link to="/quotes" className="button primary">
            View Quotes
          </Link>
        </div>
      </section>
      <br></br>
      {/* Get a random user */}
      <section className="card">
        <h1 className="home-title">Random User</h1>
        <p className="home-description">
          Use the navbar buttons to move to the users page and fetch a random
          user from the API.
        </p>
        <div className="button-row">
          <Link to="/users" className="button primary">
            View Users
          </Link>
        </div>
      </section>
      <br></br>
      <section className="card">
        <h1 className="home-title">Random cats</h1>
        <p className="home-description">
          Use the navbar buttons to move to the cats page and fetch a random cat
          from the API.
        </p>
        <div className="button-row">
          <Link to="/cats" className="button primary">
            View Cats
          </Link>
        </div>
      </section>
      <br></br>
      <section className="card">
        <h1 className="home-title">Random Meals</h1>
        <p className="home-description">
          Use the navbar buttons to move to the cats page and fetch a random cat
          from the API.
        </p>
        <div className="button-row">
          <Link to="/meals" className="button primary">
            View Meals
          </Link>
        </div>
      </section>
      <br></br>
      <section className="card">
        <h1 className="home-title">Random Products</h1>
        <p className="home-description">
          Use the navbar buttons to move to the products page and fetch a random
          product from the API.
        </p>
        <div className="button-row">
          <Link to="/products" className="button primary">
            View Products
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
