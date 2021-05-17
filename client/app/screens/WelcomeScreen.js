import React from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { signIn } from "../api/firebaseMethods";
import routes from "../navigation/routes";
import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Smart Gloves</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Sign In Below!</Text>

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
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    container: {
      height: "100%",
      width: "100%",
      backgroundColor: colors.base,
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
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },
    signin_button: {
      width: 305,
      padding: 5,
      backgroundColor: colors.primary,
      borderColor: "white",
      borderRadius: 15,
      alignSelf: "center",
      margin: "5%",
    },
    signup_button: {
      width: 305,
      padding: 5,
      backgroundColor: colors.highlight,
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
      color: colors.highlight,
      textAlign: "center",
      marginTop: "5%",
    },
    textInput: {
      alignSelf: "center",
      width: 300,
      fontSize: 18,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.primary,
      padding: 10,
      margin: 5,
    },
    text: {
      textAlign: "center",
      fontSize: 22,
      margin: "5%",
      marginTop: "5%",
      fontWeight: "bold",
      color: colors.primary,
    },
  },
});

export default WelcomeScreen;