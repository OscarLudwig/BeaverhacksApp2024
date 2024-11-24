import ClientFoodPage from "./clientfoodpage";

export default async function FoodPage() {
  const response = await fetch(process.env.URL + "/api/restaurants");
  const restaurants = (await response.json()).message;
  const foodReview = await fetch(process.env.URL + "/api/foodReview");
  const foodReviews = (await foodReview.json()).message;

  return (
    <ClientFoodPage restaurants={restaurants} foodReviews={foodReviews}/>
  );
}
