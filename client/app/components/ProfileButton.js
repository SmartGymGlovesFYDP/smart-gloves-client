import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

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
    <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
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
      <Text style={[styles.text, { fontWeight: "bold" }]}>{title}</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: '#FFFFFF',
    padding: 10,
    textTransform: 'lowercase', // Notice this updates the default style
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
});

export default ProfileButton;