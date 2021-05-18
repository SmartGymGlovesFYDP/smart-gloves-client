import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as firebase from "firebase";
import { FirebaseContext } from "../api/FirebaseProvider";
import PATH from "../navigation/Path";

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
    // navigation.replace(PATH.SIGNIN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Screen</Text>
      </View>
      <Text style={styles.text}>
        Hi {firstName} {lastName}!
      </Text>
      <Text style={styles.text}>Email: {email}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#43b0f1",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    position: "absolute",
    top: 170,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  card: {
    height: 400,
    width: "85%",
    backgroundColor: "#e8eef1",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  button: {
    width: 305,
    padding: 5,
    backgroundColor: "#057dcd",
    borderColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    margin: "5%",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
    marginTop: "2%",
    marginBottom: "10%",
    fontWeight: "bold",
    color: "black",
  },
});
