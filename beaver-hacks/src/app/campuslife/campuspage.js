import CampusEvent from "./campusevent";
import { getRssFeed } from "./rss"

export default async function FoodPage() {
  const feed = await getRssFeed("https://news.oregonstate.edu/releases/feed/campus-life");

  return (
    <div>
      {feed.map((value, index) => (
        <CampusEvent key={index} title={value.title} link={value.link} name={value.creator} />
      ))}
    </div>
  );
}
