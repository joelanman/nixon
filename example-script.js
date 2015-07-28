
module.exports = {

    screenshotPath : "screenshots/[service]/[journey]/[size.width]-[size.crop]/[##]-[step.name]",

    sizes : [
        [1024,768],
        [320,480]
    ],

    service: "GOV.UK",
    slug: "gov-uk",

    journeys: [

        {

            name: "Browse",
            slug: "browse",

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
        }
    ]
};