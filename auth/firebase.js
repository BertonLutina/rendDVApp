// Import the functions you need from the SDKs you need
import * as firebaseAll from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebase = firebaseAll.default;

export const firebaseConfig = {
  apiKey: "AIzaSyB2CZC_N3-OxNbYi-lwyIkFVr2Gkex2Fwc",
  appName: "renDV",
  authDomain: "rendvapp.firebaseapp.com",
  projectId: "rendvapp",
  storageBucket: "rendvapp.appspot.com",
  messagingSenderId: "417379968965",
  appId: "1:417379968965:web:4b726e8188187dba514dac",
  measurementId: "G-Z4GWTV4PQJ"
};

// Initialize Firebase

if(firebase.apps.length == 0){
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const _firebase = firebase;
