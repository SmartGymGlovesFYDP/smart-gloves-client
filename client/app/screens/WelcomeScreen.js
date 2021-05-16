import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { AppForm, AppFormField } from "../components/forms";

import { signIn } from "../api/firebaseMethods";
import routes from "../navigation/routes";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";

function WelcomeScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }

    if (!password) {
      Alert.alert("Password field is required.");
    }

    signIn(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Smart Gloves</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.buttonsContainer}>
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
          <AppButton title="Sign In" onPress={handlePress} />
          <Text style={styles.inlineText}>Don't have an account?</Text>
          <AppButton
            title="Sign Up"
            color="highlight"
            onPress={() => navigation.navigate("Sign Up")}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.base,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    position: "absolute",
    top: 120,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  contentContainer: {
    height: 400,
    width: "85%",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonsContainer: {
    width: "85%",
    alignItems: "center",
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
    width: "100%",
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
});

export default WelcomeScreen;
