import FoodPlace from "./foodplace";
import { getAllResturants } from '';

export default function FoodPage() {
  let resturants = getAllResturants();

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
