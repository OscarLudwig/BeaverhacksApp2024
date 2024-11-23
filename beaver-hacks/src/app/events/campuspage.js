import CampusEvent from "./campusevent";
import { getRssFeed } from "./rss"

export default async function CampusPage({ url, title }) {
  const feed = await getRssFeed(url);

  return (
    <div>
      <h1>{title}</h1>
      {feed.map((value, index) => (
        <CampusEvent key={index} title={value.title} link={value.link} name={value.creator} />
      ))}
    </div>
  );
}
