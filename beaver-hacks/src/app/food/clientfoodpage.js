"use client"

import { useState } from "react";
import FoodPlace from "./foodplace";
import styles from './food.module.css';

function isOpen(day, hour, restaurant) {
  if (restaurant.OpeningHour[day] == null) {
    return false
  }

  if (Array.isArray(restaurant.OpeningHour[day])) {
    return restaurant.OpeningHour[day].some((value, index) => value <= hour && restaurant.ClosingHour[day][index] >= hour)
  }

  return restaurant.OpeningHour[day] <= hour && restaurant.ClosingHour[day] >= hour
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

export default function ClientFoodPage({ restaurants, foodReviews }) {
  const [currentlyOpen, setCurrentlyOpen] = useState(false);
  const now = new Date();
  const day = (now.getDay() + 6) % 7
  const hour = now.getHours()

  return (
    <div>
      <br />
      <div className={styles.mainContainer}>
        <div className={styles.leftSide}>
  
          <span className={styles.currentlyOpen}>{"Currently Open Only  " }     

            <label id="showall" className={styles.switch}>
            <input className={styles.switchinput} type="checkbox" checked={currentlyOpen} onChange={() => {setCurrentlyOpen(!currentlyOpen)}} />
            <span className={styles.switchslider}></span>
          </label>   
             
          </span>
          
          <br />
          <div className={styles.foodplaces}>
            {/* {restaurants.filter((value) => !currentlyOpen || isOpen(day, hour, value)).map((value, index) => (
              <FoodPlace key={index} name={value.Name} openingHour={value.OpeningHour[day]} closingHour={value.ClosingHour[day]}
                rating={value.Rating} numberOfRatings={value.NumberOfRatings} description={value.description} photo={value.photoId} isOpen={isOpen(day, hour, value)} />
            ))} */}
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
            {[...foodReviews].reverse().map((value, index) => (
              <div key={index} className={styles.foodreview}>
                <span className={styles.timestamp}>{formatTimestamp(value.TimeStamp)}</span>
                <span className={styles.restaurant}>{value.Restaurant}</span>
                <span className={styles.title}>{value.Title}</span>
                <span className={styles.rating}>
                  Rating: {value.Rating + " " + "★".repeat(Math.round(value.Rating))}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}