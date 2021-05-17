import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";

function CategoryPickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon backgroundColor={item.backgroundColor} name={item.icon} />
      <AppText style={styles.label}>{item.label}</AppText>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});
export default CategoryPickerItem;
