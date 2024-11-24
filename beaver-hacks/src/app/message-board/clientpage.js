"use client"

import { memo } from "react";
import PostBox from "./postbox";
import Message from "./message";

export default function ClientPage({ posts }) {
  // This should maybe be a prop
  const username = memo(() => {
    try {
      return JSON.parse(atob(token.split('.')[1])).username;
    } catch (error) {
      return undefined;
    }
  })

  console.log(posts[0])

  return (
    <div>
      {posts.filter((value) => value.author == "test22").map((value, index) => (
        <Message key={index} title={value.title} author={value.author} body={value.body} votes={value.votes} />
      ))}
      <PostBox enabled={username} />
    </div>
  );
}