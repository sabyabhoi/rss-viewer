import Head from 'next/head';
import Feed from '../components/feed';
import SearchBar from '../components/search_bar';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [rss, setRss] = useState([]);

  return (
    <div>
      <Head>
        <title>RSS Viewer</title>
      </Head>
      <main>
        <SearchBar setUrl={setUrl} setRss={setRss} rss={rss}>
          {url}
        </SearchBar>
        <Feed rss={rss} />
      </main>
    </div>
  );
}
