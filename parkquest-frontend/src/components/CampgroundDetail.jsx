import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CampgroundInfo from "./CampgroundInfo/CampgroundInfo";

const API_KEY = import.meta.env.VITE_PARKS_API_KEY;
const API_BASE_URL = "https://developer.nps.gov/api/v1/campgrounds";

export default function CampgroundDetail() {
  const { campgroundId } = useParams();
  const [campground, setCampground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          const foundCampground = data.data.find(camp => camp.id.toString() === campgroundId);
          console.log("Found campground:", foundCampground);
          if (foundCampground) {
            setCampground(foundCampground);
          } else {
            setError("Campground not found.");
          }
        } else {
          setError("No campgrounds available.");
        }
        setLoading(false);
      })
      .catch((error) => {
				console.log("Error: ", error)
        setError("Failed to fetch campground details.");
        setLoading(false);
      });
  }, [campgroundId]);

  if (loading) return <p>Loading campground details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <CampgroundInfo campground={campground} />;
}

