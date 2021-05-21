import React, { useState, useContext } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import { FirebaseContext } from "../api/FirebaseProvider";
import Screen from "../components/Screen";
import PATH from "../navigation/path";
import AppButton from "../components/AppButton";
import AppBackButton from "../components/AppBackButton";

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithEmail } = useContext(FirebaseContext);

  const emptyState = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert("First name is required.");
    } else if (!lastName) {
      Alert.alert("First name is required.");
    } else if (!email) {
      Alert.alert("Email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else {
      signUpWithEmail(email, password, lastName, firstName);
      emptyState();
    }
  };

  const appleSignUp = () => {
    console.log("Apple sign up to be implemented!");
  };

  const googleSignUp = () => {
    console.log("Google sign up to be implemented!");
  };

  return (
    <Screen>
      <View style={styles.topBar}>
        <AppBackButton onPress={() => navigation.navigate(PATH.WELCOME)} />
        <View style={styles.topWrapper}>
          <View style={styles.tab1}>
            <TouchableOpacity onPress={() => navigation.navigate(PATH.SIGNIN)}>
              <Text style={styles.tab1Text}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab2}>
            <Text style={styles.tab2Text}>Sign Up</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.bottomWrapper}>
          <AppButton
            title="Sign up with Apple"
            color="black"
            icon="apple"
            onPress={appleSignUp}
          />

          <AppButton
            title="Sign up with Google"
            color="icewhite"
            icon="google"
            onPress={googleSignUp}
            textBlack
            buttonBorder
          />

          <Text style={styles.text}> or continue with email </Text>
          <View style={styles.inputView}>
            <Text style={[styles.inputTitle, { borderTopWidth: 1 }]}>
              First Name
            </Text>
            <TextInput
              style={[styles.inputBox, { borderTopWidth: 1 }]}
              placeholder="Required"
              value={firstName}
              onChangeText={(firstName) => setFirstName(firstName)}
              autoCapitalize="words"
              autoCompleteType="name"
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Last Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Required"
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
              autoCapitalize="words"
              autoCompleteType="name"
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Email</Text>
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
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="At least 8 characters"
              value={password}
              onChangeText={(password) => setPassword(password)}
              autoCapitalize="none"
              returnKeyType="done"
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.signUpButton}>
          <AppButton
            title="Sign Up"
            color="primary"
            icon="login"
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
  topWrapper: {
    left: "80%",
    flexDirection: "row",
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
    color: colors.black,
    backgroundColor: colors.icewhite,
    paddingTop: 7,
    paddingBottom: 5,
    paddingRight: 12,
    textAlign: "center",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: colors.black,
    borderWidth: 2,
  },
  tab2: {
    flex: 0.5,
  },
  tab2Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.icewhite,
    backgroundColor: colors.black,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    borderRadius: 20,
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
    top: "5%",
    left: "30%",
    color: colors.medium,
  },
  inputView: {
    flexDirection: "row",
    top: "10%",
    left: "11%",
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
  signUpButton: {
    top: "15%",
  },
});
