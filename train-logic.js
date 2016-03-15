
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
	

	// Determine when the next train arrives.
	return false;
});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().trainFirst;
	var trainFrequency = childSnapshot.val().frequency;
	
	
	console.log(trainFirst);
		

var timeDifference = moment().diff(moment.unix(trainFirst), "minutes");
console.log(timeDifference);

var minutesAway = trainFrequency - (timeDifference % trainFrequency);
console.log("minutes away: " + minutesAway);

var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');
console.log("Next Train: " + nextTrain);


	
	
	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");

});

//This function displays the time of day at the top of the page and updates every second.
setInterval(date,1000);

function date(){

	$("#todaydate").html(moment(new Date()).format('LTS'));

}

// function getNextTrain(time,freq){

// //time comes in to this function already converted to UNIX value

// var timeDifference = moment().diff(moment.unix(time), "minutes");
// console.log(timeDifference);

// var minutesAway = freq - (timeDifference % freq);
// console.log("minutes away: " + minutesAway);

// var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');
// console.log("Next Train: " + nextTrain);

// }



// // Assumptions
// 		//var tFrequency = 3; 
// 		var firstTime = "03:30"; // Time is 3:30 AM

// 		// First Time (pushed back 1 year to make sure it comes before current time)
// 		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
// 		console.log(firstTimeConverted);

// 		// Current Time
// 		var currentTime = moment();
// 		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// 		// Difference between the times
// 		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// 		console.log("DIFFERENCE IN TIME: " + diffTime);

// 		// Time apart (remainder)
// 		var tRemainder = diffTime % tFrequency; 
// 		console.log(tRemainder);

// 		// Minute Until Train
// 		var tMinutesTillTrain = tFrequency - tRemainder;
// 		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// 		// Next Train
// 		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
// 		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

//console.log(presentTime - firstTrainTime);

//var elapsedTime = presentTime.subtract(time, 'X');

//console.log("Elapsed time since first train UNIX: " + elapsedTime);

//The decimal portion of 'numberOfArrivedTrains is what we care about because it give the portion of the frequency for the wait time'
// var secondsToWait = freq - ((elapsedTime % 1) * freq);
// var minToWait = secondsToWait / 60;
// console.log("Minutes away: " + minToWait);




// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case



