
var system = require('system'); 
var username = system.env.IER_STAGING_USERNAME; 
var password = system.env.IER_STAGING_PASSWORD; 


casper.options.verbose = true;
casper.options.logLevel = "info";

casper.log("username: " + username, "info");
casper.log("password: " + password, "info");

var imagePath = 'screenshots/',
    sitePath = 'https://staging-frontend.ertp.alphagov.co.uk/register-to-vote';

var sizes = [,
    [1024,768],
    [320,480]
];

var steps = {

    'home' : function(){

    },

    'part of uk': function(){

        this.click('#get-started .button');
    },

    'part of uk error': function(){

        this.click('#continue');

    },
};

var stepsArray = [];

for (var step in steps){

    stepsArray.push({'name': step,
                     'func': steps[step]});

}

casper.log(stepsArray.length, "info");

casper.test.begin('Register to Vote', function suite(test) {

    casper.start();

    casper.setHttpAuth(username, password);

    casper.thenOpen(sitePath);

    casper.log(stepsArray.length, "info");

    casper.eachThen(stepsArray, function(response){

        var step = response.data;

        casper.log('running ' + step.name, 'info');

        step.func.call(this);

        casper.eachThen(sizes, function(response){

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