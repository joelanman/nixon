
module.exports = {

    screenshotPath : "screenshots/[script]/[size.width]-[size.crop]/[##]-[step.name]",
    
    username: "",
    password: "",

    sizes : [
        [1024,768],
        [320,480]
    ],

    steps : [

        {
            name: "home",
            open: "https://www.gov.uk"
        },
        {
            name: "browse",
            js: function(){
                $('.categories-list a')[0].click();
            }

        }
    ]
};