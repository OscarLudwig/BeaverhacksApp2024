import Image from "next/image";

export default function TitleBar() {
  return (
    <div className="titlebar">
      <div className="left">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
        />
        <nav>
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Message board</a>
          <a href="#" className="hover:underline">Food</a>
          <a href="#" className="hover:underline">Clubs</a>
          <a href="#" className="hover:underline">Events</a>
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