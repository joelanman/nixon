var page = require('webpage').create();

var url = "https://www.gov.uk"

console.log(url);

page.open(url, function() {
  page.render('screenshots/' + url.replace(/https?:\/\/[w.]*/,'') + '.png');
  phantom.exit();
});