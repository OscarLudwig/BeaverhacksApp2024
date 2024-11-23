import Image from "next/image";
import TitleBar from "../titlebar"; // Adjust the path if necessary
import Footer from "../footer"; // Import the Footer component

export default function About() {
  return (
    <div className="container">
      <TitleBar />
      <main className="main">
        <h1>Events</h1>
        <Image
          className="logo"
          src="/logo.png"
          alt="Logo"
          width={400} // Adjust the width as needed
          height={400} // Adjust the height as needed
          priority
        />
      </main>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}