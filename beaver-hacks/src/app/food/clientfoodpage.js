"use client";

import { useState } from "react";
import FoodPlace from "./foodplace";
import styles from "./food.module.css";

function isOpen(day, hour, restaurant) {
  if (restaurant.OpeningHour[day] == null) {
    return false;
  }
  return restaurant.OpeningHour[day] <= hour && restaurant.ClosingHour[day] >= hour;
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export default function ClientFoodPage({ restaurants, foodReviews }) {
  const [currentlyOpen, setCurrentlyOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    Restaurant: "",
    Title: "",
    Rating: 1,
    Description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const now = new Date();
  const day = (now.getDay() + 6) % 7;
  const hour = now.getHours();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/foodReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          TimeStamp: new Date(), // Include the current timestamp
        }),
      });


      if (response.ok) {
        setSuccessMessage("Review submitted successfully!");
        setDisabled(true);
        // This is kinda dumb
        setInterval(() => window.location.href = '/food', 1000);
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.error || "An error occurred while submitting the review. Login if you haven't already."
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred while submitting the review. Login if you haven't already.");
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      <br />
      <div className={styles.mainContainer}>
        <div className={styles.leftSide}>
          <span className={styles.currentlyOpen}>
            {"Currently Open Only  "}
            <label id="showall" className={styles.switch}>
              <input
                className={styles.switchinput}
                type="checkbox"
                checked={currentlyOpen}
                onChange={() => {
                  setCurrentlyOpen(!currentlyOpen);
                }}
              />
              <span className={styles.switchslider}></span>
            </label>
          </span>

          <br />
          <div className={styles.foodplaces}>
            {restaurants
              .filter((value) => !currentlyOpen || isOpen(day, hour, value))
              .map((value, index) => (
                <FoodPlace
                  key={index}
                  name={value.Name}
                  openingHour={value.OpeningHour[day]}
                  closingHour={value.ClosingHour[day]}
                  rating={value.Rating}
                  numberOfRatings={value.NumberOfRatings}
                  description={value.description}
                  photo={value.photoId}
                  isOpen={isOpen(day, hour, value)}
                />
              ))}
          </div>
        </div>

        <div className={styles.rightSide}>
          <span className={styles.foodReviews}>Recent Food Reviews</span>
          <div className={styles.foodreviews}>
            {[...foodReviews]
              // This should be server side slice
              .reverse()
              .slice(0, 12)
              .map((value, index) => (
              <div key={index} className={styles.foodreview}>
                <span className={styles.timestamp}>{formatTimestamp(value.TimeStamp)}</span>
                <span className={styles.restaurant}>{value.Restaurant.substring(0, 24)}</span>
                <span className={styles.title}>{value.Title.substring(0, 64)}</span>
                {value.Description && (
                  <span className={styles.description}>{value.Description}</span>
                )}
                <span className={styles.rating}>
                  Rating: {value.Rating + " " + "★".repeat(Math.round(value.Rating))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Submission Form */}
      <div className={styles.formContainer}>
        <h2>Submit a Review</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="Restaurant">Restaurant Name:</label>
            <input
              type="text"
              id="Restaurant"
              name="Restaurant"
              value={formData.Restaurant}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label htmlFor="Title">Review Description:</label>
            <input
              type="text"
              id="Title"
              name="Title"
              value={formData.Title}
              onChange={handleFormChange}
              required
            />
          </div>
          <div>
            <label htmlFor="Rating">Rating (1-5):</label>
            <input
              type="number"
              id="Rating"
              name="Rating"
              value={formData.Rating}
              onChange={handleFormChange}
              min="1"
              max="5"
              required
            />
          </div>
          <button disabled={disabled} type="submit">Submit</button>
        </form>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
}
