// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBo0I9TmyEnDgJjXm__CeCjygbjV-mr3ho",

    authDomain: "bullsshire.firebaseapp.com",
  
    projectId: "bullsshire",
  
    storageBucket: "bullsshire.appspot.com",
  
    messagingSenderId: "769524937575",
  
    appId: "1:769524937575:web:ff568046aec7c0e2b875c2",
  
    measurementId: "G-6856QVV3DV"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;