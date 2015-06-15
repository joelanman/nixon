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

waitForNextPage = false;

function checkForWait(){

	if (waitForNextPage){

		horseman.waitForNextPage();
		waitForNextPage = false;

	}

}

var screenshotNumber = 1;

script.steps.forEach(function(step, index){

	waitForNextPage = false;
	
	log.info((index+1) + ": " + step.name);

	if (step.open){

		horseman.open(step.open);
		waitForNextPage = true;

	}

	checkForWait();

	if (step.js){

		horseman.manipulate(step.js);
		waitForNextPage = true;

	}

	checkForWait();

	if (step.expectedUrl){

		if (horseman.url() != step.expectedUrl){
			log.warn("Expected URL: " + step.expectedUrl);
			log.warn("Current URL:  " + horseman.url());
		}

	}

	if (step.screenshot != false){

		log.debug(horseman.url());

		script.sizes.forEach(function(size){

			var filename = path.join(imagePath, scriptName, "" + size[0], screenshotNumber + '-' + step.name + '.png');

			if (size[2] == "crop") {

				log.debug('crop');
				log.debug(filename);

				horseman
					.viewport(size[0], size[1])
					.crop({ top : 0, left: 0, width: size[0], height: size[1] }, filename);

			} else {

				log.debug('screenshot');
				log.debug(filename);

				horseman
					.viewport(size[0], size[1])
					.screenshot(filename);

			}

		});

		screenshotNumber++;
	}

});

horseman.close();
log.info("All done");
