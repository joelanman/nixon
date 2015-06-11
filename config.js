
var system = require('system');

exports.config = {

    sitePath: 'https://www.gov.uk',

    username: "",
    password: "",

    sizes : [,
        [1024,768],
        [320,480]
    ],

    steps : {

        'home' : function(){

        },

        'browse': function(){

            this.click('.categories-list a');

        }
    }
};