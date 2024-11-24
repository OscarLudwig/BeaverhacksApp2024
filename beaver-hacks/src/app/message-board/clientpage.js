"use client"

import { useEffect, useState } from "react";
import PostBox from "./postbox";
import Message from "./message";
import Cookie from "js-cookie";

export default function ClientPage({ posts, page }) {
  // This should maybe be a prop
  const [username, setUsername] = useState(undefined);

  useEffect(() => {
    try {
      const token = Cookie.get('auth_token');
      setUsername(JSON.parse(atob(token.split('.')[1])).username)
    } catch (error) {
      setUsername(undefined);
    }
  });

  function switchPage(newPage) {
    window.location.href = `/message-board?page=${newPage}`;
  }

  return (
    <div>
      {posts.map((value, index) => (
        <Message key={index} id={value._id} title={value.title} author={value.author} body={value.body}
          votes={value.votes} upVote={value.upVote} downVote={value.downVote} loggedin={username !== undefined} />
      ))}
      <PostBox enabled={username} />
      <button onClick={() => switchPage(page <= 1 ? 0 : page - 1)}>Previous</button>
      <button onClick={() => switchPage(page + 1)}>Next</button>
    </div>
  );
}