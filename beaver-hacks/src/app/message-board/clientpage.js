"use client"

import { useMemo } from "react";
import PostBox from "./postbox";
import Message from "./message";

export default function ClientPage({ posts }) {
  // This should maybe be a prop
  const username = useMemo(() => {
    try {
      return JSON.parse(atob(token.split('.')[1])).username;
    } catch (error) {
      return undefined;
    }
  })

  return (
    <div>
      {posts.map((value, index) => (
        <Message key={index} id={value._id} title={value.title} author={value.author} body={value.body}
          votes={value.votes} upVote={value.upVote} downVote={value.downVote} loggedin={username !== undefined} />
      ))}
      <PostBox enabled={username} />
    </div>
  );
}