import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

/*
 * Important: Make sure to add these domains in Firebase Console:
 * Authentication > Settings > Authorized domains:
 * - localhost
 * - 127.0.0.1
 * - http://localhost:3000
 * - http://localhost:3001
 */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9HIl0bne0BexpYxAmSuWyd06BVrCskxU",
  authDomain: "footy-insights-1f264.firebaseapp.com",
  projectId: "footy-insights-1f264",
  storageBucket: "footy-insights-1f264.appspot.com",
  messagingSenderId: "384445905365",
  appId: "1:384445905365:web:23b54b54ffeac28b39a55c",
  measurementId: "G-04B4L99BJW"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
  // Initialize Analytics
  const analytics = getAnalytics(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Google Auth Provider with additional configuration
const googleProvider = new GoogleAuthProvider();

// Configure Google Auth Provider
googleProvider.setCustomParameters({
  prompt: 'select_account', // Always prompt for account selection
  access_type: 'offline',   // Get refresh token
});

// Add required scopes
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Export the initialized instances
export { auth, googleProvider };
export default app;