import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import style from "./TripDetails.module.css";
import TemperatureChart from "./TemperatureChart";


export default function TripDetails() {
    const {tripId} = useParams(); // Extract the tripId from the route parameters
    const navigate = useNavigate();

    //State management
    const [trip, setTrip] = useState(location.state?.trip); // Local copy of trip data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch trip details on component load or when tripId changes
    useEffect(() => {
        const fetchTrip = async () => {
            setLoading(true); // Start loading
            setError(null); // Clear any previous errors

            try {
                console.log(`Fetching trip with tripId: ${tripId}`); // Debug log
                const response = await axios.get(`http://localhost:8081/trips/${tripId}`);
                console.log(`Trip fetched successfully: `, response.data); // Debug log

                if (response.data) {
                    setTrip(response.data); // Set trip data
                } else {
                    setError("No trip found for the provided trip ID."); // Handle empty data
                }
            } catch (err) {
                console.error("Error fetching trip details:", err); // Debug log
                setError("Failed to load trip details.");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchTrip();
    }, [tripId]); //Re-fetch when tripId changes

    // Navigate back to the previous page
    const goBack = () => {
        navigate(-1);
    };

    // Handle updating the trip start and end dates
    const handleDateUpdate = async (startDate, endDate) => {
        if (!tripId) return; // Ensure tripId exists before making the request

        try {
            const response = await axios.put(
                `http://localhost:8081/trips/${tripId}/dates`,
                {startDate, endDate} //send updated dates to backend
            );
            console.log("Dates updated successfully:", response.data);

            setTrip(response.data); // Update local trip state with the new data
        } catch (err) {
            console.error("Error updating trip dates:", err); //debug log
        }
    };

// Handle clearing trip start and end dates
    const handleDateDelete = async () => {
        if (!tripId) return; // Ensure tripId exists before making the request

        try {
            await axios.delete(`http://localhost:8081/trips/${tripId}/dates`, {
                params: {clearStartDate: true, clearEndDate: true}, //clear dates
            });
            console.log("Dates cleared successfully.");

            setTrip({...trip, startDate: null, endDate: null}); // Clear dates in the local trip state
        } catch (err) {
            console.error("Error clearing trip dates:", err);
        }
    };

    // Handle deleting the trip
    const handleTripDelete = async () => {
        if (!tripId) return; // Ensure tripId exists before making the request

        try {
            await axios.delete(`http://localhost:8081/trips/${tripId}`);
            console.log("Trip deleted successfully.");

            navigate(-1); // Navigate back after deletion
        } catch (err) {
            console.error("Error deleting trip:", err);
        }
    };

    // Function to fetch a park's details by its parkCode
    const fetchParkByParkCode = async (parkCode) => {
        try {
            setError(""); // Clear any existing error
            console.log("Fetching park with parkCode:", parkCode);
            const response = await fetch(
                `http://localhost:8081/lookup?parkCode=${encodeURIComponent(parkCode)}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch park details. Please try again.");
            }

            const data = await response.json();
            return data; // Return the fetched park data
        } catch (err) {
            console.error("Error fetching park details:", err);
            setError(err.message);
            return null;
        }
    };

    // Render loading state if data is being fetched
    if (loading) return <p>Loading trip details...</p>; // Loading indicator
    //Render error message if an error occurred
    if (error) return <p>{error}</p>; // Error message if fetching fails

    return (
        <div className={style.tripDetails}>
            {/* Back button */}
            <button className={style.tripBtn} onClick={goBack}>
                Back to Trips
            </button>

            {/* Trip Information */}
            <h1>{trip.parkName}</h1>
            <p className={style.description}>{trip.parkDescription || "No description available"}</p>

            <h2>Trip Details</h2>
            {trip.zipcode && trip.startDate && trip.endDate ?
                (
                    <>
                        {/* Display temperature chart based on trip ZIP code and dates */}
                        <h3 className={style.chartTitle}>Temperature Data From the Previous Year for the Selected Date
                            Range</h3>
                        <TemperatureChart
                            zipcode={trip.zipcode}
                            startDate={trip.startDate || null}
                            endDate={trip.endDate || null}
                        />
                        <br/>
                        <p>
                            <strong>Start Date:</strong> {trip.startDate || "Not set"}
                        </p>
                        <p>
                            <strong>End Date:</strong> {trip.endDate || "Not set"}
                        </p>
                    </>
                ) : (
                    <>
                        {/* Renders when zipcode or dates are not set */}
                        <p className={style.giveMeDataButton}> Enter a Date Range to Get a Chart of Temperatures for the
                            Park from the Previous Year</p>
                        <br/>
                        <p>
                            <strong>Start Date:</strong> {trip.startDate || "Not set"}
                        </p>
                        <p>
                            <strong>End Date:</strong> {trip.endDate || "Not set"}
                        </p>
                    </>
                )}

            {/* Buttons for managing dates */}
            <div className={style.dateBtns}>
                <button
                    className={style.tripBtn}
                    onClick={() => {
                        const startDate = prompt("Enter Start Date (YYYY-MM-DD):", trip.startDate || "");
                        const endDate = prompt("Enter End Date (YYYY-MM-DD):", trip.endDate || "");
                        if (startDate || endDate) handleDateUpdate(startDate, endDate);
                    }}
                >
                    Add/Edit Dates
                </button>
                <button className={style.tripBtn} onClick={handleDateDelete}>
                    Clear Dates
                </button>
            </div>

            {/* Hiking Trails Section */}
            <h3>Hiking Trails</h3>
            <div className={style.hikingContainer}>
                <p>
                    <strong>Trail:</strong> {trip?.hikingTrail || "No hiking trail information available."}
                </p>
                <p>
                    <strong>Description:</strong> {trip?.trailDescription || "No trail description available."}
                </p>
            </div>

            {/* Campground Section */}
            <h3>Campground</h3>
            <div className={style.campgroundContainer}>
                <p>
                    <strong>Campground:</strong> {trip?.campground || "No campground information available."}
                </p>
                <p>
                    <strong>Description:</strong> {trip?.campgroundDescription || "No campground description available."}
                </p>
            </div>

            {/* Additional navigation buttons */}
            <div className={style.additionalBtns}>
                <button className={style.tripBtn}>
                    <Link
                        to={`/park/hiking/${trip.parkCode}`}// Assuming this route leads to HikingTrails
                        state={{fromTripDetails: true, tripId: trip.tripId, parkName: trip.parkName}} // Pass state
                    >
                        See Hiking Trails in {trip.parkName}
                    </Link>
                </button>
                <button className={style.tripBtn}>
                    <Link
                        to={`/park/campgrounds/${trip.parkCode}`}
                        state={{fromTripDetails: true, tripId: trip.tripId, parkName: trip.parkName}}// Pass state
                    >
                        Find Campgrounds in {trip.parkName}
                    </Link>
                </button>
                <button
                    className={style.tripBtn}
                    onClick={async () => {
                        if (!trip) return; // Ensure trip data exists
                        try {
                            const parkData = await fetchParkByParkCode(trip.parkCode); // Fetch park data
                            if (parkData) {
                                navigate(`/parklist/${trip.parkCode}`, {state: {park: parkData}}); // Pass park data
                            }
                        } catch (err) {
                            console.error("Failed to fetch park data or navigate:", err);
                        }
                    }}
                >
                    View Park Details
                </button>

            </div>

            {/* Delete Trip Button */}
            <button className={style.deleteTripBtn} onClick={handleTripDelete}>
                Delete Trip
            </button>
        </div>
    )
        ;
}
