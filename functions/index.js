const functions = require("firebase-functions");

const admin = require("firebase-admin")
admin.initializeApp()

exports.createUserData = functions.auth.user().onCreate((user) => {
    const newProfile = {
        username: "",
        userPref: {
            "pomodoroInitial": 1500,
            "shortInitial": 300,
            "longInitial": 600,
            "autoStartTimer": false,
            "autoStartTasks": false
            },
        userStats: {
            "longestStreak": 0,
                "streak": 0,
                "lastLoginDate": "",
                "pomoData": {
                        "Monday": 0,
                        "Tuesday": 0,
                        "Wednesday": 0, 
                        "Thursday": 0,
                        "Friday": 0,
                        "Saturday": 0,
                        "Sunday": 0
                    }
            },
    }
    admin.database().ref("/users/" + user.uid).set(newProfile)
    return null
});

//check if user has logged in everyday at 11:59PM
exports.scheduledFunctionCrontab = functions.pubsub.schedule('59 23 * * *')
  .timeZone('America/Chicago') // Users can choose timezone - default is America/Los_Angeles
  .onRun((context) => {
    //Compare last login timestamp vs current timestamp
    let loginTimeStamp;
    let loginDateRef = admin.database().ref("/users/" + user.uid + "/userStats/lastLoginDate")
    loginDateRef.once('value', (snapshot) => {
        loginTimeStamp = snapshot.val();
    });
    let currentTimeStamp = context.timestamp;
    loginTimeStamp = parseInt(loginTimeStamp)
    currentTimeStamp = parseInt(currentTimeStamp)
    const timeDiff = loginTimeStamp - currentTimeStamp

    //if timestamp difference > 86400 seconds, then user has not logged in within 24 hrs
    let newStreak;
    let streakRef = admin.database().ref("/users/" + user.uid + "/userStats/streak")
    streakRef.once('value', (snapshot) => {
        newStreak = snapshot.val()
    })
    if (timeDiff > 86400) {
        newStreak = 0
    } else {
        newStreak = newStreak + 1
    }
    //update streak
    streakRef.set(newStreak)
    return null
  })

//Clear out tasks from last week at start of current day.
exports.scheduledFunctionCrontab = functions.pubsub.schedule('0 0 * * *')
.timeZone('America/Chicago') // Users can choose timezone - default is America/Los_Angeles
.onRun((context) => {
    let currentTimeStamp = context.timestamp()
    //convert UNIX timestamp to ms for conversion
    let currentDate = new Date(parseInt(currentTimeStamp) * 1000)
    const intDay = currentDate.getDay()
    let day;
    switch(intDay) {
        case 0:
            day = 'Sunday'
            break;
        case 1:
            day = 'Monday'
            break;
        case 2:
            day = 'Tuesday'
            break;
        case 3:
            day = 'Wednesday'
            break;
        case 4:
            day = 'Thursday'
            break;
        case 5:
            day = 'Friday'
            break;
        default:
            day = 'Saturday'
            break;
    }
    let pomoDataRef = admin.database().ref("/users/" + user.uid + "/userStats/pomoData")
    pomoDataRef.child(day).set(0)
    return null
});