import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
  updateProfile,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up Firebase persistence
    setPersistence(auth, browserLocalPersistence)
      .catch(error => {
        console.error("Error setting persistence:", error);
      });

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Auth state changed - User logged in:", {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        });
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || currentUser.email.split('@')[0],
          photoURL: currentUser.photoURL
        });
      } else {
        console.log("Auth state changed - User logged out");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log("Email/password login successful:", result.user.email);
      return result.user;
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
      console.log("User created successfully:", result.user.email);
      
      // Update the user's display name
      if (result.user) {
        await updateProfile(result.user, {
          displayName: name
        });
        console.log("User profile updated with display name:", name);
      }
      return result.user;
    } catch (error) {
      console.error("Signup error:", error.code, error.message);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      console.log("Starting Google sign-in process...");
      
      // Set persistence to local before sign-in
      await setPersistence(auth, browserLocalPersistence);
      console.log("Auth persistence set to local");
      
      // Use the pre-configured provider from firebase.js
      console.log("Initiating Google sign-in popup...");
      const result = await signInWithPopup(auth, googleProvider);
      
      // Log successful sign-in details
      console.log("Google sign-in successful:", {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      });
      
      // Get the Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log("Google Auth Credential obtained:", !!credential, "Token obtained:", !!token);
      
      return result.user;
    } catch (error) {
      console.error("Google sign-in error details:", {
        code: error.code,
        message: error.message,
        email: error.email,
        credential: error.credential,
        stack: error.stack
      });
      
      // Check for specific error conditions
      if (error.code === 'auth/popup-blocked') {
        throw new Error('The sign-in popup was blocked. Please enable popups for this site and try again.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('The sign-in popup was closed. Please try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        throw new Error('The previous sign-in popup was still open. Please try again.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('A network error occurred. Please check your internet connection and try again.');
      } else if (error.code === 'auth/internal-error') {
        // For internal errors, we want to retry the operation
        console.log("Attempting to retry Google sign-in due to internal error...");
        try {
          // Small delay before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
          const retryResult = await signInWithPopup(auth, googleProvider);
          return retryResult.user;
        } catch (retryError) {
          console.error("Retry attempt failed:", retryError);
          throw new Error('An internal error occurred. Please try again later.');
        }
      }
      
      // For any other errors, throw with a user-friendly message
      throw new Error(error.message || 'An unexpected error occurred during sign-in. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error.code, error.message);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      console.log("Starting password reset process...");
      
      // Get the current domain
      const currentDomain = window.location.origin;
      console.log("Current domain:", currentDomain);
      
      const actionCodeSettings = {
        url: `${currentDomain}/reset-password`,
        handleCodeInApp: true
      };
      
      console.log("Sending reset email with settings:", actionCodeSettings);
      
      const cleanEmail = email.trim().toLowerCase();
      await sendPasswordResetEmail(auth, cleanEmail, actionCodeSettings);
      
      console.log("Reset email sent successfully");
      return true;
    } catch (error) {
      console.error("Password reset error:", {
        code: error.code,
        message: error.message,
        email: email
      });

      if (error.code === 'auth/unauthorized-domain') {
        console.error("Domain not authorized. Please check Firebase Console settings.");
      }

      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 