import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCtX_6_YUgeIs_mrbodPgceWvsuEnT-uDU",
    authDomain: "playground-main-48ae2.firebaseapp.com",
    databaseURL: "https://playground-main-48ae2-default-rtdb.firebaseio.com",
    projectId: "playground-main-48ae2",
    storageBucket: "playground-main-48ae2.firebasestorage.app",
    messagingSenderId: "81721792194",
    appId: "1:81721792194:web:2244ed53f45adaaa28cd5b",
    measurementId: "G-1KR1519GMK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', function(){
    signInWithPopup(auth, provider)
    .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);

        const user = result.user;
        console.log(user);
        window.location.href = "../home.html";

    }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
    });
});