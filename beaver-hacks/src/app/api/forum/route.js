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
      const { page } = reqJson;
      return NextResponse.json({ message: await getPosts(page) }, {status: 200});
  }
}
