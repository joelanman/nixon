# nixon

A framework to step through a website saving screenshots

## Requirements

* [PhantomJS](http://phantomjs.org)

## Getting started

* Clone this repo.

* Run the app:


```
node nixon.js
```

Screenshots will be saved into a 'screenshots' folder.

## How to use

Edit config.js:

**sitePath** is the URL of your start page.

**sizes** is an array of screen sizes you would like to capture.

**steps** is an object - each property is a step you would like take in order to get a screenshot. The function is code to set up the screenshot. You can use jQuery commands. When the function is complete, screenshots will be taken in all the sizes declared in **sizes**


