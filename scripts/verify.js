
module.exports = {

    sitePath: 'https://www.gov.uk/update-company-car-details',

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

            $('.categories-list a')[0].click();

        }
    }
};