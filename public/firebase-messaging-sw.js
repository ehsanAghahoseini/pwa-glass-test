importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyCA4ylNBAIX_HqLCDrB5we0mK1EvK43doI",
    authDomain: "javaproject-251506.firebaseapp.com",
    projectId: "javaproject-251506",
    storageBucket: "javaproject-251506.appspot.com",
    messagingSenderId: "742253838312",
    appId: "1:742253838312:web:57672758e271fda5a9ee5d",
    measurementId: "G-G50VDG2CM2"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    const notificationTitle = 'New message In Optics4less ChatBox';
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/assets/almubdi.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
    // return registration.showNotification({
    //     "to": "abc",
    //     "data": {
    //         "notification": {
    //             title: "New message In Optics4less ChatBox",
    //             body: payload.notification.body,
    //             icon: '/assets/almubdi.png'
    //         }
    //     }
    // });
});