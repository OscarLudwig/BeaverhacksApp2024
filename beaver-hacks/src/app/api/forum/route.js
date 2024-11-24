import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createPost, getPosts, vote } from '../mongoAPI/forumAPI';

// TODO: Authentication
export async function POST(req) {
  let user;
  try {
    user = JSON.parse(atob(req.cookies.get('auth_token').value.split('.')[1])).username;
  } catch (error) {
    user = undefined;
  }

  const reqJson = await req.json();
  const { action } = reqJson;

  switch (action) {
    case "createPost":
      if (!user) {
        return NextResponse.json({ message: "Invalid credentials." }, {status: 401});
      }

      const { title, body, tags } = reqJson;
      createPost(user, title, body, tags)

      return NextResponse.json({ message: "Success." }, {status: 200});
    case "createVote":
      if (!user) {
        return NextResponse.json({ message: "Invalid credentials." }, {status: 401});
      }

      const { postId, upvote } = reqJson;
      vote(postId, user, upvote)

      return NextResponse.json({ message: "Success." }, {status: 200});
    case "getPosts":
      const { page, auth_token=undefined } = reqJson;
      if (!user && auth_token) {
        user = JSON.parse(atob(auth_token.split('.')[1])).username;
      }

      let posts = await getPosts(page);
      posts.forEach((value) => {
        value.votes = value.UpVotes.length - value.DownVotes.length;
        value.upVote = value.UpVotes.includes(user);
        value.downVote = value.DownVotes.includes(user);

        value.UpVotes = undefined;
        value.DownVotes = undefined;
      })
      return NextResponse.json({ message: posts }, {status: 200});
  }
}
