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

                const response = await axios.get(`http://localhost:8081/trips/user/${userId}`);
                const trips = response.data;

                if (trips && trips.some((trip) => trip.parkCode === parkCode)) {
                    setIsTripPlanned(true);
                }
            } catch (err) {
                console.error("Error fetching trips:", err);
            }
        };

        checkIfTripPlanned();
    }, [parkCode]);

    const handlePlanTrip = async () => {
        try {
            const payload = {
                userId,
                parkCode,
                parkName: fullName,
                parkDescription: description,
                zipcode: postalCode, // Assuming the park object contains a `postalCode` field
            };
            console.log("Trip Payload:", payload);

            await axios.post(`http://localhost:8081/trips/${parkCode}`, payload);
            setIsTripPlanned(true);
        } catch (err) {
            console.error("Error planning a trip:", err);
        }
    };

    const handleCancelTrip = async () => {
        try {
            const tripResponse = await axios.get(`http://localhost:8081/trips/user/${userId}`);
            const tripToDelete = tripResponse.data.find((trip) => trip.parkCode === parkCode);

            if (tripToDelete) {
                await axios.delete(`http://localhost:8081/trips/${tripToDelete.tripId}`);
                setIsTripPlanned(false);
            } else {
                console.error("Trip not found to delete.");
            }
        } catch (err) {
            console.error("Error canceling the trip:", err);
        }
    };

    return (
        <button
            onClick={isTripPlanned ? handleCancelTrip : handlePlanTrip}
            className={style.tripBtn}
        >
            {isTripPlanned ? "Remove Trip" : "Plan a Trip"}
        </button>
    );
};

export default TripButton;
