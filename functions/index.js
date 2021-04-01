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
                "longestStreak": 0,
                "lastLoginDate": Date.now(),
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
    admin.database().ref("/userList").push(user.uid)
    return null
});

//Clear out tasks from last week at start of current day.
exports.clearTasksWeekly = functions.pubsub.schedule('0 0 * * *')
.timeZone('America/Chicago') // Users can choose timezone - default is America/Los_Angeles
.onRun((context) => {
    let currentTimeStamp = context.timestamp
    //convert UNIX timestamp to ms for conversion
    const intDay = new Date(currentTimeStamp).getDay()
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
    //loop through all users
    let pomoDataRef
    let usersRef = admin.database().ref('/userList').orderByKey();
    usersRef.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            //skip for demo user
            if (childSnapshot.val() !== "qfu6s8IHrHZAIdFPxgQOodTByLQ2") {
                pomoDataRef = admin.database().ref('/users/' + childSnapshot.val() + '/userStats/pomoData')
                pomoDataRef.child(day).set(0)
            }
        })
    })
    return null
});