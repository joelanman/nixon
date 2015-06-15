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

## Scripts

Make a copy of `scripts/example.js`, for example `scripts/blog.js`

You can now run this script:

`node nixon blog`

### Script options

**screenshotPath**

Type: String

Where your screenshots will be saved. Supports the following tags:

- **#** - the screenshot number
- **script** - the name of the script
- **size.width**
- **size.hight**
- **step.name**

**sizes**

Type: Array

The screen sizes you would like to capture, for example `[[800,600],[1280,1024]]`.

**steps** 

Type: Array

An array of step objects for the script to carry out (see below).

## Steps

**expectedUrl**

Type: String (URL)

If the browser is not on the `expectedUrl` at the end of this step, Nixon will log a warning in the console.

**js**

Type: Function

This JavaScript function will be run in the browser before the screenshot is taken.

If `open` is also set, it will run before `js`.

**name**

Type: String

The name of the step is used in the filename when saving screenshots.

**open**

Type: String (URL)

The browser will open the URL set here.

If `js` is also set, it will run after `open`.

**screenshot**

Type: Boolean
Default: `true`

If this is set to `false`, a screenshot won't be taken for this step.
