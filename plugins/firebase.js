// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAx5fvZmj3T-UaHk1wGozSUKCdZYomZ2s0",
	authDomain: "nuxt-test-c0ed3.firebaseapp.com",
	projectId: "nuxt-test-c0ed3",
	storageBucket: "nuxt-test-c0ed3.appspot.com",
	messagingSenderId: "149834104760",
	appId: "1:149834104760:web:8e7b328eebc0c3e1e9594d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
