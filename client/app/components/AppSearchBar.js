import React from "react";
import { View, StyleSheet } from "react-native";

import AppTextInput from "../components/AppTextInput";

function AppSearchBar({ fontSize, placeholder, ...otherProps }) {
  return (
    <View style={styles.container}>
      <AppTextInput
        icon="magnify"
        fontSize={fontSize}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppSearchBar;
