import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import * as firebase from "firebase";
import { FirebaseContext } from "../api/FirebaseProvider";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

export default function ProfileScreen({ navigation }) {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { signOut } = useContext(FirebaseContext);

  useEffect(() => {
    async function getUserInfo() {
      try {
        let doc = await firebase
          .firestore()
          .collection("users")
          .doc(currentUserUID)
          .get();

        if (!doc.exists) {
          Alert.alert("No user data found!");
        } else {
          let dataObj = doc.data();
          setFirstName(dataObj.firstName);
          setLastName(dataObj.lastName);
          setEmail(dataObj.email);
        }
      } catch (err) {
        Alert.alert("There is an error.", err.message);
      }
    }
    getUserInfo();
  });

  const handlePress = () => {
    signOut();
  };

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.text}>
        Hi {firstName} {lastName}!
      </Text>
      <Text style={styles.text}>Email: {email}</Text>
      <AppButton
        title="Sign Out"
        color="primary"
        onPress={handlePress}
        icon="logout"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontStyle: "italic",
    marginTop: "2%",
    marginBottom: "10%",
    fontWeight: "bold",
    color: colors.black,
  },
});
