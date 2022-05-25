---
title: Adding integration testing to an existing codebase with Cypress
date: 2019-10-23
excerpt: You have recently come into your inheritance. Surprise! It's a giant Wordpress codebase with years of development history and no automated testing of any kind. Congratulations.
tags: post
---

# Adding integration testing to an existing codebase with Cypress

You have recently come into your inheritance. Surprise! It's a giant Wordpress codebase with years of development history and no automated testing of any kind. Congratulations.

This is an unfortunately common scenario for developers, and it can turn what should be routine maintenance into time-consuming and expensive games of whack-a-mole. Clients get a big bill for little visible progress, get frustrated with development shop, move to next dev shop, where the process then repeats itself. It's not pretty.

## Breaking the cycle with integration (or end-to-end) tests

It isn't realistic in most situations to retroactively add unit tests to codebases with a lot of history, because it's very rare for code that is not written test-first to play nicely with unit tests. If we do try to implement testing at this level, we tend to find that they are extremely time-consuming to write, while also being brittle and undependable.

In this situation, we are going to get the most bang for our (and our client's) buck out of integration tests, or tests that interact with our website in the same way that a user would. To write these tests we are going to spin up a copy of [Cypress](https://www.cypress.io/), an open source testing framework that makes a lot of the boring decisions for us, and lets us get started testing quickly.

## Setting up Cypress

### Install

In your terminal, navigate to the root of your project and install Cypress.

```
npm install --save-dev cypress
```

### Update `package.json`

Set up an npm script to start Cypress from command line with `npm run cypress`.

```json
{
...
"scripts": {
	"cypress": "cypress open"
	...
},
...
}
```

### Configure Cypress

Cypress created a file called `cypress.json`. Update it with the url of the application you are testing.

```json
{
  "baseUrl": "http://localhost:8080" # YOUR TEST ROOT URL
}
```

### Optional: Configure IDE

If you are using an IDE like VS Code, include this config in the root of your project in `jsconfig.json` to allow for autocompletion. Add this file to your `.gitignore`.

```json
# ./jsconfig.json
{
  "exclude": ["./node_modules"],
  "include": ["./node_modules/cypress", "cypress/**/*.js"]
}

```

### Remove sample specs

Cypress generates some examples in `./cypress/integration` when you first start it up. We don't need them, so clear them out.

### Write your first spec

Create a new file `header_spec.js` in `./integrations`. We are going to test that the home page has a header, and that it contains a logo with a link to the home page, and an element with the text "Blog" that is a link to the path `/blog`. If you have your own sample project running, feel free to test whatever links you want.

```js
# ./integrations/header_spec.js

describe("Header", function() {
  it("has navigation links", function() {
	  cy.visit("/");
	  cy.get("header")
	    .find("#logo a")
	    .should("have.attr", "href", "/")
	  cy.get("header")
	    .contains("Blog")
	    .should("have.attr", "href", "/blog")
  });
});
```

Save this file and in your terminal run `npm run cypress`. The Cypress application will open with an automatically updating list of all the spec files in your codebase, along with a handy button to 'Run all specs'. When you click it, this button pops open a test runner that shows you everything Cypress is doing and the results of your specs. From this point, whenever you update your spec, Cypress will automatically rerun the tests.

## Write more specs

Identify mission-critical functionality and get it covered with some basic specs. Good candidates for early coverage are logins, sign ups, and contact forms. Covering essential business functions of your site will give you the peace of mind that changes made to your codebase are not breaking the things that are most important to your audience, and allow you to confidently add features or refactor existing ones.

## Dig deeper

READ: [Introduction to Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html)

CLONE: [Tiny Cypress E2E test case](https://github.com/cypress-io/cypress-test-tiny)

WATCH: [Best Practices Assert(JS) Talk](https://www.youtube.com/watch?v=5XQOK0v_YRE)

## Thanks for reading!
