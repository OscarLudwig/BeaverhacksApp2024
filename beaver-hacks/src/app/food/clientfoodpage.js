"use client"

import { useState } from "react";
import FoodPlace from "./foodplace";
import styles from './food.module.css';

function isOpen(day, hour, restaurant) {
  return restaurant.OpeningHour[day] <= hour && restaurant.ClosingHour[day] >= hour
}

export default function ClientFoodPage({ restaurants }) {
  const [currentlyOpen, setCurrentlyOpen] = useState(false);
  const now = new Date();
  const day = (now.getDay() + 6) % 7
  const hour = now.getHours()

  return (
    <div>
      <span>Currently Open</span>
      <br />
      <label id="showall" className={styles.switch}>
        <input className={styles.switchinput} type="checkbox" checked={currentlyOpen} onChange={() => {setCurrentlyOpen(!currentlyOpen)}} />
        <span className={styles.switchslider}></span>
      </label>
      <br />
      <div className={styles.foodplaces}>
        {restaurants.filter((value) => !currentlyOpen || isOpen(day, hour, value)).map((value, index) => (
          <FoodPlace key={index} name={value.Name} openingHour={value.OpeningHour[day]} closingHour={value.ClosingHour[day]}
            rating={value.Rating} numberOfRatings={value.NumberOfRatings} description={value.description} photo={value.photoId} />
        ))}
      </div>
    </div>
  );
}