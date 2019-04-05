var request = require("request");
request("http://www.google.com", function(error, response, body) {
  // Print the error if one occurred
  console.log("error:", error);
  // Print the response status code if a response was received
  console.log("statusCode:", response && response.statusCode);
  // Print the HTML for the Google homepage.
  console.log("body:", body);
});
