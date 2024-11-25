import { redirect } from 'next/navigation';
// no homepage 1
export default function Home() {
  redirect('/message-board');
}