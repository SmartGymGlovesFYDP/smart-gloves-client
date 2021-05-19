import React, { createContext, useContext, useState } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from "react-native";

// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

export const FirebaseContext = createContext();

export function useFirebase() {
  return useContext(FirebaseContext);
}

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function signInWithEmail(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      Alert.alert("Sign In: There is something wrong!", err.message);
    }
  }

  async function signUpWithEmail(email, password, lastName, firstName) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser;

      const db = firebase.firestore();
      db.collection("users").doc(currentUser.uid).set({
        email: currentUser.email,
        lastName: lastName,
        firstName: firstName,
      });
    } catch (err) {
      Alert.alert("Sign Up: There is something wrong!", err.message);
    }
  }

  //   async function signInWithGmail() {
  //     try {
  //         // Get the users ID token
  //         const { idToken } = await GoogleSignin.signIn();

  //         // Create a Google credential with the token
  //         const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);

  //         // Sign-in the user with the credential
  //         await firebase.auth().signInWithCredential(googleCredential)
  //         //we need to catch the whole sign up process if it fails too.
  //         .catch(error => {
  //             console.log('Gmail: Something went wrong with sign up: ', error);
  //         });
  //       } catch(error) {
  //         Alert.alert("Gmail: There is something wrong!", err.message);
  //       }
  //   }

  async function signOut() {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      Alert.alert("Sign Out: There is something wrong!", err.message);
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        user,
        setUser,
        signUpWithEmail,
        signInWithEmail,
        // signInWithGmail,
        signOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
