import Image from "next/image";

export default function TitleBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-full">
      <div className="flex items-center gap-4">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
        <nav className="flex gap-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Message board</a>
          <a href="#" className="hover:underline">Food</a>
          <a href="#" className="hover:underline">Clubs</a>
          <a href="#" className="hover:underline">Events</a>
        </nav>
      </div>
      <div className="flex gap-4 ml-4">
        <button className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200">
          Search
        </button>
        <button
          className="text-white font-bold py-2 px-6 rounded-full hover:opacity-90"
          style={{ backgroundColor: 'var(--osu-color)' }}
        >
          Login
        </button>
      </div>
    </div>
  );
}