"use client"

import { useState } from "react";
import styles from "./messageboard.module.css"

export default function PostBox({ enabled }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(true);

  async function submit() {
    let res = await fetch("/api/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "createPost", title, body, tags: [] }),
    });

    if (res.ok) {
      setButtonEnabled(false);

      // This is kinda dumb
      setInterval(() => window.location.href = '/message-board', 1000);
    }
  }

  return (
    <div>
      <input
        className={styles.titleinput}
        type="text"
        value={enabled ? title : "Please login."}
        placeholder={enabled ? "New post title" : undefined}
        onChange={(event) => setTitle(event.target.value.replace('\n', '').substring(0, 8))}
      />
      <button className={styles.boardbutton} disabled={!enabled || !buttonEnabled} onClick={submit}>Submit</button>
      <br />
      <textarea
        style={{marginBottom: 100, maxWidth: 1000}}
        className={styles.titleinput}
        rows="8"
        cols="100"
        value={enabled ? body : "Please login."}
        placeholder={enabled ? "What's on your mind?" : undefined}
        onChange={(event) => setBody(event.target.value.replace('\n', '').substring(0, 1024))}
      />
    </div>
  );
}