import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import { FirebaseContext } from "../api/FirebaseProvider";
import Screen from "../components/Screen";
import PATH from "../navigation/path";
import AppButton from "../components/AppButton";
import AppBackButton from "../components/AppBackButton";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithEmail, signInWithGoogle } = useContext(FirebaseContext);

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

  const appleSignIn = () => {
    console.log("Apple sign in to be implemented!");
  };

  const googleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <Screen>
      <View style={styles.topBar}>
        <AppBackButton onPress={() => navigation.navigate(PATH.WELCOME)} />
        <View style={styles.topWrapper}>
          <View style={styles.tab2}>
            <TouchableOpacity onPress={() => navigation.navigate(PATH.SIGNUP)}>
              <Text style={styles.tab2Text}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab1}>
            <Text style={styles.tab1Text}>Sign In</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.bottomWrapper}>
          <AppButton
            title="Sign in with Apple"
            color="black"
            icon="apple"
            onPress={appleSignIn}
          />

          <AppButton
            title="Sign in with Google"
            color="icewhite"
            icon="google"
            onPress={googleSignIn}
            textBlack
            buttonBorder
          />

          <Text style={styles.text}> or continue with email </Text>
          <View style={styles.inputView}>
            <Text style={[styles.inputTitle, { borderTopWidth: 1 }]}>
              Email
            </Text>
            <TextInput
              style={[styles.inputBox, { borderTopWidth: 1 }]}
              placeholder="user@example.com"
              value={email}
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCompleteType="email"
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="********"
              value={password}
              onChangeText={(password) => setPassword(password)}
              autoCapitalize="none"
              returnKeyType="done"
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.signInButton}>
          <AppButton
            title="Sign In"
            color="highlight"
            icon="login"
            onPress={handlePress}
          />
        </View>

        <Text
          style={styles.forgotText}
          onPress={() => navigation.navigate(PATH.FORGOT)}
        >
          {" "}
          Forgot your password?{" "}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: colors.white,
    flex: 0.15,
  },
  topWrapper: {
    left: "80%",
    flexDirection: "row-reverse",
    width: "50%",
    alignContent: "center",
    // backgroundColor: "black",
  },
  tab1: {
    flex: 0.5,
    marginRight: -16,
  },
  tab1Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.icewhite,
    backgroundColor: colors.black,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    borderRadius: 20,
  },
  tab2: {
    flex: 0.5,
  },
  tab2Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    backgroundColor: colors.icewhite,
    paddingTop: 7,
    paddingBottom: 5,
    paddingLeft: 12,
    textAlign: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: colors.black,
    borderWidth: 2,
  },
  bottomBar: {
    backgroundColor: "#fff",
    flex: 0.85,
    height: "100%",
  },
  bottomWrapper: {
    top: "5%",
  },
  text: {
    justifyContent: "center",
    top: "7%",
    left: "30%",
    color: colors.medium,
  },
  inputView: {
    flexDirection: "row",
    top: "10%",
    left: "15%",
  },
  inputTitle: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
    flex: 0.25,
    borderColor: colors.black,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    textAlign: "right",
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputBox: {
    fontSize: 14,
    flex: 0.55,
    borderColor: colors.black,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  signInButton: {
    top: "15%",
  },
  forgotText: {
    justifyContent: "center",
    top: "20%",
    left: "30%",
    color: colors.medium,
  },
});
