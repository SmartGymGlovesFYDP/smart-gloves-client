import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { FirebaseContext } from "../api/FirebaseProvider";
import PATH from "../navigation/path";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithEmail } = useContext(FirebaseContext);

  const handlePress = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }

    if (!password) {
      Alert.alert("Password field is required.");
    }

    signInWithEmail(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Smart Gloves</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Sign In Below! </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.signin_button} onPress={handlePress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.inlineText}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.signup_button}
          onPress={() => navigation.navigate(PATH.SIGNUP)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1e3d58",
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
  signin_button: {
    width: 305,
    padding: 5,
    backgroundColor: "#057dcd",
    borderColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    margin: "5%",
  },
  signup_button: {
    width: 305,
    padding: 5,
    backgroundColor: "#43b0f1",
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
  inlineText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#43b0f1",
    textAlign: "center",
    marginTop: "5%",
  },
  textInput: {
    alignSelf: "center",
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#057dcd",
    padding: 10,
    margin: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 22,
    margin: "5%",
    marginTop: "5%",
    fontWeight: "bold",
    color: "#057dcd",
  },
});
