import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://lancejeffers.com/",
  author: "Lance Jeffers",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Lance Jeffers",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 4, // TODO: this causes errors if setting to a number larger than total # of posts
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/lancej1022/astro-blog",
    linkTitle: ` ${SITE.author} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/lance-jeffers/",
    linkTitle: `${SITE.author} on LinkedIn`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/6catsinacoat?lang=en",
    linkTitle: `${SITE.author} on Twitter`,
    active: true,
  },
];
