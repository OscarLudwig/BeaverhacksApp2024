import { redirect } from 'next/navigation';
// no homepage 2
export default function Home() {
  redirect('/message-board');
}