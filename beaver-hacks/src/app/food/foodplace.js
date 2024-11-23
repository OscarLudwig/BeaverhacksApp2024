import Image from 'next/image'

export default function FoodPlace(props) {
  let place = props.place

  return (
    <div className="foodplace">
      <span>{place.Name}</span>
      <br />
      <span>Hours: {place.OpeningHour} to {place.ClosingHour}</span>
      <br />
      <p>{place.Rating} star from {place.NumberOfRatings} ratings.</p>
      <p>{place.Description}</p>
    </div>
  );
}
