import { useState } from "react";
import { Link } from "react-router-dom";

const ParksList = () => {
  const [selectedState, setSelectedState] = useState("");
  const [parks, setParks] = useState([]);
  const [error, setError] = useState("");

  const states = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
    "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
    "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA",
    "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
    "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO",
    "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ",
    "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
    "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI",
    "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT",
    "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV",
    "Wisconsin": "WI", "Wyoming": "WY"
  };

  const fetchParks = async () => {
    if (!selectedState) {
      setError("Please select a state.");
      return;
    }

    setError("");

    try {
      const stateCode = states[selectedState]; // Convert full name to abbreviation

      // const apiKey = import.meta.env.VITE_PARKS_API_KEY;
      // const response = await fetch(
      //   `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&limit=100&api_key=${apiKey}`
      // );

      const response = await fetch(
        `http://localhost:8080/parks/searches?stateCode=${stateCode}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch parks. Please try again.");
      }

      const data = await response.json();
      setParks(data);
      console.log("API Response:", data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
  <div className="park-list">
    <h2>Find National Parks</h2>

    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
        <option value="">Select a state</option>
        {Object.keys(states).map((state) => (
        <option key={state} value={state}>
            {state}
        </option>
        ))}page 
    </select>

    <button onClick={fetchParks}>Search</button>

    {error && <p style={{ color: "red" }}>{error}</p>}

    <ul>
        {parks.map((park) => (
        <li key={park.id}>
            <h4>
            <Link to={`/parks/${park.parkCode}`}>{park.fullName}</Link>
            </h4>
            <p>{park.description}</p>
        </li>
        ))}
    </ul>
  </div>
  );
};

export default ParksList;
