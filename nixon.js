var path = require('path');
var Horseman = require('node-horseman');
var horseman = new Horseman();

// patch horseman.crop

horseman.crop = function( area, path ){
  if ( typeof area === "string" ){
    area = this.boundingRectangle( area );
  } 
  var rect = {
    top : area.top,
    left : area.left,
    width : area.width,
    height : area.height
  };
  var self = this;
  this.page.set('clipRect', rect, function(){
    self.pause.unpause('clipRect');
    self.screenshot( path );
    self.page.set('clipRect', {});
    return this;
  });
  this.pause.pause('clipRect');  
}

// end patch

var imagePath = "screenshots";

var argv = require('minimist')(process.argv.slice(2));

var scriptName = argv._[0] || "example";


var script = require(path.join(__dirname, 'scripts', scriptName));

console.log('\nNixon.js - running: ' + scriptName);

// console.log('sizes', script.sizes);

if (!script.keepCookies){
	horseman.cookies([]);
}

if (!script.sizes){
	console.log('No sizes set, using default (1024px)');
	script.sizes = [{
			width: 1024
		}];
}

var numSteps = 0;
for (var step in script.steps){
	numSteps++;
}
var numSizes = script.sizes.length;
var numScreenshots = numSteps * numSizes;
console.log('Total screenshots:', numScreenshots, '(' + numSteps, 'steps,', numSizes, 'sizes per step)');

var errorCount = 0;
var stepNumber = 1;

for (var name in script.steps){
	
	process.stdout.write('\nStep ' + stepNumber + " - " + name);

	var step = script.steps[name];

	if (step.call){

		horseman.manipulate(step);

	} else {

		horseman.open(step);

	}

	//console.log("waiting for next page ...");

	horseman.waitForNextPage();

	//console.log("... done waiting");
	console.log(':', horseman.url());

	var sizeCount = 1;
	script.sizes.forEach(function(size){

		var image= {};
		if ( !size.width ) {
			errorCount++;
			image.width = 1024; //default width
		} else {
			image.width = size.width;
		}
		image.height = (size.height) ? size.height : 100;
		image.name = (size.name) ? size.name : image.width;
		image.zoom = (size.zoom) ? size.zoom : 1;
		image.suffix = (size.suffix) ? size.suffix : '';

		var imageName = stepNumber + '-' + name + '-' + image.name + image.suffix + '.png';
		var filename = path.join(imagePath, scriptName, String(image.name), imageName);
		
		horseman
			.zoom(image.zoom)
			.viewport((image.zoom * image.width), (image.zoom * image.height));

		if (size.crop) {
			console.log('\tSize', sizeCount, '-', image.name + ' (cropped):', imageName);
			image.crop = size.crop;
			if ( typeof size.crop === "string" ) {
				// Don't crop if selector doesn't exist
				if (!horseman.exists(size.crop)){
					errorCount++;
					console.warn('\tError: selector does not exist');
				}
				else {
					image.crop = size.crop;
					horseman.crop(image.crop, filename);
				}
			}
			else {
				image.crop.top = image.zoom * size.crop.top;
				image.crop.left = image.zoom * size.crop.left;
				image.crop.width = image.zoom * size.crop.width;
				image.crop.height = image.zoom * size.crop.height;
				horseman.crop(image.crop, filename);
			}
		} else {
			console.log('\tSize', sizeCount, '-', image.name + ':', imageName);
			horseman
				.screenshot(filename);
		}

		// Width error appears after screenshot
		if (!size.width){
			console.warn('\tError: width not set - using default (1024px)');
		}

		sizeCount++;
	});

	stepNumber++;

}

horseman.close();

var errorText = (errorCount != 1) ? 'errors' : 'error';
var endMessage = (errorCount) ? (' - ' + errorCount + ' ' + errorText) : '';
console.log("\nAll done" + endMessage);