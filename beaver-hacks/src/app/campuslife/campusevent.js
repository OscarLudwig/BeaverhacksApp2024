export default function CampusEvent(props) {
  return (
    <div className="campusevent">
      <a className="campustitle" href={props.link}>{props.title}</a>
      <br></br>
      <span>by {props.name}</span>
    </div>
  );
}