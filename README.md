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

**sizes** is an array of screen sizes you would like to capture.
*Type:* `Array`<br />
*Default:* `[{ width: 1024}]`<br />

An array of objects containing the sizes and settings we want for our screenshots.

For example:
```js
sizes: [{
    width: 320
},{
    name: "iPad",
    width: 768
}]
```

The settings available are as follows:

* **width**<br />
  *Type:* `Number`<br />
  *Default:* 1024<br />

  `width` is set in pixels. This is the only option that should be set. If no `name` is specified, the `width` will be used in the image filename.

* **height**<br />
  *Type:* `Number`<br />
  *Default:* 100<br />

  `height` is set in pixels. Note that height is normallly ignored - screenshots will be the height of the content.

* **name**<br />
  *Type:* `String`<br />
  *Default:* size width<br />

  If a `name` is specified, then the file will be suffixed with this name. e.g. `1-start-page-iPad.jpg`<br />
  If a `name` is not specified, then the file will be suffixed with the width. e.g. `my-image-320.jpg`

* **suffix**<br />
  *Type:* `String`<br />
  *Default:* none<br />

  Use `suffix` for retina graphic filenames. e.g. `my-image-320_x2.jpg`

* **zoom**<br />
  *Type:* number<br />
  *Default:* 1<br />

  Use `zoom` to set the amount of zoom on the page. Can be used to capture retina graphics with a setting of `zoom: 2`. Note the width and height are scaled by the zoom setting. For example, for an image of `width: 1024` and `zoom: 2`, the captured width will be 2048.

* **crop**<br />
  *Type:* `string` or `bounding rectangle`<br />
  *Default:* no crop<br />

  Use `crop` to screenshot an area of the page. You can pass in either a CSS selector or a boundingRectangle `{ top : 50, left: 200, width: 90, height: 200 }`.

  For example:
	```js
	sizes: [{
			name: 'Square crop'
	    width: 1024
	    crop: {
				top: 100,
				left: 100,
				width: 100,
				height: 100
	  }
	},{
	    name: "Page h1",
	    width: 1024,
	    crop: 'h1'
	}]
	```
	Note if passing a selector, cropping does not scale correctly.

**steps** is an object - each property is a step you would like take in order to get a screenshot. If it's a string, Nixon will open the URL. If it's a function, it will be run in the browser. You can use jQuery commands.


