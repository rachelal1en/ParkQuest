import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import style from "./TripDetails.module.css";

const TemperatureChart = ({ zipcode, startDate, endDate }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [temperatureData, setTemperatureData] = useState(null);

    // Adjust startDate and endDate to the year 2024
    const get2024Dates = (date) => {
        if (!date) return null;
        const [year, month, day] = date.split("-");
        return `2024-${month}-${day}`; // Replace the year, keep month and day
    };
    const adjustedStartDate = get2024Dates(startDate);
    const adjustedEndDate = get2024Dates(endDate);

    // Fetch temperature data when the component mounts or when inputs change
    useEffect(() => {
        // Return early if a required prop is missing
        if (!zipcode || !adjustedStartDate || !adjustedEndDate) {
            setLoading(false); // Stop loading if data fetching is skipped
            return;
        }

        const fetchTemperatureData = async () => {
            setLoading(true); // Start loading
            setError(null); // Reset errors

            // Build API request URL using input values
            const apiKey = "T7W9NDKHH9TZ38QGEC8VR6SSL";
            const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;
            const requestUrl = `${baseUrl}${zipcode}/${adjustedStartDate}/${adjustedEndDate}?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin&include=obs%2Cdays&key=${apiKey}&contentType=json`;

            try {
                    const response = await axios.get(requestUrl);
                    console.log("Fetched temperature data:", response.data);

                    //validate response and parse data
                    if (!response.data || !response.data.days || response.data.days.length === 0) {
                        throw new Error("No temperature data available in response.");
                    }

                    //extract data from response
                    const forecastData = response.data.days.map((day) => ({
                        date: day.datetime,
                        minTemp: day.tempmin,
                        maxTemp: day.tempmax,
                    }));

                    setTemperatureData(forecastData);
                } catch (err) {
                    console.error("Error fetching temperature data:", err);
                    setError("Failed to fetch temperature data.");
                } finally {
                    setLoading(false); //stop loading
                }
        };

        fetchTemperatureData();
    }, [zipcode, startDate, endDate]); //refetch when inputs change

    // Process temperature data into a format suitable for Chart.js
    const processChartData = () => {
        // Safeguard against null, undefined, or empty temperatureData
        if (!temperatureData || temperatureData.length === 0) {
            console.warn("No temperature data available to process.");
            return null;
        }

        // Extract labels and temperature values from the raw data
        const labels = temperatureData.map((entry) => entry.date || "Unknown"); // Avoid undefined dates
        const maxTemps = temperatureData.map((entry) => entry.maxTemp || 0);
        const minTemps = temperatureData.map((entry) => entry.minTemp || 0);

        return {
            labels,
            datasets: [
                {
                    label: "Max Temperature",
                    data: maxTemps,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
                {
                    label: "Min Temperature",
                    data: minTemps,
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                },
            ],
        };
    };

    // Generate the chart data when temperatureData changes
    useEffect(() => {
        if (temperatureData) {
            const data = processChartData(); // Process raw data into chart-compatible format
            setChartData(data); // Update chart data state
        }
    }, [temperatureData]);

    // Return early without rendering the chart if required inputs are missing
    if (!zipcode || !startDate || !endDate) {
        return null; // Simply render nothing
    }

    // Render a loading message while data is being fetched
    if (loading) {
        return <p>Loading temperature data...</p>;
    }

    // Render an error message if there's an issue fetching data
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    // Render a fallback message if chart data isn't available
    if (!chartData) {
        return <p>No temperature data is available for the selected dates.</p>;
    }

    // Render the Line chart with processed data and options for layout
    return (
        <div className={style.chartContainer}>

        <Line
                data={processChartData()}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Date",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Temperature (°F)",
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default TemperatureChart;

