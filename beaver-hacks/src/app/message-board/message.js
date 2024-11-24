export default function Message({ id, title, author, body, votes, upVote, downVote, loggedin }) {
  async function vote(up) {
    let res = await fetch("/api/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "createVote", postId: id, upVote: up }),
    });

    if (res.ok) {
      // This is very dumb
      // It would be pretty easy just to update this
      window.location.reload();
    }
  }

  return (
    <div>
      <h2>{title}</h2>
      <span>by {author} with {votes} votes</span>
      <button disabled={upVote || !loggedin} onClick={() => vote(true)}>Up</button>
      <button disabled={downVote || !loggedin} onClick={() => vote(false)}>Down</button>
      <br />
      <p>{body}</p>
    </div>
  );
}