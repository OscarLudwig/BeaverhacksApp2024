"use client"

import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import PostBox from "./postbox";
import Message from "./message";

export default function ClientPage({ posts }) {
  // Enabled really should be a prop
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    setEnabled(Cookie.get('auth_token'));
  }, []);

  return (
    <div>
      {posts.map((value, index) => (
        <Message key={index} title={value.title} author={value.author} body={value.body} />
      ))}
      <PostBox enabled={enabled} />
    </div>
  );
}