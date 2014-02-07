
var system = require('system');

exports.config = {

    sitePath: 'https://staging-frontend.ertp.alphagov.co.uk/register-to-vote',

    username: system.env.IER_STAGING_USERNAME,
    password: system.env.IER_STAGING_PASSWORD,

    sizes : [,
        [1024,768],
        [320,480]
    ],

    steps : {

        'home' : function(){

        },

        'part of uk': function(){

            this.click('#get-started .button');
        },

        'part of uk error': function(){

            this.click('#continue');

        }
    }
};