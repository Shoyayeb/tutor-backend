const express = require("express");
const cors = require("cors");
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAcount.json");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const { getAuth } = require('firebase-admin/auth');
app.use(cors());
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASEDBURL,
});

function run() {
    app.get("/userupdate", (req, res) => {
        const email = req.headers["email"] ? req.headers.email : null;
        console.log(email);
        console.log(JSON.stringify(email));
        if (!email)
            res.send("no header provided")
        getAuth()
            .updateUser(email, {
                email: 'modifiedUser@example.com',
                phoneNumber: '+11234567890',
                emailVerified: true,
                password: 'newPassword',
                displayName: 'Jane Doe',
                photoURL: 'http://www.example.com/12345678/photo.png',
                disabled: true,
            })
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully updated user', userRecord.toJSON());
            })
            .catch((error) => {
                console.log('Error updating user:', error);
            });
        // .getUserByEmail(email)
        // .then((userRecord) => {
        //     // res.send(`Successfully fetched user data: ${userRecord.toJSON()}`);
        //     console.log(userRecord.uid);
        //     const uid = userRecord.uid;
        // })

        // .catch((error) => {
        //     res.send('Error fetching user data:', error);
        // });

    });
}
run();
app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(port, () => {
    console.log("Running server on", port);
});
