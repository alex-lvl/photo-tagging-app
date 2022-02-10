// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getPerformance } from "firebase/performance";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBN-JllOYRcr_rO-VF1MWU7XOjZkTXyuAM',
  authDomain: 'photo-tagging-3a70f.firebaseapp.com',
  projectId: 'photo-tagging-3a70f',
  storageBucket: 'photo-tagging-3a70f.appspot.com',
  messagingSenderId: '914940221076',
  appId: '1:914940221076:web:6f25f3c57f22a785d98681',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// Initialize Performance Monitoring and get a reference to the service
export const perf = getPerformance(app);

