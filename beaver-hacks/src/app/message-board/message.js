export default function Message({ title, author, body }) {
  return (
    <div>
      <h2>{title}</h2>
      <span>{author}</span>
      <br />
      <p>{body}</p>
    </div>
  );
}