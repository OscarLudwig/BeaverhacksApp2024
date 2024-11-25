import Image from "next/image";
import TitleBar from "../titlebar"; // Adjust the path if necessary
import Footer from "../footer"; // Import the Footer component

export default function About() {
  return (
    <div className="container">
      <TitleBar />
      <main className="main">
        <h1>Clubs</h1>
        <h2>Under Development</h2>
        <h3><a href="https://clubs.oregonstate.edu" target="_blank" rel="noopener noreferrer">OSU Clubs</a></h3>
      </main>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}