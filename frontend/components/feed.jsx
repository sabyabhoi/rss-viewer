import FeedElement from './feed_element';
import parse from 'html-react-parser';

const Feed = ({ rss }) => {
  return (
    <div>
      {rss.length !== 0 &&
        rss.map((r) => (
          <FeedElement
            title={r.title}
            date={r.published}
            content={parse(r.content.substring(0, 200) + '...')}
          />
        ))}
    </div>
  );
};

export default Feed;
