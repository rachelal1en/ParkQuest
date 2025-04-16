import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../Trips.module.css";


const TrailTripButton = ({userId, tripId, title, shortDescription}) => {
    const [isSaved, setIsSaved] = useState(false);

    const storedUserId = localStorage.getItem("userId");
    if (userId === null) userId = storedUserId;

    //check if the trail is saved
    useEffect(() => {
        const checkIfSaved = async () => {
            if (!userId || !tripId) {
                throw new Error("Missing User ID or Trip ID. Please log in again.");
            }
            try {
                // Fetch trip details by tripId
                const response = await axios.get(`http://localhost:8081/trips/${tripId}`);
                const trip = response.data;
                // Verify if the provided trail already matches the saved trail for this trip
                if (trip?.hikingTrail === title) {
                    setIsSaved(true); // Update state to reflect that the trail is saved
                }
            } catch (err) {
                console.error("Error fetching trip data:", err);
            }
        };
        checkIfSaved();
    }, [tripId, title]); //reruns if tripId or trail title changes

    // Function to handle saving a hiking trail to the trip
    const handleAddTrailToTrip = async () => {
        try {
            console.log({ userId, tripId, title, shortDescription });
            // Send a PUT request to add the trail to the trip
            await axios.put(`http://localhost:8081/trips/${tripId}/hiking-trails`, {
                hikingTrail: title,
                trailDescription: shortDescription,
            });
            setIsSaved(true); // Update state to reflect that the trail is saved
        } catch (err) {
            console.error("Error adding to trip:", err);
        }
    };

    // Function to handle removing a hiking trail from the trip
    const handleRemoveTrailFromTrip = async () => {
        try {
            // Send a DELETE request to remove the trail from the trip
            await axios.delete(`http://localhost:8081/trips/${tripId}/hiking-trails`);
            setIsSaved(false); // Update state to reflect that the trail is no longer saved
        } catch (err) {
            console.error("Error removing from trip:", err);
        }
    };

    return (
        // Button to toggle between saving and removing the trail
        <button
            onClick={isSaved ? handleRemoveTrailFromTrip : handleAddTrailToTrip}
            className={`${style.tripBtn} ${isSaved ? style.saved : ""}`}
            >
            {isSaved ? "Saved" : "Add to Trip"}
        </button>
    );
};

export default TrailTripButton;