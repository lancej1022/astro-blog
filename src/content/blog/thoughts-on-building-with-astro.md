---
author: Lance Jeffers
pubDatetime: 2023-06-23T15:57:52.737Z
title: Thoughts on Building With Astro
featured: true
ogImage: ""
tags:
  - performance
  - astro
description: Ditching NextJS in favor of a leaner framework
---

I've been wanting to get into writing blogs again but kept putting it off because I was unhappy with my existing blog site. As part of a recent rewrite, I chose to use Astro and wanted to write up my thoughts on the developer experience and where it shines (and where I think it can improve).

## The Good

<!-- TODO: fill this section out more -->

Astro gets a lot of things right when it comes to building multi-page applications

### Zero runtime JavaScript

Considering that a blog is primarily made of static content, it makes sense that you shouldn't really need to ship much (if any) JavaScript to your site visitors. Ultimately, JavaScript should be used for adding interactivity to pages or adding functionality that HTML can't natively support very well (such as client-side routing).

Astro manages this very effectively by allowing you to write JavaScript within your `.astro` files and then executing that JavaScript at build-time so that you dont have to ship any of it to your end user. This ensures that its easy to do things like grab all of the blog posts from the file system and map over them to transform them in some way using JS while ensuring that the end result doesn't actually require any JS that end users have to download.

