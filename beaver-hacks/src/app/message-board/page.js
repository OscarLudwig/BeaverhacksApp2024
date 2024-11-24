import TitleBar from "../titlebar";
import ClientPage from "./clientpage";
import { cookies } from "next/headers";

export default async function MessageBoard() {
  let token = (await cookies()).get('auth_token');
  if (token) {
    token = token.value;
  }

  const response = await fetch(process.env.URL + "/api/forum", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "getPosts", page: 0, auth_token: token }),
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