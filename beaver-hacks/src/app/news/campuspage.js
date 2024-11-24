import CampusEvent from "./campusevent";
import { getRssFeed } from "./rss"

export default async function CampusPage({ url, title }) {
  const feed = await getRssFeed(url);

  return (
    <div>
      <h2>{title}</h2>
      {feed.map((value, index) => (
        <CampusEvent key={index} title={value.title} link={value.link} name={value.creator} date={value.isoDate} />
      ))}
    </div>
  );
}
