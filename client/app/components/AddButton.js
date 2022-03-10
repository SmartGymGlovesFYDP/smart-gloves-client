import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

function AddButton({
  title,
  onPress,
  color,
  icon,
  fontWeight = "bold",
  width,
  textBlack,
  buttonBorder,
}) {
  if (buttonBorder) {
    return (
      <TouchableOpacity
        style={[styles.buttonBorder, { backgroundColor: colors[color], width }]}
        onPress={onPress}
      >
        {icon &&
          (textBlack ? (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.black}
              style={styles.icon}
            />
          ) : (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.white}
              style={styles.icon}
            />
          ))}
        {textBlack ? (
          <Text style={[styles.textBlack, { fontWeight }]}>{title}</Text>
        ) : (
          <Text style={[styles.text, { fontWeight }]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color], width }]}
      onPress={onPress}
    >
      {icon &&
        (textBlack ? (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.black}
            style={styles.icon}
          />
        ) : (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.white}
            style={styles.icon}
          />
        ))}
      {textBlack ? (
        <Text style={[styles.textBlack, { fontWeight }]}>{title}</Text>
      ) : (
        <Text style={[styles.text, { fontWeight }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginHorizontal: "8%",
    marginVertical: "3%",
    borderColor: colors.black,
    flexDirection: "row",
  },
  buttonBorder: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginHorizontal: "8%",
    marginVertical: "3%",
    borderColor: colors.black,
    borderWidth: 2,
    flexDirection: "row",
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
  textBlack: {
    color: colors.black,
    fontSize: 20,
  },
  icon: {
    marginRight: 10,
  },
});

export default AddButton;
