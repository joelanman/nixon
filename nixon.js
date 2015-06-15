var path = require('path');
var log = require('tracer').colorConsole({
    format : "{{message}}"
});
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

log.debug("running: " + scriptName);

var script = require(path.join(__dirname, 'scripts', scriptName));

if (!script.keepCookies){
	horseman.cookies([]);
}

script.steps.forEach(function(step, index){

	var stepNumber = index + 1;
	var waitForNextPage = false;
	
	log.info(stepNumber + ": " + step.name);

	if (step.open){

		horseman.open(step.open);
		waitForNextPage = true;

	}

	if (waitForNextPage){

		horseman.waitForNextPage();
		waitForNextPage = false;

	}

	if (step.js){

		horseman.manipulate(step.js);
		waitForNextPage = true;

	}

	if (waitForNextPage){

		horseman.waitForNextPage();
		waitForNextPage = false;

	}

	if (step.expectedUrl){

		if (horseman.url() != step.expectedUrl){
			log.warn("Expected URL: " + step.expectedUrl);
			log.warn("Current URL:  " + horseman.url());
		}

	}

	if (step.screenshot != false){

		log.debug(horseman.url());

		script.sizes.forEach(function(size){

			var filename = path.join(imagePath, scriptName, "" + size[0], stepNumber + '-' + step.name + '.png');

			log.debug(filename);

			if (size[2] == "crop") {

				log.debug('crop');
				horseman
					.viewport(size[0], size[1])
					.crop({ top : 0, left: 0, width: size[0], height: size[1] }, filename);

			} else {

				log.debug('screenshot');
				horseman
					.viewport(size[0], size[1])
					.screenshot(filename);

			}

		});
	}

	stepNumber++;

});

horseman.close();
log.debug("All done");