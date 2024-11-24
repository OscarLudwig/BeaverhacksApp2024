import Image from "next/image";
import TitleBar from "../titlebar"; // Adjust the path if necessary
import Footer from "../footer"; // Import the Footer component
import FoodPage from "./foodpage";

export default function About() {
  return (
    <div className="container">
      <TitleBar />
      <main className="main">
        <h1>Food</h1>
        
        <FoodPage />
      </main>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}