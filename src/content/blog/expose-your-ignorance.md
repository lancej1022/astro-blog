---
author: Lance Jeffers
pubDatetime: 2021-03-21T15:57:52.737Z
title: Expose your ignorance
featured: true
ogImage: ""
tags:
  - learning
description: How to learn quicker
---

Nobody knows everything.

I know that. You know that. Pretty much everyone knows that.

But despite understanding that you can’t be expected to know everything, new developers often have an aversion to admitting that.

This winds up hurting their employer, their team, and themselves.

If you’re looking to improve your engineering abilities as quickly as you can, then you’re better off exposing your ignorance, a mindset that I learned from Apprenticeship Patterns: Guidance for Aspiring Software Craftsmen.

## Understanding The Problem

Let’s pretend it’s your first week in a new software engineering role, and you really want to make a great impression.

Obviously, the best way to make a great impression is to do great work, right?

So you start working on your first task and bump into some strange behavior. Perhaps you’re trying to fire a fetch request from the frontend to some internal API, but the request is failing inexplicably.

Or perhaps the request is returning unexpected data that differs in development from production. Or maybe you’re not even working on a fetch request but are actually trying to start a Docker container locally and it’s bugging out.

Regardless of the roadblock you stumble into, you need to be quick to expose that roadblock.

Your employer doesn’t pay you to be stuck. You get paid to deliver features on time and get unstuck quickly (and hopefully do other things as well like Glue Work.

## The Truth Will Set You Free

When you get stuck or are unsure how to navigate a certain task, admitting that to relevant people (teammates or your manager) is the fastest way to solve the problem.

Assuming you’re not working in some sort of nightmarishly toxic environment, your teammates and manager are going to be okay with you asking questions, especially during your first few months on the job.

Frankly, if I had a new hire on the team and they weren’t asking a bunch of questions I’d assume they’re making the exact mistake I’m talking about here -- being too afraid to expose their ignorance because they fear they’ll be judged negatively.

## It's Alright to Get Stuck. It's Not Alright to Stay Stuck

One thing to make clear: I’m not suggesting that you immediately start pinging your teammates/coworkers as soon as you have a question about something.

Part of being an engineer is having a mindset that attempts to solve problems without immediately asking other people to solve them for you.

Sure, there are plenty of exceptions to this advice, but in my experience, it's rare that software engineers are bugging teammates for help too often. It's more common for them to be reluctant to bug teammates even after they’ve been stuck on a problem for a while.

So the clearest guideline is this: you should exhaust most of your usual resources before you start directly messaging anyone for help, but you also should be mindful of when you’ve run out of low-hanging fruit to search.

This could mean checking your company’s internal documentation, such as Confluence, to see if your question has already been asked before, or using the search bar in Slack to see if the issue was mentioned previously in any work channels.

That’s assuming that you’re stuck dealing with a problem that you think is specific to an internal process, such as connecting to your company’s dev environment.

If you’re stuck on something code-related, such as trying to figure out how to make your frontend styles match the design included with a work ticket, then you’ll want to spend much more time trying to solve the issue on your own.

That means busting out some Google-Fu to search for anything that might get you unstuck, including StackOverflow posts, Medium articles, language/framework documentation, etc.

Basically, if you’re stuck trying to figure out an internal process, you’re going to be limited to a quick search of internal documentation before you turn to a teammate or manager for help if your own search doesn't turn up any answers. No amount of Googling will provide clear answers for the internal processes at your workplace.

## Documentation as a Superpower

One thing that I think all developers should do, not just new ones, is balance exposing their ignorance with creating documentation.

If you had a question about something internal and weren’t able to answer it using your work’s internal documentation, then that indicates an obvious gap you should fill.

After all, if the thing you were stuck on had already been documented, then you wouldn’t have been stuck in the first place. And if you had a question about something, there’s a 99.9% chance some future developer at your work will have the same question.

I bumped into this exact situation at work not too long ago.

I was asked to deploy some recent code updates to production, but I had never deployed to production within our system. Deploying changes to our dev and staging environments was totally automated, but production deploys were manual.

So I dug around our own internal documentation and Slack briefly, didn’t really find any answers within ~10 minutes, and then reached out for help.

It turns out that our deployment process was basically tribal knowledge -- it was being passed from developer to developer but for some reason hadn’t been fully fleshed out as a guide or checklist in any internal documentation.

So rather than allowing that trend to continue, I wrote up what I learned from my teammates along with my own thoughts after executing the process myself so that future newbies to the team don’t get stuck.

That doc now serves as part of our onboarding process for new hires, and I looked pretty good for writing it.

None of my peers or higher-ups “looked down on me” for not knowing an internal release process. Instead, they were grateful that someone finally wrote a pretty crucial piece of documentation.

I mention this story just to give you some ideas if you are newer to software development and you’re still apprehensive about looking like a newb when you start that next job. The easiest way to build your confidence in asking questions is to balance that behavior with documenting the answers to those questions.

## Wrap Up

There is nothing necessarily new or mind-blowing in this blog post.

The reason I wanted to remind you that it's okay and even a good thing to expose your ignorance when you are stuck/unsure is because it is usually a win/win situation.

One of the many distinguishing features between more experienced engineers and the more junior ones is that the experienced ones have a much stronger sense of when to start reaching out for help, which means they don’t stay stuck longer than necessary.

Of course, they’re also not reaching out for help on small issues so frequently that it impacts the productivity of their teammates. There is somewhat of a balancing act at play here, but I’d recommend you err on the side of asking more questions rather than asking too few.

You’ll learn where the line is as you go, and in the end, you won’t feel quite so ignorant.
