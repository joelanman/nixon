
module.exports = {

    screenshotPath : "screenshots/[service]/[journey]/[size.width]-[size.crop]/[##]-[step.name]",

    sizes : [
        [320,480],
        [1024,768]
    ],

    service: "GOV.UK",
    slug: "gov-uk",
    datetime: "2015-10-21T12:23:31.803Z",

    journeys: [

        {

            name: "Browse",
            slug: "browse",

            steps : [

                {
                    open: "https://www.gov.uk",
                    screenshot: "home"
                },
                {
                    js: function(){
                        $('.categories-list a')[0].click();
                    },
                    screenshot: "browse"

                }
            ]
        }
    ]
};