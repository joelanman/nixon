var request = require("request");

var dorianURL = "https://dorian.herokuapp.com";

function uploadToDorian(data){

	// post data

	var formData = {
	};

	var requestURL = dorianURL + "/services/" + data.service;
	
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