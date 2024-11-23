import Image from 'next/image'

export default function FoodPlace(props) {
  let place = props.place

  return (
    <div className="foodplace">
      <span>{place.Name}</span>
      <br></br>
      <span>Hours: {place.OpeningHour} to {place.ClosingHour}</span>
      <br></br>
      <p>{place.Rating} from {place.NumberOfRatings}</p>
      <br></br>
      <p>{place.Description}</p>
    </div>
  );
}
