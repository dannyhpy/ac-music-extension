// Keeps time and notifies passed in callback on each hour

function TimeKeeper() {

	var hourlyCallback;

	var currHour = (new Date()).getHours();
	var currDay = (new Date()).getDay();

	this.registerHourlyCallback = function(callback) {
		hourlyCallback = callback;
	};

	this.getHour = function() {
		return currHour;
	}

	this.getDay = function() {
		return currDay;
	}

	var timeCheckLoop = function() {
		var newDate = new Date();
		var timeToNext = Math.max(5000, 60000 * (59 - newDate.getMinutes()));
		setTimeout(timeCheckLoop, timeToNext);
		currDay = newDate.getDay();
		// if we're in a new hour
		if(newDate.getHours() != currHour) {
			currHour = newDate.getHours();
			if(hourlyCallback) {
				hourlyCallback(currDay, currHour);
			}
		}
	}

	timeCheckLoop();

	// window.timeCheckDebug = function(day, hour) {
	// 	currDay = day;
	// 	// if we're in a new hour
	// 	if(hour != currHour) {
	// 		currHour = hour;
	// 		if(hourlyCallback) {
	// 			hourlyCallback(currDay, currHour);
	// 		}
	// 	}
	// }

}