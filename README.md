# nixon

A framework to step through a website saving screenshots

## Requirements

* [PhantomJS](http://phantomjs.org)

## Getting started

* Clone this repo.

In the terminal run:

* `npm install`

* `node nixon`

Screenshots will be saved into a 'screenshots' folder.

## How to use

Make a copy of `scripts/example.js`, for example `scripts/blog.js`

You can now run this script:

`node nixon blog`

Script options:

**sitePath** is the URL of your start page.

**sizes** is an array of screen sizes you would like to capture.

**steps** is an object - each property is a step you would like take in order to get a screenshot. The function is code to set up the screenshot. You can use jQuery commands. When the function is complete, screenshots will be taken in all the sizes declared in **sizes**


