import Image from "next/image";
import TitleBar from "./titlebar"; // Adjust the path if necessary
import Footer from "./footer"; // Import the Footer component

export default function Home() {
  return (
    <div className="container">
      <TitleBar />
      <main className="main">
        <p>Welcome!!!</p>
      </main>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}
