import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = getAuth(firebaseApp);
export const dbService = getFirestore();
export const storageService = getStorage();