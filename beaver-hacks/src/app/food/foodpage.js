import FoodPlace from "./foodplace";
import { getAllResturants } from "../api/mongoAPI/resturantsAPI"

export default async function FoodPage() {
  let resturants = await getAllResturants();

  return (
    <div>
      {resturants.map((value, _) => (
        <FoodPlace name={value.Name} openHour={value.OpeningHour} closingHour={value.ClosingHour}
          rating={value.Rating} numberOfRatings={value.NumberOfRatings} description={value.description} />
      ))}
    </div>
  );
}
