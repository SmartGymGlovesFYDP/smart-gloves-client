import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

function ProfileButton({
  title,
  onPress,
  color = "white",
  icon,
  fontWeight = "bold",
  width = "100%",
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color], width }]}
      onPress={onPress}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.white}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { fontWeight }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 5,
    margin: "5%",
    borderColor: colors.white,
    flexDirection: "row",
  },
  text: {
    color: colors.black,
    fontSize: 20,
  },
  icon: {
    marginRight: 10,
  },
});

export default ProfileButton;