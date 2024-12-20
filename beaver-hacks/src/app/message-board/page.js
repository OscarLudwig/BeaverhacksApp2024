import Footer from "../footer";
import TitleBar from "../titlebar";
import ClientPage from "./clientpage";
import { cookies } from "next/headers";

export default async function MessageBoard({ searchParams }) {
  let page;
  try {
    page = parseInt((await searchParams).page)
  } catch(error) {
    page = 0;
  }

  if (isNaN(page)) {
    page = 0;
  }

  let token = (await cookies()).get('auth_token');
  let username = undefined;
  if (token) {
    token = token.value;
    try {
      username = JSON.parse(atob(token.split('.')[1])).username
    } catch (error) {
      username = undefined;
    }
  }

  const response = await fetch(process.env.URL + "/api/forum", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "getPosts", page, auth_token: token }),
  });
  const posts = (await response.json()).message;

  return (
    <div className="container">
      <TitleBar />
      <main className="main">
        <h1>Message Board</h1>
        <ClientPage posts={posts} page={page} username={username} />
      </main>
      <Footer />
    </div>
  );
}