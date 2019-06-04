const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const fb_storage = admin.storage();
const { join, dirname } = require('path');
const { tmpdir } = require('os');
const { Storage } = require('@google-cloud/storage');
const gcs = new Storage();
const fs = require('fs-extra');
const ffmpeg_static = require('ffmpeg-static');
const ffmpeg = require("fluent-ffmpeg");

const algolia = require('algoliasearch');
const ALGOLIA_ID = '9P69AUNI16';
const ALGOLIA_ADMIN_KEY = '97ecc8cf58d7cbb654bfb66f1d46ec0b';

const ALGOLIA_INDEX_NAME = 'videos';
const client = algolia(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

exports.uploadedVideos = functions.firestore.document('/uploadedVideos/{docID}').onWrite((change, context) => {
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    // checking if the video doc exist in the db
    if (change.after.exists) {
        console.log('copying to Algolia');
        newDataObjectForAlgolia = change.after.data();
        newDataObjectForAlgolia.objectID = change.after.id;

        return index.saveObject(newDataObjectForAlgolia)
            .then(successObject => {
                console.log('Added to Algolia Success')
                console.log(newDataObjectForAlgolia);
                console.log(successObject);
            })
            .catch(err => {
                console.log('Algolia Failed ' + err);
            });
    } else {
        console.log('deleteing from Algolia');
        return index.deleteObject(change.after.id)
            .then(successObject => {
                console.log('Deleted From Algolia Success');
                console.log(successObject);
            })
            .catch(err => {
                console.log('Algolia delete failed ' + err);
            })
    }
});

// Makes an ffmpeg command return a promise.
function promisifyCommand(command) {
    return new Promise((resolve, reject) => {
        command.on('end', resolve).on('error', reject).run();
    });
}

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
                            uid: uid,
                            profilePic: ''
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

// function to delete the complete user db and auth
exports.deleteUserAuthAsAdmin = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email)
        .then(function (userRecord) {
            admin.auth().deleteUser(userRecord.uid)
                .then(function () {
                    console.log("Successfully deleted user auth");
                })
                .catch(function (error) {
                    console.log("Error deleting user:", error);
                });
        })
})
exports.deleteUserAsAdmin = functions.https.onCall((data, context) => {
    return db.collection('validuser').doc(data.uid).delete().then(() => {
        console.log(data.uid + " removed")
    }).catch(err => {
        console.log(err.message)
    })
})

// function to compress the uplaoded video using ffmpeg
exports.compressVideo = functions.storage.object().onFinalize(async object => {
    // reference to the firebase storage bucket
    const bucket = gcs.bucket(object.bucket)
    // full path of uploaded file 
    const filePath = object.name;
    console.log('file path: ' + filePath)
    // reference to file name
    const fileName = filePath.split('/').pop().split('.').slice(0, -1).join('.');
    console.log('file name:' + fileName)
    // reference to dir where the file came from so to use it to save the thumbnail back again
    const bucketDir = dirname(filePath);
    console.log('bucketDir:')
    console.log(bucketDir)
    // creating a working directory called thumbs where we are going to do the operation
    const workingDir = join(tmpdir(), 'thumbs')
    // source name path
    const tempFilePath = join(workingDir, 'source.mp4')
    const videoConName = `video@${fileName}.mp4`;
    const tempVideoPath = join(workingDir, `video@${fileName}.mp4`)
    // break point to prevent event loop
    if (fileName.includes('video@') || !object.contentType.includes('video/mp4')) {
        console.log('exiting funciton');
        return false;
    }

    // ensure if the working dir exists
    await fs.ensureDir(workingDir);
    console.log('check dir')
    //download the source file 
    await bucket.file(filePath).download({
        destination: tempFilePath
    })

    console.log('downloaded source' + tempFilePath)

    // default .mp4 
    let command = ffmpeg('/tmp/thumbs/source.mp4')
        .setFfmpegPath(ffmpeg_static.path)
        .videoCodec('libx264')
        .audioBitrate('100k')
        .addOptions(['-crf 40', '-preset superfast'])
        .format('mp4')
        .output(`/tmp/thumbs/video@${fileName}.mp4`)

    await promisifyCommand(command);
    console.log('command1')
    await bucket.upload(tempVideoPath, {
        destination: join(bucketDir, videoConName),
        uploadType: "media",
        metadata: {
            contentType: 'video/mp4',
            metadata: {
                firebaseStorageDownloadTokens: object.metadata.firebaseStorageDownloadTokens
            }
        }
    })
    console.log('uploaded video')
    console.log('deleting workingDir')
    return fs.remove(workingDir);
})

// function to replace and delete the old url with compress video 
exports.replaceUrl = functions.storage.object().onFinalize(async object => {
    // full path of uploaded file 
    console.log(object.metadata)
    const filePath = object.name;
    console.log('file path: ' + filePath)
    // reference to file name
    const fileName = filePath.split('/').pop();
    console.log('file name: ' + fileName)

    // break point to prevent event loop
    if (fileName.includes('video@') && object.contentType.includes('video/mp4')) {
        // finding old file name from the newly compressed video of it
        const oldFileName = fileName.split('video@').pop().split('.').slice(0, -1).join('.');
        console.log('old file name: ' + oldFileName)

        // making new url
        const new_url = 'https://firebasestorage.googleapis.com/v0/b/thevsapp.appspot.com/o/'
            + encodeURIComponent(object.name)
            + '?alt=media&token='
            + object.metadata.firebaseStorageDownloadTokens;
        console.log('new url: ' + new_url)

        // fetching data and performing update on url
        db.collection('uploadedVideos')
            .where('title', '==', oldFileName)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log('doc id: ' + doc.id)
                    console.log(doc.data())
                    //update the old url with new_url
                    db.collection('uploadedVideos')
                        .doc(doc.id)
                        .update({
                            'url': new_url
                        }).then(() => { return console.log('updated url success') })
                })
            })
            .catch(err => {
                console.log('err: ' + err.message)
            })

    } else {
        console.log('exiting funciton');
        return false;
    }
})

exports.deleteVideo = functions.firestore.document('uploadedVideos/{id}').onUpdate((snap, context) => {
    fb_storage
        .bucket()
        .file(`video/${snap.after.data().by}/${snap.after.data().title}.mp4`)
        .delete()
        .then(() => { console.log('old video deleted successfully') })
        .catch(err => {
            console.log('err: ' + err.message)
        })

    return true;
})

exports.addAdminRole = functions.https.onCall((data, context) => {
    // get user and add admin custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin.`
        }
    }).catch(err => {
        return err;
    });
});
