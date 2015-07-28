var request = require("request");
var fs = require('fs');

var dorianURL = "https://dorian.herokuapp.com";

function uploadToDorian(data){

	// post data

	var formData = {

  		"file-data": fs.createReadStream(__dirname + '/../data.json'),

	};

	var requestURL = dorianURL + "/services/" + data.slug;

	console.log(requestURL);
	
	request.post({url:requestURL, formData: formData}, function optionalCallback(err, httpResponse, body) {
		if (err) {
			return console.error('upload failed:', err);
		}
		console.log('Upload successful!  Server responded with:', body);
	});

	// loop journeys

	// loop screens

	// post images

}

module.exports = uploadToDorian;