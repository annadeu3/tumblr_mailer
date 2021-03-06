var fs = require('fs');
var ejs = require('ejs'); // load EJS into our project
var tumblr = require('tumblr.js');

//to import contacts and email template
var csvFile = fs.readFileSync("friend_list.csv", 'utf8');
var emailTemplate = fs.readFileSync('email_template', 'utf-8');

function csvParse(file) {
	//each line in the csvFile is a contact-> separate each one
	//do not include the first line (header)
	//use slice method to remove the header -> .slice(1)
	var lines = file.split("\n");
	//isolate the keys in the header (line 1)
	var key = lines[0].split(",");
	lines.splice(0,1);
	var arrayContacts = [];
	var data = [];
	for (var i = 0; i < lines.length; i++) {
		var newObj = {};
		arrayContacts = lines[i].split(",");
		for (var j = 0; j < key.length; j++) {
			newObj[key[j]] = arrayContacts[j];
		}
		data.push(newObj);
		}
	return data;
}

var csvData = csvParse(csvFile);


//tumblr authentication
var client = tumblr.createClient({
  consumer_key: 'iYPBFt5tZjt0zLaN2dgt2icTcrAcjCvdHVv1otFnXT0LC12MRT',
  consumer_secret: '14lGsydgodg1iFMRMJelAVSHqh0HA1nnFQJkFC13kCLCu9SqKr',
  token: 'eIhNkiEJqmipgSPEtWltBZkqUI8UzC7YZB5TwkvCKFxxJGytas',
  token_secret: 'h20TYxkAhWyveCBluh1u0J846d4wczvKtMzOtDs746F649Bqfi'
});

client.posts('deuWhile.tumblr.com', function(err, blog){
  var allPosts = blog.posts;
  var latestPosts = [];

  for (var j = 0; j < allPosts.length; j++) {
  	var todaysDate = new Date();
  	var postDate = new Date(blog.posts[j].date);

  	//milliseconds in 7 weeks= 1000millisec*60sec*60min*24hr*7days
  	if ((todaysDate.getTime() - postDate.getTime()) < (1000*60*60*24*7)) {
  		latestPosts.push(blog.posts[j]);
  	};
  }


  for (var k = 0; k < csvData.legnth; k++) {
  	var friendFirst = csvData[k].firstName;
  	var lastContact = csvData[k].numMonthsSinceContact;
	
	var customTemplate = ejs.render(emailTemplate, {
        firstName: firstName,  
     	numMonthsSinceContact: numMonthsSinceContact,
        latestPosts: latestPosts
        });
	console.log(customTemplate);
	}
});




//var fs = require('fs');

//var csvFile = fs.readFileSync("friend_list.csv","utf8");
//var emailTemplate = fs.readFileSync('email_template.html', 'utf8');

// function csvParse(csvFile){
//     var arrayOfObjects = [];
//     var arr = csvFile.split("\n");
//     var newObj;

//     keys = arr.shift().split(",");

//     arr.forEach(function(contact){
//         contact = contact.split(",");
//         newObj = {};

//         for(var i =0; i &lt; contact.length; i++){
//             newObj[keys[i]] = contact[i];
//         }

//         arrayOfObjects.push(newObj);

//     })

//     return arrayOfObjects;
// }

// friendList = csvParse(csvFile);

// friendList.forEach(function(row){

//     var firstName = row["firstName"];
//     var numMonthsSinceContact = row["numMonthsSinceContact"];

//     // we make a copy of the emailTemplate variable to a new variable to ensure
//        // we don't edit the original template text since we'll need to us it for 
//        // multiple emails

//     var templateCopy = emailTemplate;

//     // use .replace to replace FIRST_NAME and NUM_MONTHS_SINCE_CONTACT with firstName and  monthsSinceLastContact  
//     templateCopy = templateCopy.replace(/FIRST_NAME/gi,
//     firstName).replace(/NUM_MONTHS_SINCE_CONTACT/gi, numMonthsSinceContact);

//     console.log(templateCopy);


// })