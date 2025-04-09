import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./FavoritesList.module.css";

const FavoritesList = ({userId}) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [hoveredPark, setHoveredPark] = useState(null);

    const [park, setPark] = useState([]);

  const storedUserId = localStorage.getItem("userId");

    // Fetch favorites for the user when the component mounts or `userId` changes
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                // Use stored or prop `userId`
                const id = userId || storedUserId;

                if (!id) {
                    throw new Error("User ID is missing. Please log in again.");
                }

                const response = await fetch(`http://localhost:8081/favorites/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch favorites. Please try again.");
                }

                const data = await response.json();
                setFavorites(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFavorites();
    }, [userId, storedUserId]);

    // Function to remove a favorite
    const removeFavorite = async (parkCode) => {
        try {
            const id = userId || storedUserId;

            if (!id) {
                throw new Error("User ID is missing. Please log in again.");
            }

            const response = await fetch(
                `http://localhost:8081/favorites?userId=${id}&parkCode=${parkCode}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Failed to remove the favorite. Please try again.");
            }

            // Update state after removing the favorite
            const updatedFavorites = favorites.filter(
                (favorite) => favorite.parkCode !== parkCode
            );
            setFavorites(updatedFavorites);
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to fetch a park's details by its parkCode
    const fetchParkByParkCode = async (parkCode) => {
        try {
            setError(""); // Clear any existing error

            const response = await fetch(
                `http://localhost:8081/lookup?parkCode=${encodeURIComponent(parkCode)}`
            );
            console.log("Fetching park with parkCode:", parkCode);

            if (!response.ok) {
                throw new Error("Failed to fetch park details. Please try again.");
                console.error("Error fetching park:", err);

            }

            const data = await response.json();
            setHoveredPark(data); // Update the `hoveredPark` state with fetched data
        } catch (err) {
            setError(err.message);
        }
    };


    return (
    <div className={style.favoriteList}>
        <button className={style.outlineButton}>
        <Link to="/parklist">Go to Parks List</Link>
      </button>
      <h1>My Favorite Parks</h1>
        <br />
        {/* Display error if any */}
        {error && <p className={style.error}>{error}</p>}

        {favorites.length === 0 ? <p>No favorites yet!</p> : (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
                {/* Park Name */}
                <h3
                    onMouseEnter={() => fetchParkByParkCode(favorite.parkCode)} // Trigger fetching park data on hover
                >
                    <Link
                        to={`/parklist/${favorite.parkCode}`} // Pass the parkCode in the link
                        state={{
                            park: hoveredPark || {}, // Pass hover data if available
                        }}
                        userId={storedUserId}
                    >
                        {favorite.fullName}
                    </Link>
                </h3>
                <p>{favorite.parkDescription}</p>
                <br />
              <button onClick={() => removeFavorite(favorite.parkCode)} className={style.parkBtn}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
