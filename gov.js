var page = require('webpage').create();
page.open('https://www.gov.uk/', function() {
  page.render('gov.png');
  phantom.exit();
});