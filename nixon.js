
var system = require('system'),
    config = require('config').config;

casper.options.verbose = true;
casper.options.logLevel = "info";

var imagePath = 'screenshots/';

var stepsArray = [];

for (var step in config.steps){

    stepsArray.push({'name': step,
                     'func': config.steps[step]});

}

casper.log(stepsArray.length, "info");

casper.test.begin('Screenshots', function suite(test) {

    casper.start();

    if (config.username && config.password){

        casper.setHttpAuth(config.username, config.password);

    }

    casper.thenOpen(config.sitePath);

    casper.log(stepsArray.length, "info");

    casper.eachThen(stepsArray, function(response){

        var step = response.data;

        casper.log('running ' + step.name, 'info');

        step.func.call(this);

        casper.eachThen(config.sizes, function(response){

            var size = response.data;

            this.viewport(size[0], size[1], function(){

                casper.log('Size: ' + size[0] + 'x' + size[1], 'info');

                casper.wait(10, function() {

                    this.scrollTo(0, 0);

                    var filename = imagePath + size[0] + 'x' + size[1] + '-' + step.name + '.png';
         
                    this.captureSelector(filename, 'body');

                });

            });

        });

    });
/*
    require('utils').dump(casper.steps.map(function(step) {
        return step.toString();
    }));
*/
    casper.run(function() {
        test.done();
    });
});