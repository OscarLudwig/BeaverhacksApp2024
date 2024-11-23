import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <Link href="/about" className="hover:underline">
        About
      </Link>
    </footer>
  );
}