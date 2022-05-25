---
title: Using Javascript's Array#map function
date: 2019-10-16
excerpt: To new developers, map functions look like mysterious programmer voodoo. (Well they did to me at least.) In practice, however, they are actually pretty easy to understand, and provide a simple way to write expressive code that transforms a collection of data. 
tags: post
---

# How to use Javascript's Array map function

To new developers, map functions look like mysterious programmer voodoo. (Well they did to me at least.) In practice, however, they are actually pretty easy to understand, and provide a simple way to write expressive code that transforms a collection of data. 

Once you get the hang of them, you will probably find yourself reaching for map (and/or reduce) functions in a lot of places where you would have previously implemented something like a `for` or a `while` loop.

## What does it do?

`map` iterates through each element in an array, passing that element to a callback function that then does something with it and returns an updated value. Once it is finished it returns a new array with the transformed elements. It does not mutate the array on which it is called.

## Your first `map` function

Add '-san' to the end of each name in an array of names:

```js

const names = [ 'Takeshi', 'Mary', 'James', 'Tanaka' ];
const honorific = '-san';

const updatedNames = names.map((name) => name + honorific);
// [ 'Takeshi-san', 'Mary-san', 'James-san', 'Tanaka-san' ]
```

That's it!

## Something a little more interesting.

```js

const users = [
  {
    firstName: 'James',
    lastName: 'Pierce',
    skills: [ 'javascript', 'ruby', 'react' ],
    interests: [ 'drawing', 'japanese' ]
  },
  ...
];

const bios = users.map((user) => {
  const { firstName, lastName, skills, interests } = user;
  const bio = `${firstName} ${lastName} is skilled at ${skills.join(', ')}.
 They are interested in ${interests.join(', ')}.`;
  return bio;
});

// ["James Pierce is skilled at javascript, ruby, react. They are interested in drawing, japanese."]

```

You can see how this can be useful when you are working to render collections of data from your favorite API.

## Dig deeper

Because calling map on an array is an *expression* in Javascript, it is very useful when working in templating languages like JSX.

READ: [Array.prototype.map() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## Thanks for reading!
