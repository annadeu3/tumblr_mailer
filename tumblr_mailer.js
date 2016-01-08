var fs = require('fs');

var csvFile = fs.readFileSync("friend_list.csv", 'utf8');

function csvParse(csvFile) {
	//each line in the csvFile is a contact-> separate each one
	//do not include the first line (header)
	//use slice method to remove the header -> .slice(1)
	var contacts = csvFile.split("\n").slice(1);

}
