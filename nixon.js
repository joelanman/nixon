var path = require('path');
var sugar = require('sugar');
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

var argv = require('minimist')(process.argv.slice(2));

var scriptName = argv._[0] || "example";

var script = require(path.join(__dirname, 'scripts', scriptName));

console.log("running: " + scriptName);

// Image save path
var imagePath = "screenshots";
var stringTime = Date.create().format('{yyyy}-{MM}-{dd}T{hh}-{mm}-{ss}');
var saveFolder = path.join(imagePath, scriptName);

// If not overwrite, save to datetime folder.
if (!script.overwrite){
	saveFolder = path.join(saveFolder, stringTime);
}

if (!script.keepCookies){
	horseman.cookies([]);
}

var stepNumber = 1;

for (var name in script.steps){
	
	console.log(stepNumber + ": " + name);

	var step = script.steps[name];

	if (step.call){

		horseman.manipulate(step);

	} else {

		horseman.open(step);

	}

	//console.log("waiting for next page ...");

	horseman.waitForNextPage();

	//console.log("... done waiting");
	console.log(horseman.url());

	script.sizes.forEach(function(size){

		var filename = path.join(saveFolder, "" + size[0], stepNumber + '-' + name + '.png');
		console.log(filename);

		if (size[2] == "crop") {

			console.log('crop');
			horseman
				.viewport(size[0], size[1])
				.crop({ top : 0, left: 0, width: size[0], height: size[1] }, filename);

		} else {

			console.log('screenshot');
			horseman
				.viewport(size[0], size[1])
				.screenshot(filename);

		}

	});

	stepNumber++;

}

horseman.close();
console.log("All done");