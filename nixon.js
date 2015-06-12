var path = require('path');
var Horseman = require('node-horseman');
var horseman = new Horseman();

var imagePath = "screenshots";

var argv = require('minimist')(process.argv.slice(2));

var scriptName = argv._[0] || "example";

console.log("running: " + scriptName);

var config = require(path.join(__dirname, 'scripts', scriptName));

console.log("opening URL: " + config.sitePath);

horseman
  .open(config.sitePath);

 var stepNumber = 1;

for (var name in config.steps){
	
	console.log(stepNumber + ": " + name);

	horseman.evaluate(config.steps[name]);

	config.sizes.forEach(function(size){

		var filename = path.join(imagePath, scriptName, stepNumber + '-' + size[0] + 'x' + size[1] + '-' + name + '.png');
		console.log(filename);
		horseman
			.viewport(size[0],size[1])
			.screenshot(filename);
	});

	stepNumber++;

	horseman.wait(1000);
}

horseman.close();