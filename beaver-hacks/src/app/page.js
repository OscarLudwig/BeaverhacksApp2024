import "@/app/food/foodplace"
import CampusPage from "./campuslife/campuspage";

export default function Home() {
  return (
    <div>
      <CampusPage title="Athletics" url="https://news.oregonstate.edu/releases/feed/athletics" />
      <CampusPage title="General" url="https://news.oregonstate.edu/releases/feed/" />
    </div>
  );
}
