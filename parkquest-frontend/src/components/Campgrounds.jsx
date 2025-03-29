import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CampgroundInfo from "./CampgroundInfo/CampgroundInfo";

const API_KEY = import.meta.env.VITE_PARKS_API_KEY;
const API_BASE_URL = "https://developer.nps.gov/api/v1/campgrounds";

export default function Campgrounds() {
  const { id: parkCode } = useParams();
  const [campgrounds, setCampgrounds] = useState([]);
  const [selectedCampground, setSelectedCampground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!parkCode) return;

    fetch(`${API_BASE_URL}?parkCode=${parkCode}&api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data.length > 0) {
          setCampgrounds(data.data);
        } else {
          setError("No campgrounds found for this park.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campgrounds:", error);
        setError("Failed to load campgrounds.");
        setLoading(false);
      });
  }, [parkCode]);

  if (loading) return <p>Loading campgrounds...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Campgrounds</h1>
      <br/>
      {selectedCampground ? (
        <CampgroundInfo campground={selectedCampground} />
      ) : (
        <ul>
          {campgrounds.map((campground) => (
            <li key={campground.id}>
              <button onClick={() => setSelectedCampground(campground)}>
                {campground.name}
              </button>
              <p>{campground.description}</p>
              <a href={campground.url} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
