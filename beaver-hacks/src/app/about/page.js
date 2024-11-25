import Image from "next/image";
import TitleBar from "../titlebar"; // Adjust the path if necessary
import Footer from "../footer"; // Import the Footer component

export default function About() {
  return (
    <div className="container">
      <TitleBar />
      <main className="main">
        <h1>About Us</h1>
        <Image
          className="logo"
          src="/logo.png"
          alt="Logo"
          width={300} // Adjust the width as needed
          height={300} // Adjust the height as needed
          priority
        />
        <div className="page-content">
          <p>
            Welcome to Beaver Forum, our project for BeaverHacks Fall
            2024 Hackathon! We are a group of students at Oregon State
            University who have come together to create a platform for students
            to connect with others and see school news and dining center information.
            We hope you enjoy!
          </p>
          <h2>Meet the Team</h2>
          <div className="team-members">
            <p className="important-name">
              Troy Lopez
            </p>
            <p className="important-name">
              Oscar Ludwig
            </p>
            <p className="important-name">
              Charles Tang
            </p>
            <p className="important-name">
              Kai Turner
            </p>
          <Image
            className="team-photo"
            src="/team-photo.jpg"
            alt="Our Team"
            width={800}
            height={400}
            priority
          />
          </div>
        </div>
      </main>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}