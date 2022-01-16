const { initializeApp } = require('firebase-admin/app');

initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});