import styles from "./events.module.css";

export default function CampusEvent(props) {
  return (
    <div className={styles.campusevent}>
  <a className={styles.campustitle} href={props.link}>
    {props.title}
  </a>
  <br />
  <span className={styles.campusdesc}>by {props.name}</span>
  <br />
  <span className={styles.campusdesc}>
    {new Date(Date.parse(props.date)).toDateString()}
  </span>
</div>

  );
}
