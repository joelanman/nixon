var request = require("request");
var fs = require('fs');

var dorianURL = "https://dorian.herokuapp.com";

function uploadToDorian(serviceData){

	// post data

	var formData = {

  		"file-data": fs.createReadStream(process.cwd() + '/data.json'),

	};

	var requestURL = dorianURL + "/services/" + serviceData.slug;

	console.log(requestURL);

	console.log("Uploading data");
	
	request.post({url:requestURL, formData: formData}, function optionalCallback(err, httpResponse, body) {
		if (err) {
			return console.error('upload failed:', err);
		}
		console.log('Upload successful!  Server responded with:', body);
	});

	// upload images

	console.log("Uploading images");

	serviceData.journeys.forEach(function(journey){

		journey.screens.forEach(function(screen){

			// post data

			console.log("upload: " + process.cwd() +"/" + screen['image-path']);

			var formData = {

		  		"file-image": fs.createReadStream(process.cwd() +"/" + screen['image-path'])

			};

			var requestURL = dorianURL + "/services/" + serviceData.slug + "/" + serviceData.datetime + "/" + journey.slug + "/images";

			console.log(requestURL);
			
			request.post({url:requestURL, formData: formData}, function optionalCallback(err, httpResponse, body) {
				if (err) {
					return console.error('upload failed:', err);
				}
				console.log('Upload successful!  Server responded with:', body);
			});

		});

	});

}

module.exports = uploadToDorian;