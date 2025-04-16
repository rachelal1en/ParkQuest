import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../Trips.module.css";

const TripButton = ({ userId, parkCode, fullName, description, postalCode }) => {
    const [isTripPlanned, setIsTripPlanned] = useState(false);

    const storedUserId = localStorage.getItem("userId");
    if (!userId) userId = storedUserId;

    // Check if a trip is already planned for this parkCode
    useEffect(() => {
        const checkIfTripPlanned = async () => {
            try {
                if (!userId) {
                    console.error("User ID is missing. Please log in or pass userId as a prop.");
                    return;
                }

                // Fetch all trips for the user
                const response = await axios.get(`http://localhost:8081/trips/user/${userId}`);
                const trips = response.data;

                // Check if there is already a trip for the provided parkCode
                if (trips && trips.some((trip) => trip.parkCode === parkCode)) {
                    setIsTripPlanned(true); // Update state to indicate the trip is planned
                }
            } catch (err) {
                console.error("Error fetching trips:", err); // Log any errors during trip retrieval
            }
        };

        checkIfTripPlanned();
    }, [parkCode]); //reruns if parkcode changes

    //function to plan a trip for the park
    const handlePlanTrip = async () => {
        try {
            const payload = {
                userId,
                parkCode,
                parkName: fullName,
                parkDescription: description,
                zipcode: postalCode, // Assuming the park object contains a `postalCode` field
            };
            console.log("Trip Payload:", payload); //log payload

            // Create a new trip by sending a POST request
            await axios.post(`http://localhost:8081/trips/${parkCode}`, payload);
            setIsTripPlanned(true);
        } catch (err) {
            console.error("Error planning a trip:", err);
        }
    };

    // Function to cancel a planned trip
    const handleCancelTrip = async () => {
        try {
            // Fetch all trips for the user to find the trip to cancel
            const tripResponse = await axios.get(`http://localhost:8081/trips/user/${userId}`);
            const tripToDelete = tripResponse.data.find((trip) => trip.parkCode === parkCode); // Find trip by parkCode

            if (tripToDelete) {
                // Found a trip; send DELETE request using the tripId
                await axios.delete(`http://localhost:8081/trips/${tripToDelete.tripId}`);
                setIsTripPlanned(false); // Update local state to indicate trip is no longer planned
            } else {
                console.error("Trip not found to delete."); // Log an error if no trip is found
            }
        } catch (err) {
            console.error("Error canceling the trip:", err); // Log error if trip cancellation fails
        }
    };

    return (
        // button that toggles between planning and canceling a trip
        <button
            onClick={isTripPlanned ? handleCancelTrip : handlePlanTrip}
            className={style.tripBtn}
        >
            {isTripPlanned ? "Remove Trip" : "Plan a Trip"}
        </button>
    );
};

export default TripButton;
