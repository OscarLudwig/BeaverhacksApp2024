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
            Welcome to Beaver Forum, where connection meets creativity in a playful
            and enticing digital playground. Here, we believe that every
            interaction can spark a little chemistry, and that the art of
            expression is a delightful dance of intrigue and allure.
          </p>
          <p>
            Here we celebrate the beauty of individuality and the thrill of
            sharing your passions. Our platform invites you to explore your
            desires and share your stories, whether through captivating visuals,
            engaging narratives, or spirited discussions that leave you wanting
            more. We provide a space where you can reveal your true self and
            connect with others who appreciate the finer nuances of life.
          </p>
          <p>
            Our team is a diverse group of dreamers and creators, dedicated to
            cultivating an environment that embraces authenticity and a hint of
            seduction. We encourage our users to unleash their creativity and
            explore the tantalizing edges of their imagination, fostering
            connections that are as deep as they are exhilarating.
          </p>
          <p>
            Join us on this enticing journey as we redefine social interaction.
            Whether you're looking to share your latest artistic endeavor, connect
            with like-minded souls, or simply indulge in the thrill of human
            connection, BeaverHacks is your canvas. Let's create something
            unforgettable together, where every moment is an invitation to
            explore, engage, and enjoy the delightful sparks that arise when
            passions collide.
          </p>
          <h2>Meet the Team</h2>
          <div className="team-members">
            <p className="important-name">
              Oscar Ludwig
            </p>
            <p className="important-name">
              Troy Lopez
            </p>
            <p className="most-important-name">
              Charles Tang
            </p>
            <p className="important-name">
              Kai Turner
            </p>
          </div>
        </div>
      </main>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}