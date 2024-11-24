export default function FoodPlace(props) {
  return (
    <div className="foodplace">
      <div className="foodpic">
        {props.photo != null ? (
          <img src={`/${props.photo}.jpg`} alt="Food" />
        ) : "no photo id"}
      </div>
      <div className="foodtext">
        <span className="foodtitle">
          {props.name}
        </span>
        <br/>
        <span className="hoursratings">
          {(props.openingHour != null && props.closingHour != null) ?
          <span>Hours: {props.openingHour} to {props.closingHour}</span> :
          <span>Closed today</span> }
          <span className="rating">
            {"★".repeat(Math.round(props.rating))} {/* Render the stars */}
          </span>
        </span>
      </div>
      

    </div>
    
  );
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