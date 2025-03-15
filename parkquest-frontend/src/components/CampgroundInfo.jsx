export default function CampgroundInfo({ campground }) {
  if (!campground) return null;

  return (
    <div>
      <h2>{campground.name}</h2>

      {campground.images?.length > 0 && (
        <img
          src={campground.images[0].url}
          alt={campground.images[0].altText || "Park Image"}
          width="400"
        />
      )}

      <p>{campground.description}</p>

      <br />

      {campground.addresses?.length > 0 && (
        <div>
          <h4>Address:</h4>
          <p>{campground.addresses[0].line1}</p>
          {campground.addresses[0].line2 && <p>{campground.addresses[0].line2}</p>}
          {campground.addresses[0].line3 && <p>{campground.addresses[0].line3}</p>}
          <p>
            {campground.addresses[0].city}, {campground.addresses[0].stateCode}{" "}
            {campground.addresses[0].postalCode}
          </p>
        </div>
      )}

      <br />

      {campground.amenities && (
        <div>
          <h4>Amenities:</h4>
          <ul>
            {Object.entries(campground.amenities).map(([key, value]) => (
              <li key={key}>
                <strong>{formatAmenityName(key)}:</strong>{" "}
                {Array.isArray(value) ? value.join(", ") : value}
              </li>
            ))}
          </ul>
        </div>
      )}

      <br />

      <a href={campground.url} target="_blank" rel="noopener noreferrer">
        More Info
      </a>
    </div>
  );
}

// Helper function to format amenity names
const formatAmenityName = (name) => {
  return name
    .replace(/([A-Z])/g, " $1") // Insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};
