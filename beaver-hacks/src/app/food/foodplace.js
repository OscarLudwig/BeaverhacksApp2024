import Image from 'next/image'

export default function FoodPlace(props) {
  return (
    <div className="foodplace">
      <a href={props.url}>{props.title}</a>
      <br></br>
      <br></br>
      <span>Hours: {props.hoursStart} to {props.hoursEnd}</span>
      <br></br>
      <p>{props.description}</p>
    </div>
  );
}
