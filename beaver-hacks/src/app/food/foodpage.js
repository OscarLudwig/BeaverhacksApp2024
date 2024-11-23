import FoodPlace from "./foodplace";
import { getAllResturants } from "../api/mongoAPI/resturantsAPI"

export default async function FoodPage() {
  let resturants = await getAllResturants();

  return (
    <ul>
      {resturants.map((value, _) => (
        <li>
          <FoodPlace place={value} />
        </li>
      ))}
    </ul>
  );
}