That's not to say that you're forbidden from shipping client-side JavaScript -- Astro does still allow you to ship inline scripts as well as "Islands" which are [interactive UI component on an otherwise static page of HTML](https://docs.astro.build/en/concepts/islands/). Basically, while Astro defaults to 0kb of JS, you can still leverage UI frameworks like React or Svelte and sprinkle them into your static pages. As an example, I wound up shipping a small amount of vanilla JS (<1kb) to properly determine whether to render the site in a light or dark theme and I also shipped some Solid.js astro islands for the client side search functionality on the [search page](/search).

### Easy integration with your preferred UI library

As I mentioned when discussing Astro islands, the framework allows you to server render any other UI framework of your choice. If you prefer React and want to be able to leverage the vast ecosystem around it, you can totally write make some React components and render them as Astro islands. If you prefer a leaner, more performant framework like Solid.js or Svelte, the Astro build chain supports that as well.

To me, this is one of the coolest things about Astro since you're not _truly_ locked into a particular UI framework like you would be if you were using NextJS (React) or Nuxt (Vue) to build your site. You're basically encouraged to write Astro as much as possible and then you can escape into a more client-oriented JS framework whenever you need to do something that can't effectively be achieved via build-time compilation (such as client-side search functionality).

All of the big players in the frontend space have easy to use Astro integrations, so you can author your UI components in whatever way makes the most sense to you.

### JSX Support

I'll be showing my bias a bit here, but part of the reason I wound up enjoying Astro so much is that it still supports JSX syntax. This means that you can still make reusable JavaScript components and render them directly in your HTML just like if you were authoring a React application, except those components wont actually ship any JavaScript to the client. Instead, Astro transpiles all of your JSX at build time into normal HTML.

For developers that have used JSX before, this probably doesnt seem like an impressive enough feature to even mention, but the thing you have to realize is that it enables you to write the _vast_ majority of your website using `.astro` files rather than having to write the majority of your code using a UI framework (which would result in having to ship more JavaScript to the client).

This obviously ties back into Astro's goal of enabling a 0 JavaScript experience. The framework gives you most of the benefits of JavaScript and JSX while you're authoring your code, but then all of that JavaScript within your `.astro` files disappears at build time.

### Typesafe Markdown

I haven't used a ton of other static site generators besides Astro and NextJS, so this feature may not be overly unique. But regardless, I was very happy to learn that you can make your markdown typesafe very easily in Astro thanks to [Astro content collections](https://docs.astro.build/en/guides/content-collections/#defining-a-collection-schema). This helps you ensure that your markdown files are all following a required schema so that you don't accidentally try to generate a blog post from a markdown file that happens to be missing some required field like a publication date or whatever.

I found it extremely easy to get up and running with this, and it makes authoring markdown content locally (as opposed to using a Content Management System) a much easier experience.

### A large variety of templates available

One thing that I knew I wanted to do for my blog rewrite was use a premade template for the layout and styles. While I was very satisfied with the look and feel of my previous blog, it had taken a decent amount of time to create even though I was using MUI (which has prebuilt components for almost everything). Since I was ditching React for the rewrite, I knew I'd have to recreate the entire blog from scratch if I wanted to preserve it.

In the past, this would have been a really appealing endeavor to me but nowadays I wanted to focus primarily on just getting up and running as quickly as possible while delivering the best performance I could muster. Thankfully, the Astro docs link to a large variety of open source templates for Astro and I was able to find one that mostly fit my needs named Astro Paper.

<!-- TODO: link to Astro Paper on GitHub -->

Linking to open source templates isn't necessarily unique to Astro, but I do think it's an important benefit to consider when a developer is weighing their options across the various static site generators out there.

## The Bad

There are a lot of other benefits that Astro offers, but I've sufficiently covered the main areas that stood out to me as a first-time Astro user. Now, I'd like to focus on the areas where I felt Astro was missing the mark.

Again, the only other static site generator that I've used besides Astro was NextJS, so a lot of the deficiencies I'm about to talk about are the result of comparing Astro to NextJS.

- A lot of optimizations were harder to figure out in Astro than other frameworks
  - font + image optimization
    - font optimization lags significantly when compared against NextJS
  - prefetching
  - minification
- Couldnt figure out how to author inline scripts using TS (toggle-theme.js)

### Fully optimizing the output build was not simple

For a framework that focuses primarily on static sites, I was surprised that Astro didn't do more to optimize my build automatically. Instead, I had to dig through the documentation as well as some additional external sites to figure out how to get Astro to optimize things like fonts and images.

#### Font Optimization

I was shocked to see that Astro does not currently seem to offer _any_ method of optimizing the fonts on your website. As an engineer that works primarily on the frontend, I had a hard time believing this at first and spent more time than necessary searching the Astro docs for a solution before finally turning to external resources.

For individuals that have done web development on performant websites, you already know that ensuring the right font is available as soon as possible is critical if you want to avoid the dreaded Flash Of Unstyled Text (FOUT). For those that aren't familiar, FOUT occurs when the browser has fully parsed your CSS and HTML and is so it renders the page, but the fonts that your CSS relies on haven't finished loading in over the network. The end result is that the user sees the entire page load in and then a short time later (generally <200 milliseconds if you're using Google Fonts) all of the text gets rerendered using the intended font once the browser is done fetching and parsing it. Not exactly a lovely user experience.

FOUT often isn't a problem in large JavaScript applications that are slow to render, but for lightning fast applications that are fully loaded in less than 500ms, FOUT is a challenging problem to prevent. At a high level, the solution to FOUT involves inlining the font so that it doesnt need to be fetched over the network as a separate request, which is basically how NextJS handles things with their Font component.

Unfortunately, Astro does not have any such functionality built into the framework, so I wound up using the [subfont npm package](https://www.npmjs.com/package/subfont) and running it as part of my build script so that it could scan the generated HTML files and build an optimized font file based on that. Basically, this package checks all of your HTML to build up a list of the symbols that are used by your site and then creates a subset of your chosen font that contains only those symbols so that you can ship a smaller font file. Additionally, I chose to set the font-display to "fallback" so that the browser won't actually render the text on the page until this font file is fully loaded in.

While this does work, its far from ideal. Using an npm package to scan all of the output HTML files winds up being a pretty slow approach and noticeably lengthens my build time despite the low number of HTML files my blog generates (at least at the time that Im writing this). More importantly, this approach isn't doing 100% of the optimizations that NextJS's Font component does, so while it does improve my initial load performance a bit I also know that Im leaving some further performance improvements on the table.

Ultimately, I feel very strongly that any framework that wants to focus on creating highly performant multi-page sites really needs to solve the issue of font-loading because its such a common issue. It's a tough problem to solve on your own without investing a decent chunk of time into it, so I was very bummed when I realized that Astro didn't offer a native solution here.

<!-- TODO: refine this -->

I will give some credit to Astro because after searching the community Discord server I was able to see [some discussions around adding a solution to this problem directly into the framework](https://discord.com/channels/830184174198718474/872579324446928896/1046661154514145320).The Astro team is much smaller than the team that works on NextJS so I dont wan't to come across as though its outrageous for Astro not to solve every potential UI issue a developer might care about.

#### Images

Another area that felt a bit clunky to me was image optimization. Unlike font optimization, this is actually something that Astro does support natively which is nice. But I'm mentioning it within the "drawbacks" section primarily because it wasn't actually clear how to get it working.

For starters, Astro points to their `@astrojs/image` package within their integration docs, and all the documentation on that page makes it seem like that package is up to date and intended for us. However I later stumbled onto the Astro Assets optimization, which says right at the beginning that it is meant to replace the `@astrojs/image` package. I found this extremely confusing and it definitely added to the mental overhead of optimizing my Astro site. Again, when compared against NextJS, their instructions for image optimization felt far more clear to me when I originally built my blog 3 years ago.

Importantly, _neither_ of the image optimizations are actually enabled by default when you bootstrap a new Astro site which doesn't necessarily make a whole lot of sense to me. I'm not a framework author so it's possible that I'm missing something, but I'm not really sure if there's ever a situation where you _wouldn't_ want to automatically optimize your images by default? I would be curious to hear the Astro team's reasoning for not just enabling this automatically.

All that said, while it took me a bit to figure out the correct way to optimize my images (apprently its the Assets option rather than the `@astrojs/image` package) I was at least glad that this was something baked into Astro. Similar to font optimization, ensuring that your images are performant is something that almost every website will need to handle and it's not something that's easy to get right if you're trying to do it manually.

#### Prefetching links

If you've never used prefetching to speed up a static site before, you're missing out. Prefetching links ensures that when a user clicks into the next page, the browser can basically render that page instantly since the assets required for that page have already been downloaded ahead of time. NextJS does this by default if you use their Static Site Generation (SSG) as the output target, but you can actually do this without a framework. It's supported to an extent by native HTML, but there are also open source libraries such as [quicklink for the Chrome team](https://github.com/GoogleChromeLabs/quicklink) which helps simplify things.

Similar to image optimization, link prefetching is something that Astro does support natively via [the `@astrojs/prefetch` package](https://docs.astro.build/en/guides/integrations-guide/prefetch/#overview) which is great, but it's also not enabled by default. I can kind of understand this to an extent, since it does give the developer more granular control over which links are prefetched and which aren't, but honestly it feels like the default behavior here should be to just prefetch anything within the viewport and allow the developer to opt _out_ of this behavior rather than requiring developers to opt _into_ this behavior on every link they want to load quickly. This is exactly what NextJS does when you use their `Link` component, so I'm not totally sure why the Astro team has decided to take the opposite approach and require developers to manually comb through every link on their site and indicate that it should be preloaded. Equally important, the Astro implementation doesn't seem to restrict itself to links that are within the viewport, which means that you might potentially wind up prefetching a ton of links that a user can't actually see or interact with yet.

<!-- TODO: check out https://docs.astro.build/en/guides/integrations-guide/prefetch/#overview to see if you can just prefetch all links, not just  -->

Again, I don't want to complain too much here because at least it is something that Astro is supporting natively, but after following the docs and using the suggested approach I was definitely left feeling like NextJS implements this in a much more developer-friendly way.

### Minfication

Regardless of whether you're building a multi-page application (MPA) or a single-page application (SPA), you generally want to minimize the total number of bytes that your visitors hae to download in order for your page to render. This is especially important on mobile devices since network connections can be very spotty or just low-bandwidth overall.

<!-- TODO: link to webpack docs or something explaining minification -->

One of the simplest ways to achieve this is "minifying" your output build files. I won't go more into exactly how minification works although you can read up on it here if you want, but the main thing to point out is that this is pretty much something _every_ website should do in order to improve performance.

And yet surprisingly, Astro doesn't do it for all of your assets by default. It definitely does it for some of them -- when I checked my output JavaScript files I saw that most of them had been minified properly. But when I looked into the HTML and CSS files, it didn't seem like they had been minified to the extent that other frameworks do.

Again, I want to assume that the Astro team either has a good reason for not doing more here within the framework itself _or_ it's a problem they're aware of and intend to address, but I do think that this is another small shortcoming of Astro at the current time. Hopefully in the future this drawback will no longer apply to new Astro sites.

<!-- TODO: talk aobut inline scripts and also ask in Discord to see if maybe it IS doable to author them in TS and I just don't know  -->

## The End Result

Despite some of the drawbacks I mentioned earlier, the overall experience with Astro is great for building static sites. The project configuration is reasonably simple, and most of the things a developer will care about are covered by the official docs. Developers looking to fully optimize their sites performance may experience some frustration by the seemingly obvious optimizations that Astro _doesn't_ do for you automatically, but overall the experience was solid. Unless I was planning to build a highly dynamic site, in which case I would build with something like Solid Start, I would probably recommend Astro as the default way to build multipage JavaScript applications.
