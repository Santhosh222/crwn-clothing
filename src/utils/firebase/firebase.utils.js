import { initializeApp } from 'firebase/app';
import { getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3AoSLf9EsTesVK3jJV1TqQc91yrZkJjs",
  authDomain: "crwn-clothing-db-7a9cf.firebaseapp.com",
  projectId: "crwn-clothing-db-7a9cf",
  storageBucket: "crwn-clothing-db-7a9cf.appspot.com",
  messagingSenderId: "479249171930",
  appId: "1:479249171930:web:92de938795420943ab2ce3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);