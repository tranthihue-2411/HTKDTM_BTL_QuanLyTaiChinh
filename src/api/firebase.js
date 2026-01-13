


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDWFTwf8BnkS_hEmKUdyIn6wOFIeirPDSg",
  authDomain: "quan-ly-tai-chinh-a9b2a.firebaseapp.com",
  projectId: "quan-ly-tai-chinh-a9b2a",
  storageBucket: "quan-ly-tai-chinh-a9b2a.firebasestorage.app",
  messagingSenderId: "459028224552",
  appId: "1:459028224552:web:38eb4f22743dd9781c731d",
  measurementId: "G-8GCZSJMGGN"
};
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
