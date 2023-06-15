---
author: Lance Jeffers
pubDatetime: 2021-02-20T15:57:52.737Z
title: Why not wrap everything in React.memo?
featured: true
ogImage: ""
tags:
  - learning
  - React
description: Understanding the drawbacks to React.memo
---

I was talking with some friends about React performance and eventually, a question came up that led me down a rabbit hole:

Why not wrap all of your components in React.memo()?

If you're not familiar with `React.memo`, it's a higher order component (HOC) that wraps your custom component and attempts to reduce rerendering by checking the props being passed to the component.

If a rerender is triggered by a parent component, the memo HOC will check whether the props being passed into the wrapped component have changed or not. If it detects that the props have not changed, then it does not bother rerendering the wrapped component and instead returns the last rendered result.

The nice thing is that it only checks props being passed into it from a parent component -- it doesn't prevent rerenders caused by changes in internal state or context values.

So this sounds like an easy win, right?

If the props we're receiving are the same, then why would we want to rerender? And if the props we receive are different, then we still rerender properly, so what's not to love?

And this is something me and my friends wondered for a bit. This behavior sounds awesome, so why not make it the default behavior of React?

Well...

## React.memo fails under a lot of unexpected conditions

According to the React docs, React.memo's default behavior "... will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument."

The key here is that we are only doing a shallow comparison. So if we have a component that accepts a prop called `title` that is a string, and that string value changes for whatever reason, then the memo HOC will compare the old title against the new one and properly determine that it is different, and trigger a rerender.

But what happens if our component also accepts a prop `handleChange` that is a callback function?

### A brief detour into JavaScript comparisons...

In case you're not overly familiar with JavaScript, data can be categorized into two categories: primitives values (strings, numbers, booleans) and references values (Objects, Arrays, Functions, and pretty much anything that isn't a primitive).

These two categories get compared differently. When comparing one primitive against another primitive of the same type, JavaScript will check whether they have the exact same value. So if the string `breakfast has a value of "pancakes" and the string `lunch`also has the value "pancakes" then comparing them with something like`breakfast === lunch`will result in a`true` value.

However, when we compare reference values against each other, they are compared based on their location in memory, not their underlying values. So if we define an object like so:

```javascript
const myFriend = {
  name: "David",
  senseOfFashion: "mediocre",
};
```

... and then elsewhere within our code we define a seemingly identical object:

```javascript
const totallyDifferentPerson = {
  name: "David",
  senseOfFashion: "mediocre",
};
```

when we compare `myFriend === totallyDifferentPerson` the JavaScript engine will actually return a `false` value despite the fact that these two objects appear to have identical entries.

The reason we receive false is that these two objects live in different parts of our computer's memory.

If we had a component that received two props `friend` and `family` but passed our `myFriend` object as the value for both of those props, then when we compared friend and family the JS engine should return `true` since we've basically passed the same location in memory as both arguments, and so JS can see that both props actually point to the same spot in memory.

There are open source tools out there that do allow you to compare two different objects and see whether the entries within the entry are the same, rather than simply comparing the two addresses in memory, but the point is that such comparisons are not the default behavior of the JS engine.

Thus far I've used an Object as part of the demonstration, but the same result will apply to any non-primitive value.

## Back to our question about passing a callback function...

When React says it does a "shallow comparison" as part of React.memo, it means that if it receives a callback function as one of the props, if the function was redefined (which will happen if the function is being defined in some parent component and then prop drilled into our child component) then the function will always have a new place in memory. This applies even if the actual code for that function has not changed.

As a result, React.memo will always wind up rerendering our component, making the extra work to memoize the component nothing more than unnecessary overhead.

Keep in mind that our memoization will fail for any non-primitive prop. That importantly includes the `children` prop that most developers use frequently.

### <em>"But can't you memoize the prop within the parent component?"</em>

One solution to passing non-primitive values as props into our component is to actually memoize them wherever they are defined.

So in the case of a callback, within our parent component we could memoize it like so:

```javascript
const handleChange = useCallback((name) => {
  return name.trim();
}, []);
```

This would make it so if the parent component rerenders, we don't redefine `handleChange` and instead return the previously defined version of it, aka we return the same place in memory that it already lived in.

Then, when we send it as a prop to our child component, React.memo() would be able to see that the address in memory hasn't changed and so it doesn't need to rerender.

Pretty cool...

...but is that something you want to pray every engineer on your team remembers to do? Do you truly believe every single human that has to interact with your codebase will remember to memoize any non-primitive values wherever they're defined so that React.memo's shallow comparison can do its job consistently?

I know the teammates that I've worked with have generally been great people but, just like me, they aren't perfect. If engineers wrote 100% perfect code 100% of the time then we wouldn't have any need for Peer Review.

### <em>"Well I can just write a custom comparison function so I don't need to worry about my other teammates forgetting to memoize values"</em>

One thing that React.memo allows is a custom callback function that can be invoked to compare the props between rerenders, rather than relying on the default shallow comparison built into the HOC.

So, in theory, you can just write a custom comparison function to handle comparing non-primitive props, rather than relying on anyone who has to utilize your component memoizing the reference values they pass as props.

There are two big issues with this approach.

You're getting to the point where you're adding a lot of complexity, especially if you need to compare deeply nested objects.

Comparisons are not free. One of the reasons React.memo relies on a shallow comparison rather than some crazy catch-all comparison is that a shallow comparison is relatively cheap to perform whereas comparing deeply nested objects is more computationally expensive. So if you define a custom comparison there's a decent chance it's going to be more expensive and you run the risk of a Pyrrhic Victory by gaining a more consistently correct comparison at the cost of worse performance.

## Seeing the big picture

As engineers, we should focus first on writing our code so that it is readable by other engineers rather than writing significantly more complex code to achieve micro-optimization.

Even if you managed to write a custom comparison function that makes determining whether to rerender your memoized component more efficient than React's default behavior, there is probably still going to be a tradeoff in readability and/or maintainability of that code down the road.

And this is already a big "if" anyways -- you're far more likely to write a custom comparison function that you think is efficient but is actually slowing things down, rather than writing a comparison that truly improves the performance of your app.

I'm not saying that you should never define a custom comparison function, but that you need to measure the performance difference between React's default behavior, React.memo's default behavior, and your customized React.memo behavior. If you can conclusively determine that you are seeing a performance benefit, you then need to decide how big that benefit is and whether it is worth the added complexity.

## Don't make assumptions

React is fast by default, so any time you start attempting to make it faster with custom logic you should really consider whether you are making things more performant, and at what cost.

React.memo exists for a reason. It can improve the performance of your components in certain circumstances. But it's also not the default behavior in React for a reason.

If you wrap every component in React.memo, there's a strong chance you'll wind up with a decrease in your performance since a decent chunk of the comparisons done for each memoized component will be unnecessary work.

At the same time, this doesn't mean you should never use React.memo. If you use the React profiler or some other tool and determine that a portion of your app is noticeably slow due to unnecessary rerenders, look at that part of your code and see whether you can wrap it in React.memo to improve the performance.

React.memo is not a one-size-fits-all solution, but it is a tool within your toolbox as a React developer that you can utilize intelligently when the situation calls for it.
