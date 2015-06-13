
module.exports = {

    username: "",
    password: "",

    sizes : [
        [1024,768],
        [320,480]
    ],

    steps : {

        'home' : "https://www.gov.uk",

        'browse': function(){

            $('.categories-list a')[0].click();

        }
    }
};