import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-wi9sORP3xYLS1Z3TUsccBMhNp_tU-e4",
    authDomain: "image-community-437dc.firebaseapp.com",
    projectId: "image-community-437dc",
    storageBucket: "image-community-437dc.appspot.com",
    messagingSenderId: "999089773405",
    appId: "1:999089773405:web:8365bcbc726d89c677e6b4",
    measurementId: "G-T2N2M4BV1Z"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
//session 로그인 유지하기 위한 apikey값 전달!
const auth = firebase.auth();
const firestore = firebase.firestore();

export{auth, apiKey, firestore};


