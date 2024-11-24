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
      <span>by {author} with {votes} votes</span>
      <button disabled={upVote || !loggedin} onClick={() => vote(true)}>Up</button>
      <button disabled={downVote || !loggedin} onClick={() => vote(false)}>Down</button>
      <br />
      {/* Put this in the backend */}
      <p>{body.substring(0, 1024)}</p>
    </div>
  );
}