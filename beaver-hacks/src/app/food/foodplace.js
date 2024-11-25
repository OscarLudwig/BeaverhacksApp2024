import styles from './food.module.css';

export default function FoodPlace(props) {
  return (
    <div className={styles.foodplace}>
      <div className={styles.foodtext}>
        <span className={styles.foodtitle} >
          {props.name + " "}
        </span>
        <br/>
          <span className="rating">
             {props.rating + " " + "★".repeat(Math.round(props.rating))}
          </span>
        <br/>
        <span className={"cloasedColor"}>
          {(props.openingHour != null && props.closingHour != null) ?
          <span style={props.isOpen ? { color: '#72d672' } : { color: 'red' }}>{displayHourString(props.openingHour, props.closingHour)}</span> :
          <span style={{ color: 'red' }}>Closed today</span> }
        </span>
      </div>
    </div>
    
  );
}


function displayHourString(openingHour, closingHour) {
  if (!Array.isArray(openingHour)) {
    return hourToString(openingHour) + " - " + hourToString(closingHour);
  } else {
    return openingHour.map((value, index) => hourToString(value) + " - " + hourToString(closingHour[index])).join(", ");
  }
}

function hourToString(hour) {
  let minutes = (hour % 1) * 60;
  // convert minutes to be two digits and a string
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
  if (hour < 12) {
    hour = Math.floor(hour);
    return `${hour}:${minutes} AM`;
  } else if (hour < 13) {
    hour = 12;
    return `${hour}:${minutes} PM`;
  } else {
    hour = Math.floor(hour) - 12;
    return `${hour}:${minutes} PM`;
  }
}

/*

{(props.openingHour != null && props.closingHour != null) ?
  <span>Hours: {props.openingHour} to {props.closingHour}</span> :
  <span>Closed today</span> }

  ★

  */

/*
<p>{props.rating} star from {props.numberOfRatings} ratings.</p>
<p>{props.description}</p>
*/