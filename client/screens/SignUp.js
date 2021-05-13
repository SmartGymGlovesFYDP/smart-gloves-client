import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { registration } from "../api/firebaseMethods";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emptyState = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert("First name is required");
    } else if (!email) {
      Alert.alert("Email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else if (!confirmPassword) {
      setPassword("");
      Alert.alert("Confirm password field is required.");
    } else if (password !== confirmPassword) {
      Alert.alert("Password does not match!");
    } else {
      registration(email, password, lastName, firstName);
      navigation.navigate("Loading");
      emptyState();
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.text}>Create an account </Text>

          <ScrollView onBlur={Keyboard.dismiss}>
            <TextInput
              style={styles.textInput}
              placeholder="First name"
              value={firstName}
              onChangeText={(name) => setFirstName(name)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Last name"
              value={lastName}
              onChangeText={(name) => setLastName(name)}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Retype your password"
              value={confirmPassword}
              onChangeText={(password2) => setConfirmPassword(password2)}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.signup_button}
              onPress={handlePress}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.inlineText}>Have an account?</Text>
            <TouchableOpacity
              style={styles.signin_button}
              onPress={() => navigation.navigate("Sign In")}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
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
  card: {
    height: 450,
    width: "85%",
    backgroundColor: "#e8eef1",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  signin_button: {
    width: 305,
    padding: 5,
    backgroundColor: "#43b0f1",
    borderColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    margin: "5%",
  },
  signup_button: {
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
