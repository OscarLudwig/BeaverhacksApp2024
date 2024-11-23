export default function FoodPlace(props) {
  return (
    <div className="foodplace">
      <span className="foodtitle">{props.name}</span>
      <br />
      <br />
      <span>Hours: {props.openingHour} to {props.closingHour}</span>
      <br />
      <p>{props.rating} star from {props.numberOfRatings} ratings.</p>
      <p>{props.description}</p>
    </div>
  );
}
