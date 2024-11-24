export default function Message({ title, author, body, votes, deletable }) {
  async function destroy() {
    let res = await fetch("/api/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "deletePost",  }),
    });

    if (res.ok) {
      // This is kinda dumb
      window.location.reload();
    }
  }

  return (
    <div>
      <h2>{title}</h2>
      <span>{author}</span>
      <span>{votes}</span>
      { deletable && <button>Delete</button> }
      <br />
      <p>{body}</p>
    </div>
  );
}