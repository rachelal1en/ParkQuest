import React, { useState } from "react";
import axios from "axios";
import style from "../ParkDetail/ParkDetail.module.css" // Adjust if your CSS module name is different

const SubscriptionButton = ({ userId, parkCode }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    const payload = { userId, parkCode };

    try {
      await axios.post("http://localhost:8081/subscriptions/subscribe", payload, {
            userId,
            parkCode,
        headers: { "Content-Type": "application/json" },
      });

      setSubscribed(true);
      setError("");
    } catch (err) {
      console.error("Subscription error:", err);
      setError("Subscription failed.");
    }
  };

  return (
    <>
      <button
        onClick={handleSubscribe}
        className={style.parkBtn}
        disabled={subscribed}
      >
        {subscribed ? "Subscribed!" : "Subscribe"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default SubscriptionButton;

