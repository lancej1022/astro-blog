import PostTimeAndReadingTime from "./Datetime";
import type { BlogFrontmatter } from "~/content/_schemas";

export interface Props {
  href?: string;
  postBody: string;
  frontmatter: BlogFrontmatter;
  secHeading?: boolean;
}

export default function Card({ href, postBody, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description } = frontmatter;
  return (
    <li class="my-6">
      <a
        href={href ?? "#"}
        class="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 class="text-lg font-medium decoration-dashed hover:underline">{title}</h2>
        ) : (
          <h3 class="text-lg font-medium decoration-dashed hover:underline">{title}</h3>
        )}
      </a>
      <PostTimeAndReadingTime postBody={postBody} datetime={pubDatetime} />
      <p>{description}</p>
    </li>
  );
}
