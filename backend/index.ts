import { parseFeed } from "https://deno.land/x/rss@0.5.5/mod.ts";
import { Application } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import router from "./router.ts";

const env = Deno.env.toObject();
const HOST = env.HOST || "127.0.0.1";
const PORT = env.PORT || 8080;

interface Article {
  link: string;
  title: string;
  published: Date;
  content: string;
}

const run = async () => {
  const response = await fetch(
    "https://lukesmith.xyz/rss.xml",
  );
  const xml = await response.text();
  const feed = await parseFeed(xml);

  feed.entries.forEach((entry) => {
    const article: Article = {
      link: entry.links[0].href || "",
      title: entry.title?.value || "",
      published: new Date(entry.published!),
      content: entry.description?.value || "",
    };
  });
};

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`server running at ${HOST}:${PORT}`);

app.listen(`${HOST}:${PORT}`);
