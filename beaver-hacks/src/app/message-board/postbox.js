"use client"

import { useState } from "react";

export default function PostBox({ enabled }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  async function submit() {
    let res = await fetch("/api/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "createPost", title, body, tags: [] }),
    });

    if (res.ok) {
      // This is kinda dumb
      window.location.reload();
    }
  }

  return (
    <div>
      <input
        type="text"
        value={enabled ? title : "Please login."}
        onChange={(event) => {setTitle(event.target.value)}}
      />
      <button onClick={submit}>Submit</button>
      <br />
      <textarea
        rows="4"
        cols="50"
        value={enabled ? body : "Please login."}
        onChange={(event) => {setBody(event.target.value)}}
      />
    </div>
  );
}