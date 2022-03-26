import { Router, Status } from "https://deno.land/x/oak@v10.4.0/mod.ts";
import { parseFeed } from "https://deno.land/x/rss@0.5.5/mod.ts";

interface IArticle {
  link: string;
  title: string;
  published: Date;
  content: string;
}

const get_rss = async (url: string) => {
  const response = await fetch(url);
  const raw_text = await response.text();
  const feed = await parseFeed(raw_text);

  return feed.entries.map((entry): IArticle => {
    return {
      link: entry.links[0]?.href || "",
      title: entry.title?.value || "",
      published: new Date(entry.published!),
      content: entry.description?.value || "",
    };
  });
};

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.body = {
      success: true,
      msg: "Successfully connected",
    };
  })
  .get("/:url", (ctx) => {
    ctx.response.body = {
      success: true,
      msg: "Hello there",
    };
  })
  .post("/", async (ctx) => {
    if (!ctx.request.hasBody) {
      ctx.throw(Status.BadRequest, "Bad Request");
    }

    const body = ctx.request.body();
    if (body.type === "json") {
      const val = await body.value;
			const rss = await get_rss(val.url);
      ctx.response.body = {
        success: true,
        msg: rss,
      };
    }
  });

export default router;
