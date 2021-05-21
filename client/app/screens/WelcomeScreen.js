import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import Background from "../assets/background.mp4";
import Screen from "../components/Screen";
import PATH from "../navigation/path";
import AppButton from "../components/AppButton";

export default function WelcomeScreen({ navigation }) {
  return (
    <Screen>
      <Video
        style={styles.backgroundVideo}
        source={Background}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <Text style={styles.text}>
        Join the new wearable movement in making training smarter.
      </Text>
      <View style={styles.buttonView}>
        <AppButton
          title="Continue"
          color="black"
          icon="login"
          onPress={() => navigation.navigate(PATH.SIGNIN)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "left",
    top: "25%",
    left: "10%",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0,
  },
  buttonView: {
    top: "50%",
  },
});
