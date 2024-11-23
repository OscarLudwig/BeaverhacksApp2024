import FoodPlace from "./foodplace";

export default async function FoodPage() {
  const response = await fetch(process.env.URL + "/api/restaurants");
  const restaurants = (await response.json()).message;

  return (
    <div>
      {restaurants.map((value, index) => (
        <FoodPlace key={index} name={value.Name} openingHour={value.OpeningHour} closingHour={value.ClosingHour}
          rating={value.Rating} numberOfRatings={value.NumberOfRatings} description={value.description} />
      ))}
    </div>
  );
}
