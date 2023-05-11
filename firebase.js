  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
  import { getAuth ,GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCRxZ-Poa2rwQY1-p7Ilb-VxyIpeMk45Sc",
    authDomain: "movies-booking-6bd6e.firebaseapp.com",
    projectId: "movies-booking-6bd6e",
    storageBucket: "movies-booking-6bd6e.appspot.com",
    messagingSenderId: "475946387889",
    appId: "1:475946387889:web:eef61beaddadf9162f5590",
    measurementId: "G-JBNPF3N9N7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(app);

 login.addEventListener('click',(e) => {
   
// sign in with popup tab
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;


    alert(user.displayName);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...

    alert(errorMessage);
  });
 });

  signOut.addEventListener('click',(e) => {

   signOut(auth).then(() => {
    // Sign-out successful.
   }).catch((error) => {
    // An error happened.
   });

  });

