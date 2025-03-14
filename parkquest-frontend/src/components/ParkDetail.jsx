import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_PARKS_API_KEY;

export default function ParkDetail() {
  const { id } = useParams();
  const [park, setPark] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${id}&api_key=${API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch park details");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); 
        if (data.data.length > 0) {
          setPark(data.data[0]);
        } else {
          setError("No park details found.");
        }
      })
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!park) return <p>Loading...</p>;

  const saveToFavorites = () => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (!existingFavorites.some(fav => fav.id === park.id)) {
      const updatedFavorites = [...existingFavorites, park];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="park-details">
      <button onClick={saveToFavorites}>Save to My List</button>
      <button>
        <Link to="/favorites">My Favorite Parks</Link>
      </button>
      <h1>{park.fullName}</h1>

      {park.images?.length > 0 && (
        <img src={park.images[0].url} alt={park.images[0].altText || "Park Image"} />
      )}
      <p>{park.description}</p>
      <p><strong>Location:</strong> {park.states}</p>
      
      <p><strong>Activities:</strong> {park.activities.map(a => a.name).join(", ")}</p>
      <p>
        <a href={park.url} target="_blank" rel="noopener noreferrer">
          Visit Official Website
        </a>
      </p>

      {park.operatingHours?.length > 0 && (
        <div className="hours">
          <h3>Operating Hours:</h3>
          <ul>
            {park.operatingHours[0].standardHours && (
              <li>
                <strong>Standard Hours:</strong>
                <ul>
                  {Object.entries(park.operatingHours[0].standardHours).map(([day, hours]) => (
                    <li key={day}>
                      {day}: {hours}
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
