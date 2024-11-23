import FoodPlace from "./foodplace";
import { getAllResturants } from "../api/mongoAPI/resturantsAPI"

export default async function FoodPage() {
  let resturants = await getAllResturants();

  return (
    <div>
      {resturants.map((value, index) => (
        <FoodPlace key={index} name={value.Name} openingHour={value.OpeningHour} closingHour={value.ClosingHour}
          rating={value.Rating} numberOfRatings={value.NumberOfRatings} description={value.description} />
      ))}
    </div>
  );
}
