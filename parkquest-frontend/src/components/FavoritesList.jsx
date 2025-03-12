import { useState } from "react";
import { Link } from "react-router-dom";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(park => park.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorite-list">
        <button>
        <Link to="/parklist">Go to Parks List</Link>
      </button>
      <h1>My Favorite Parks</h1>
      {favorites.length === 0 ? <p>No favorites yet!</p> : (
        <ul>
          {favorites.map((park) => (
            <li key={park.id}>
              <h3>{park.fullName}</h3>
              <button onClick={() => removeFavorite(park.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
