"use client"

import { useState } from "react";
import styles from "./messageboard.module.css"

export default function Message({ id, title, author, body, inVotes, inUpVote, inDownVote, loggedin }) {
  const [votes, setVotes] = useState(inVotes);
  const [upVote, setUpVote] = useState(inUpVote);
  const [downVote, setDownVote] = useState(inDownVote)

  async function vote(up) {
    let res = await fetch("/api/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "createVote", postId: id, upVote: up }),
    });

    if (res.ok) {
      let votesChange = 0;
      if (upVote) {
        votesChange = -1;
      }

      if (downVote) {
        votesChange = 1;
      }

      if (up) {
        setVotes(votes + votesChange + 1);
        setUpVote(true);
        setDownVote(false);
      } else {
        setVotes(votes + votesChange - 1);
        setUpVote(false);
        setDownVote(true);
      }
    }
  }

  return (
    <div className={styles.message}>
      <h2>{title}</h2>
      <h4>by {author}</h4>
      <button className={styles.upVote} disabled={upVote || !loggedin} onClick={() => vote(true)} />
      <span style={{ color: votes < 0 ? "red" : "green", fontSize: 35  }}>{votes}</span>
      <button className={styles.downVote} disabled={downVote || !loggedin} onClick={() => vote(false)} />
      <br />
      {/* Put this in the backend */}
      <p>{body.substring(0, 1024)}</p>
    </div>
  );
}