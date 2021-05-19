import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import defaultStyles from "../config/styles";

function AppSearchBar({
  width = "100%",
  fontSize = 18,
  placeholder,
  onClear,
  ...otherProps
}) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="magnify"
        size={fontSize}
        color={defaultStyles.colors.medium}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={defaultStyles.colors.medium}
          style={defaultStyles.text}
          {...otherProps}
        />
      </View>
      <MaterialCommunityIcons
        name="close"
        size={fontSize}
        color={defaultStyles.colors.medium}
        style={styles.iconLeft}
        onPress={onClear}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: defaultStyles.colors.white,
    borderColor: colors.primary,
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  iconLeft: {
    alignSelf: "flex-end",
  },
});

export default AppSearchBar;
