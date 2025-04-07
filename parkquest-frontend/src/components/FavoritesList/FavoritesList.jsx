import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./FavoritesList.module.css";

const FavoritesList = ({userId}) => {
  const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState("");

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



    return (
    <div className={style.favoriteList}>
        <button>
        <Link to="/parklist">Go to Parks List</Link>
      </button>
      <h1>My Favorite Parks</h1>
        {/* Display error if any */}
        {error && <p className={style.error}>{error}</p>}

        {favorites.length === 0 ? <p>No favorites yet!</p> : (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
                <h3>{favorite.fullName}</h3>
              <button onClick={() => removeFavorite(favorite.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
