import React, { createContext, useContext, useState } from "react";
import * as firebase from "firebase";
import * as Google from "expo-google-app-auth";
import "firebase/firestore";
import { Alert } from "react-native";

const IOS_CLIENT_ID =
  "247175138021-pmp6jvq2ro3m6a0vq7vbuu3u5j6ouk6u.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "247175138021-bi69a16t10cq4bcm9eaq31m5sh7n690v.apps.googleusercontent.com";

export const FirebaseContext = createContext();

export function useFirebase() {
  return useContext(FirebaseContext);
}

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rawData, setRawData] = useState([]);

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

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        );

        firebase
          .auth()
          .signInWithCredential(credential)
          .then((res) => {
            if (res.additionalUserInfo.isNewUser) {
              // user res, create your user, do whatever you want
              // res.additionalUserInfo.isNewUser - flag to show if new user
              // console.log("UID: " + res.user.uid);
              // console.log("New: " + res.additionalUserInfo.isNewUser);
              // console.log("Email: " + res.additionalUserInfo.profile.email);
              // console.log("Last Name: " + res.additionalUserInfo.profile.family_name);
              // console.log("First Name: " + res.additionalUserInfo.profile.given_name);
              const db = firebase.firestore();
              db.collection("users").doc(res.user.uid).set({
                email: res.additionalUserInfo.profile.email,
                lastName: res.additionalUserInfo.profile.family_name,
                firstName: res.additionalUserInfo.profile.given_name,
              });
            }
          })
          .catch((error) => {
            console.log("firebase cred err:", error);
          });
      } else {
        return { cancelled: true };
      }
    } catch (error) {
      Alert.alert("Gmail: There is something wrong!", err.message);
    }
  }

  async function signOut() {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      Alert.alert("Sign Out: There is something wrong!", err.message);
    }
  }

  async function forgotPassword(email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert("Reset Email has been sent to " + email);
    } catch (err) {
      Alert.alert("There is something wrong!", err.message);
    }
  }

  async function getRawData() {
    try {
      await firebase
        .database()
        .ref("/Gyroscope/Sample")
        .on("value", (snapshot) => {
          // setRawData(JSON.stringify(snapshot));
          // console.log("snapshot "+JSON.stringify(snapshot));
          snapshot.forEach((userSnapshot) => {
            let singleData = userSnapshot.val();
            let packet = {
              timestamp: singleData.timestamp ? singleData.timestamp : "",
              ax: singleData.ax,
              ay: singleData.ay,
              az: singleData.az,
              gx: singleData.gx,
              gy: singleData.gy,
              gz: singleData.gz,
            };
            // console.log(singleData);
            setRawData((rawData) => [...rawData, packet]);
          });
        });
    } catch (err) {
      Alert.alert("Failed to sample data!", err.message);
    }
  }

  async function getAllWorkouts() {
    try {
      let workouts = await firebase.firestore().collection("workouts").get();
      return workouts;
    } catch (err) {
      Alert.alert("Failed to get workouts!", err.message);
    }
  }

  async function addWorkout(obj, userId) {
    try {
      var db = firebase.firestore();
      db.collection("workouts").doc(obj.name)
        .set(obj)
        // .then((docRef) => {
        //   console.log("Document written with ID: ", docRef.id);
        // })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } catch (err) {
      Alert.alert("Failed to add workout!", err.message);
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        user,
        setUser,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        signOut,
        forgotPassword,
        rawData,
        getRawData,
        setRawData,
        getAllWorkouts,
        addWorkout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
