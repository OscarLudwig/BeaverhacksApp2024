import TitleBar from "../titlebar";
import ClientPage from "./clientpage";

export default async function MessageBoard() {
  const response = await fetch(process.env.URL + "/api/forum", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "getPosts", page: 0 }),
  });
  const posts = (await response.json()).message;

  return (
    <div className="container">
      <TitleBar />
      <main className="main">
        <h1>Message Board</h1>
        <ClientPage posts={posts} />
      </main>
    </div>
  );
}