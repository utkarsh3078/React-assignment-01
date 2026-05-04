import { useEffect } from "react";
import { useState } from "react";
import "./getRandomUsers.css";

function GetRandomUsers() {
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");
  const [timezone, setTimezone] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    setLoading(true);
    try {
      const url =
        "https://api.freeapi.app/api/v1/public/randomusers/user/random";
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setGender(data?.data?.gender ?? "gender not found");
      setEmail(data?.data?.email ?? "email not found");
      setTitle(data?.data?.name?.title ?? "title not found");
      setFirstName(data?.data?.name?.first ?? "First Name not found");
      setLastName(data?.data?.name?.last ?? "Last name not found");
      setAge(data?.data?.dob?.age ?? "age not found");
      setCity(data?.data?.location?.city ?? "City not found");
      setCountry(data?.data?.location?.country ?? "Country not found");
      setPostCode(data?.data?.location?.postcode ?? "Postcode not found");
      setTimezone(
        data?.data?.location?.timezone?.description ?? "Postcode not found",
      );
      setProfilePicture(data?.data?.picture?.thumbnail);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="random-user-page">
      <div className="random-user-card">
        <div className="random-user-header">
          <div>
            <p className="random-user-label">Random User</p>
            <h1 className="random-user-name">
              {loading
                ? "Loading user..."
                : `${title} ${firstName} ${lastName}`}
            </h1>
            <p className="random-user-subtitle">
              {loading
                ? "Fetching profile details"
                : `${gender} • ${age} years old`}
            </p>
          </div>

          <div className="random-user-avatar-wrap">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={
                  loading ? "Loading user profile" : `${firstName} ${lastName}`
                }
                className="random-user-avatar"
              />
            ) : (
              <div className="random-user-avatar random-user-avatar-placeholder">
                {loading ? "..." : (title?.charAt(0) ?? "U")}
              </div>
            )}
          </div>
        </div>

        <div className="random-user-grid">
          <article className="random-user-field">
            <span className="random-user-field-label">Email</span>
            <strong className="random-user-field-value">
              {loading ? "Loading..." : email}
            </strong>
          </article>
          <article className="random-user-field">
            <span className="random-user-field-label">Gender</span>
            <strong className="random-user-field-value">
              {loading ? "Loading..." : gender}
            </strong>
          </article>
          <article className="random-user-field">
            <span className="random-user-field-label">City</span>
            <strong className="random-user-field-value">
              {loading ? "Loading..." : city}
            </strong>
          </article>
          <article className="random-user-field">
            <span className="random-user-field-label">Country</span>
            <strong className="random-user-field-value">
              {loading ? "Loading..." : country}
            </strong>
          </article>
          <article className="random-user-field">
            <span className="random-user-field-label">Post Code</span>
            <strong className="random-user-field-value">
              {loading ? "Loading..." : postCode}
            </strong>
          </article>
          <article className="random-user-field random-user-field-wide">
            <span className="random-user-field-label">Timezone</span>
            <strong className="random-user-field-value">
              {loading ? "Loading..." : timezone}
            </strong>
          </article>
        </div>

        <div className="random-user-actions">
          <button onClick={() => fetchUser()} className="button primary">
            Fetch New User
          </button>
        </div>
      </div>
    </section>
  );
}

export default GetRandomUsers;
