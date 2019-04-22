const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore()

// function to delete user if email not verified after every 12hrs
exports.deleteUser = functions.pubsub.topic('deleteUser').onPublish(() => {
    db.collection('validuser').where('active', '==', false)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                admin.auth().getUserByEmail(doc.data().email)
                    .then(function (userRecord) {
                        if (!userRecord.emailVerified) {
                            admin.auth().deleteUser(userRecord.uid)
                                .then(function () {
                                    console.log("Successfully deleted user");
                                })
                                .catch(function (error) {
                                    console.log("Error deleting user:", error);
                                });
                        }
                    }).then(() => {
                        // we will reset the deleted data records
                        const email = doc.data().email;
                        const uid = doc.data().uid;
                        db.collection('validuser').doc(doc.data().uid).set({
                            active: false,
                            email: email,
                            uid: uid
                        })
                    })
                    .catch(function (error) {
                        console.log("Error fetching user data:", error);
                    });
            });
        }).catch(err => {
            console.log(err.message)
        })
    return true;
});
