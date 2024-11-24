import Image from "next/image";
import TitleBar from "../titlebar"; // Adjust the path if necessary
import Footer from "../footer"; // Import the Footer component

export default function About() {
  return (
    <div className="container">
      <TitleBar />
      <main className="main">
        <h1>Clubs</h1>
        <h3>TBD</h3>
      </main>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}