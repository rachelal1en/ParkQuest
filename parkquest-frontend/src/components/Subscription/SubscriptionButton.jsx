import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../Subscription/SubscriptionButton.module.css";

const SubscriptionButton = ({ userId, parkCode }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const storedUserId = localStorage.getItem("userId");
  if (!userId) userId = storedUserId;

  useEffect(() => {
    const checkIfSubscribed = async () => {
      try {
        const response = await axios.get("http://localhost:8081/subscriptions/check", {
          params: { userId, parkCode },
        });
        setIsSubscribed(response.data.subscribed);
      } catch (error) {
        console.error("Error checking subscription status:", error);
      }
    };

    checkIfSubscribed();
  }, [userId, parkCode]);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post("http://localhost:8081/subscriptions/subscribe", {
        userId,
        parkCode,
      });
      setIsSubscribed(true);
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={isSubscribed}
      className={`${style["subscription-button"]} ${isSubscribed ? style["subscribed"] : ""}`} // Apply the dynamic class
      id={style.parkBtn} // Use the custom id for styling if needed
    >
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscriptionButton;
