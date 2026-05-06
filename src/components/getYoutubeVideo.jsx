import { useEffect, useState } from "react";
import "./getYoutubeVideo.css";

function formatNumber(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return value ?? "0";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

function formatDuration(duration) {
  const match = duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) {
    return duration || "--:--";
  }

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return `${minutes}:${paddedSeconds}`;
}

function formatDate(value) {
  if (!value) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function GetYoutubeVideo() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("javascript");
  const [sortBy, setSortBy] = useState("mostViewed");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchVideos() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          query: query.trim() || "javascript",
          sortBy,
        });

        const response = await fetch(
          `https://api.freeapi.app/api/v1/public/youtube/videos?${params.toString()}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
            signal: controller.signal,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Unable to load YouTube videos right now.",
          );
        }

        const payload = data?.data ?? {};
        setVideos(payload?.data ?? []);
        setTotalPages(payload?.totalPages ?? 1);
        setTotalItems(payload?.totalItems ?? 0);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(
            fetchError.message || "Unable to load YouTube videos right now.",
          );
          setVideos([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();

    return () => controller.abort();
  }, [limit, page, query, sortBy]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1);
  };

  const currentPageLabel = `${page} / ${totalPages}`;

  return (
    <section className="youtube-page">
      <div className="youtube-hero">
        <div>
          <p className="youtube-kicker">FreeAPI Videos</p>
          <h1 className="youtube-title">Browse YouTube videos from FreeAPI</h1>
          <p className="youtube-description">
            Search by keyword, switch sorting, and page through the results.
          </p>
        </div>

        <div className="youtube-stats">
          <span className="youtube-stat-label">Total Videos</span>
          <strong className="youtube-stat-value">
            {loading ? "..." : formatNumber(totalItems)}
          </strong>
        </div>
      </div>

      <form className="youtube-controls" onSubmit={handleSearchSubmit}>
        <label className="youtube-field">
          <span>Search</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            type="text"
            placeholder="javascript, react, api..."
          />
        </label>

        <label className="youtube-field">
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="mostViewed">Most Viewed</option>
            <option value="mostLiked">Most Liked</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>

        <label className="youtube-field">
          <span>Per page</span>
          <select
            value={limit}
            onChange={(event) => {
              setLimit(Number(event.target.value));
              setPage(1);
            }}
          >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
          </select>
        </label>

        <button type="submit" className="button primary youtube-search-btn">
          Search
        </button>
      </form>

      <div className="youtube-toolbar">
        <p className="youtube-toolbar-text">Page {currentPageLabel}</p>
        <div className="youtube-pagination">
          <button
            type="button"
            className="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={loading || page <= 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="button"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={loading || page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {error ? <p className="youtube-message error">{error}</p> : null}

      {loading ? (
        <div className="youtube-state-card">Loading videos...</div>
      ) : null}

      {!loading && !error && videos.length === 0 ? (
        <div className="youtube-state-card">
          No videos found for this search.
        </div>
      ) : null}

      <div className="youtube-grid">
        {videos.map((video) => {
          const snippet = video?.items?.snippet ?? {};
          const contentDetails = video?.items?.contentDetails ?? {};
          const statistics = video?.items?.statistics ?? {};
          const videoId = video?.items?.id;
          const thumbnail =
            snippet?.thumbnails?.maxres?.url ||
            snippet?.thumbnails?.high?.url ||
            snippet?.thumbnails?.medium?.url ||
            snippet?.thumbnails?.default?.url;

          return (
            <article className="youtube-card" key={videoId}>
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noreferrer"
                className="youtube-card-thumb"
              >
                <img src={thumbnail} alt={snippet?.title || "YouTube video"} />
                <span className="youtube-duration">
                  {formatDuration(contentDetails?.duration)}
                </span>
              </a>

              <div className="youtube-card-body">
                <p className="youtube-channel">{snippet?.channelTitle}</p>
                <h2 className="youtube-card-title">{snippet?.title}</h2>
                <p className="youtube-card-description">
                  {snippet?.localized?.description ||
                    snippet?.description ||
                    ""}
                </p>

                <div className="youtube-meta">
                  <span>Views {formatNumber(statistics?.viewCount)}</span>
                  <span>Likes {formatNumber(statistics?.likeCount)}</span>
                  <span>{formatDate(snippet?.publishedAt)}</span>
                </div>

                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="button primary youtube-watch-btn"
                >
                  Watch on YouTube
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default GetYoutubeVideo;
