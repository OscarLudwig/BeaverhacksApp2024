import Image from "next/image";

export default function TitleBar() {
  return (
    <div className="titlebar">
      <div className="left">
        <a href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={45}
            height={45}
            className="titlebar-logo"
          />
        </a>
        <nav>
          <a href="/" className="hover:underline">Home</a>
          <a href="/message-board" className="hover:underline">Message board</a>
          <a href="/food" className="hover:underline">Food</a>
          <a href="/clubs" className="hover:underline">Clubs</a>
          <a href="/events" className="hover:underline">Events</a>
        </nav>
      </div>
      <div className="right">
        <button className="button">
          Search
        </button>
        <button className="button login">
          Login
        </button>
      </div>
    </div>
  );
}