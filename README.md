# Nixon

A framework to step through a website saving screenshots, based on [Horseman](https://github.com/johntitus/node-horseman).

## You need

* [Node.js](http://node.js)
* [PhantomJS](http://phantomjs.org) - version 2 or later

## Getting started

* [Download Nixon](https://github.com/joelanman/nixon/archive/master.zip)

In the terminal run:

* `npm install`

* `node nixon`

Screenshots will be saved into a 'screenshots' folder.

## How to use

Make a copy of `scripts/example.js`, for example `scripts/blog.js`

You can now run this script:

`node nixon blog`

Script options:

**overwriteFiles**

*Type:* `Boolean`<br />
*Default:* `false`<br />

Overwrite any existing files. If not set, images will be saved in to a dated folder.

For example:
```js
overwriteFiles: true
```

**sizes** is an array of screen sizes you would like to capture.

**steps** is an object - each property is a step you would like take in order to get a screenshot. If it's a string, Nixon will open the URL. If it's a function, it will be run in the browser. You can use jQuery commands.


