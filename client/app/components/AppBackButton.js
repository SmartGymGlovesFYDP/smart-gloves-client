import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AppBackButton({ onPress }) {
  return (
    <View style={styles.backArrow}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={colors.black}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backArrow: {
    top: 15,
    left: 15,
    width: 40,
    padding: 7,
  },
});

export default AppBackButton;
