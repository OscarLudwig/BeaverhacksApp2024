import ClientFoodPage from "./clientfoodpage";

export default async function FoodPage() {
  const response = await fetch(process.env.URL + "/api/restaurants");
  const restaurants = (await response.json()).message;

  return (
    <ClientFoodPage restaurants={restaurants}/>
  );
}
