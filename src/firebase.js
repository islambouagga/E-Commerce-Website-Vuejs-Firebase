import firebase from "firebase";
require("firebase/firestore");
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBno81OsXPii5SAl3YQr7PsxbZwGrX0Gms",
    authDomain: "vue-shop-8412c.firebaseapp.com",
    databaseURL: "https://vue-shop-8412c.firebaseio.com",
    projectId: "vue-shop-8412c",
    storageBucket: "vue-shop-8412c.appspot.com",
    messagingSenderId: "683795034805",
    appId: "1:683795034805:web:b8ec60bd31aa3eaf7cc4fc",
    measurementId: "G-1Z3ZCGMYTP"
};
// Initialize Firebase
const fb  = firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db  = firebase.firestore();
export {fb,db}
