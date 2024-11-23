export default function FoodPlace(props) {
  return (
    <div className="foodtitle">
      <span className="title">{props.name}</span>
      <br />
      <br />
      <span>Hours: {props.openingHour} to {props.closingHour}</span>
      <br />
      <p>{props.rating} star from {props.numberOfRatings} ratings.</p>
      <p>{props.description}</p>
    </div>
  );
}
