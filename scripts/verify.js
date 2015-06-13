
module.exports = {

    username: "",
    password: "",

    sizes : [,
        [1024, 768, "crop"],
        [320, 480]
    ],

    steps : {

        'start' : 'https://www.gov.uk/update-company-car-details',

        'saml': function(){

            $('#get-started a')[0].click();

        },

        'verify-home': function(){

            // auto redirect from SAML

        },

        'sign-in': function(){

            $('#no')[0].click();
            $('#next-button')[0].click();

        },

        'slide-2': function(){

            $('a:contains("start now")')[0].click();

        },

        'slide-3': function(){

            $('#next-button')[0].click();

        },

        'slide-4': function(){

            $('#next-button')[0].click();

        },

        'age-uk': function(){

            $('#next-button')[0].click();

        },

        'statements': function(){

            $('#age-yes')[0].click();
            $('#residency-more-than-12')[0].click();
            $('#next-button')[0].click();

        },

        'documents': function(){

            $('#yes')[0].click();
            $('#next-button')[0].click();

        },

        'choose-company': function(){

            $('#driving_license_yes')[0].click();
            $('#passport_yes')[0].click();
            $('#next-button')[0].click();

        },

        'about-company': function(){

            $('.company-about a')[0].click();

        },

        'company-chosen': function(){

            $('.dialog-inner:visible button')[0].click();

        }

    }
};