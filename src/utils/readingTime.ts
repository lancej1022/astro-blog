import type { CollectionEntry } from "astro:content";

const AVERAGE_WORDS_READ_PER_MINUTE = 200;

export function getReadingTime(post: CollectionEntry<"blog">) {
  if (!post.body) return;

  // TODO: improve regex
  const clean = post.body.replace(/<\/?[^>]+(>|$)/g, "");
  //  TODO: improve calculation -- kinda inaccurate because the parsed string has junk in it
  const numberOfWords = clean.split(/\s/g).length;

  return Math.ceil(numberOfWords / AVERAGE_WORDS_READ_PER_MINUTE);
}
