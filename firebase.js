import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "you_API-KEI",
	authDomain: "example-firebase-domain-project.firebaseapp.com",
	projectId: "example-name-firebase-project",
	storageBucket: "example-firebase-storage-bucket.appspot.com",
	messagingSenderId: "1234567890",
	appId: "1:1234567890:web:v543634v53v6345v6",
	measurementId: "G-RGWEG2345G",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

// all info here is an example
// you can import variabel from .env but... i dont make it, because this project has been stopped
