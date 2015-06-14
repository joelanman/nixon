
module.exports = {

    username: "",
    password: "",

    sizes: [
        {
            width: 320
        },
        {
            width: 1024,
        },
        {
            name: "iPad",
            width: 768,
            zoom: 2,
            suffix: '_x2'
        },
        {
            name: "Page headings",
            width: 1024,
            crop: 'h1'
        },
        {
            name: "Square crop",
            width: 1024,
            crop: {
                top : 100,
                left: 100,
                width: 100,
                height: 100
            }
        }
    ],

    steps : {

        'home' : "https://www.gov.uk",

        'browse': function(){

            $('.categories-list a')[0].click();

        }
    }
};