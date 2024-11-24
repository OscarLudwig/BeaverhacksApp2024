import ClientTitleBar from "./clienttitlebar";
import { cookies } from "next/headers";

export default async function TitleBar() {
  let token = (await cookies()).get('auth_token');
  let username = undefined
  if (token) {
    token = token.value;
    try {
      username = JSON.parse(atob(token.split('.')[1])).username;
    } catch (error) {
      username = undefined
    }
  }

  return (
    <ClientTitleBar username={username}/>
  );
}