"use client"

import { useState } from "react";
import styles from "./messageboard.module.css"

export default function Message({ id, title, author, body, inVotes, inUpVote, inDownVote, loggedin }) {
  const [votes, setVotes] = useState(inVotes);
  const [upVote, setUpVote] = useState(inUpVote);
  const [downVote, setDownVote] = useState(inDownVote)

  async function vote(up) {
    if (!loggedin) {
      window.location.href = '/register';
      return;
    }

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
      <div className={styles.messageheader}>
        {/* Put this in the backend and make this multiline */}
        <h2>{title.substring(0, 8)}</h2>
        <span className={styles.votes} style={{color: votes < 0 ? "red" : "green"}}>{votes}</span>
        <h5 style={{margin: 0}}>by {author.substring(0, 10)}</h5>

        <div>
          <button className={styles.vote} disabled={downVote} onClick={() => vote(false)}>👎</button>
          <button className={styles.vote} disabled={upVote} onClick={() => vote(true)}>👍</button>
        </div>
      </div>
      <br />
      {/* Put this in the backend */}
      <p>{body.substring(0, 1024)}</p>
    </div>
  );
}