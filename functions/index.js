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
});