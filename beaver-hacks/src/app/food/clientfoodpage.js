"use client"

import { useState } from "react";
import FoodPlace from "./foodplace";

function isOpen(day, hour, restaurant) {
  return restaurant.OpeningHour[day] <= hour && restaurant.ClosingHour[day] >= hour
}

export default function ClientFoodPage({ restaurants }) {
  const [openOnly, setOpenOnly] = useState(true);
  const now = new Date();
  const day = (now.getDay() + 6) % 7
  const hour = now.getHours()

  return (
    <div>
      <span>Only Open</span>
      <br />
      <label id="showall" className="switch">
        <input className="switchinput" type="checkbox" checked={openOnly} onChange={() => {setOpenOnly(!openOnly)}} />
        <span className="switchslider"></span>
      </label>
      <br />
      <div className="foodplaces">
        {restaurants.filter((value) => !openOnly || isOpen(day, hour, value)).map((value, index) => (
          <FoodPlace key={index} name={value.Name} openingHour={value.OpeningHour[day]} closingHour={value.ClosingHour[day]}
            rating={value.Rating} numberOfRatings={value.NumberOfRatings} description={value.description} />
        ))}
      </div>
    </div>
  );
}
