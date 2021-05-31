import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";
import { FirebaseContext } from "../api/FirebaseProvider";
import Screen from "../components/Screen";
import PATH from "../navigation/Path";
import AppButton from "../components/AppButton";
import AppBackButton from "../components/AppBackButton";
import AppText from "../components/AppText";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const { forgotPassword } = useContext(FirebaseContext);

  const handlePress = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }
    forgotPassword(email);
    console.log("Forgot password to be implemented!");
    setEmail("");
  };

  return (
    <Screen>
      <View style={styles.topBar}>
        <AppBackButton onPress={() => navigation.navigate(PATH.SIGNIN)} />
        <Text style={styles.title}>Forgot Password</Text>
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.instructions}>
          <AppText style={styles.instructionText}>
            If you've forgotten your password, enter your email below. If
            there's an associated Smart Gym account, you'll receive an email to
            reset your password.
          </AppText>
          <AppText style={styles.inputTitle}>Email</AppText>
          <TextInput
            style={styles.inputBox}
            placeholder="Required"
            value={email}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCompleteType="email"
            returnKeyType="next"
          />
        </View>
        <View style={styles.signUpButton}>
          <AppButton
            title="Send Reset Email"
            color="highlight"
            onPress={handlePress}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: colors.white,
    flex: 0.15,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
  },
  bottomBar: {
    backgroundColor: "#fff",
    flex: 0.85,
  },
  instructions: {
    marginTop: "8%",
    marginLeft: "8%",
    marginRight: "8%",
  },
  instructionText: {
    fontSize: 16,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    paddingTop: 20,
  },
  inputBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.black,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
  },
});
