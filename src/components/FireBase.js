import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAMO-yO26grUJuAPJoozPlM-E40lTGr9LQ",
  authDomain: "auth-8926c.firebaseapp.com",
  databaseURL: "https://auth-8926c-default-rtdb.firebaseio.com",
  projectId: "auth-8926c",
  storageBucket: "auth-8926c.appspot.com",
  messagingSenderId: "16021970497",
  appId: "1:16021970497:web:6faba3fec8159e550c30c0"
};

const app = initializeApp(firebaseConfig) 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


setPersistence(auth, browserLocalPersistence);

export { auth, provider };
