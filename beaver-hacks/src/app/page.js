import { redirect } from 'next/navigation';
// no homepage
export default function Home() {
  redirect('/message-board');
}