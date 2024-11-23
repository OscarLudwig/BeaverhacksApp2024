import Image from "next/image";
import TitleBar from "./titlebar"; // Adjust the path if necessary

export default function Home() {
  return (
    <div className="container">
      <TitleBar />
      <main className="main">
        <Image
          className="logo"
          src="/logo.png"
          alt="Logo"
          width={400} // Adjust the width as needed
          height={400} // Adjust the height as needed
          priority
        />
      </main>
    </div>
  );
}
