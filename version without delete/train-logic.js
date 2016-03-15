
var trainData = new Firebase("https://ggfirebase.firebaseio.com/");

$("#addTrainBtn").on("click", function(){
	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainFirst = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(1,"years").format("X");
	var trainFrequency = $("#frequencyInput").val().trim();
	
	// Creates local "temporary" object for holding train data
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		trainFirst: trainFirst,
		frequency: trainFrequency
	}
	// Uploads train data to the database
	trainData.push(newTrain);

	
	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	
	return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

// console.log(childSnapshot.val());

// Store everything into a variable.
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainFirst = childSnapshot.val().trainFirst;
var trainFrequency = childSnapshot.val().frequency;

// Determine when the next train arrives.
var timeDifference = moment().diff(moment.unix(trainFirst), "minutes");
// console.log(timeDifference);

var minutesAway = trainFrequency - (timeDifference % trainFrequency);
// console.log("minutes away: " + minutesAway);

var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');
// console.log("Next Train: " + nextTrain);
	
// Add each train's data into the table 
$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");

});

setInterval(date,1000);

function date(){
//This function displays the time of day at the top of the page and updates every second.
	$("#todaydate").html(moment(new Date()).format('LTS'));

}

