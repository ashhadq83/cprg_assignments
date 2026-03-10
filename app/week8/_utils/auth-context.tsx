"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  gitHubSignIn: () => Promise<UserCredential>;
  firebaseSignOut: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the AuthContextProvider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const gitHubSignIn = async (): Promise<UserCredential> => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
      throw error;
    }
  };

  const firebaseSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useUserAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUserAuth must be used within an AuthContextProvider");
  }
  return context;
};
