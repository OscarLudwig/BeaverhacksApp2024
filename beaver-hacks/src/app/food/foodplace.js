import Image from 'next/image'

export default function FoodPlace(props) {
  return (
    <div className="foodplace">
      <span>{props.title}</span>
      <br></br>
      <Image src={props.image} width={100} height={100}/>
      <br></br>
      <span>Hours: {props.hoursStart} to {props.hoursEnd}</span>
      <br></br>
      <p>{props.description}</p>
    </div>
  );
}
