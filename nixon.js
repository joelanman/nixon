var path = require('path');
var Horseman = require('node-horseman');
var horseman = new Horseman();
var config = require(path.join(__dirname, 'config'));
var imagePath = "screenshots";

console.log(config.sitePath);

horseman
  .open(config.sitePath);

 var stepNumber = 1;

for (var name in config.steps){
	
	console.log(stepNumber + ": " + name);

	console.log(config.steps[name]);

	horseman.evaluate(config.steps[name]);

	config.sizes.forEach(function(size){

		var filename = path.join(imagePath, stepNumber + '-' + size[0] + 'x' + size[1] + '-' + name + '.png');
		console.log(filename);
		horseman
			.viewport(size[0],size[1])
			.screenshot(filename);
	});

	stepNumber++;

	horseman.wait(1000);
}

horseman.close();