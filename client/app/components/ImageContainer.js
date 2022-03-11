import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import colors from "../config/colors";

function ImageContainer({ image }) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    borderRadius: 12,
    height: 200,
    width: "auto",
    backgroundColor: colors.whiteP,
    overflow: "hidden",
    borderColor: colors.lightGreyP,
    borderWidth: 1,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: { height: 2, width: 11 },
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 16,
    marginBottom: 0,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageContainer;
