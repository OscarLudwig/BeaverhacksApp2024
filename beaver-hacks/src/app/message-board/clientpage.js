"use client"

import PostBox from "./postbox";
import Message from "./message";
import styles from "./messageboard.module.css"

export default function ClientPage({ posts, page, username }) {
  function switchPage(newPage) {
    window.location.href = `/message-board?page=${newPage}`;
  }

  return (
    <div>
      <button className={styles.boardbutton} onClick={() => switchPage(page <= 1 ? 0 : page - 1)}>Previous</button>
      <button className={styles.boardbutton} onClick={() => switchPage(page + 1)}>Next</button>
      <div className={styles.messageboard}>
        {posts.map((value, index) => (
          <Message key={index} id={value._id} title={value.title} author={value.author} body={value.body}
            inVotes={value.votes} inUpVote={value.upVote} inDownVote={value.downVote} loggedin={username !== undefined} />
        ))}
      </div>
      <PostBox enabled={username} />
    </div>
  );
}