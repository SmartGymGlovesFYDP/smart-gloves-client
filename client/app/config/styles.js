import { Platform } from "react-native";
import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.black,
    fontSize: 18,
  },

  // fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",

  //---Text CSS---
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-end",
    padding: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.greyP,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-end",
    padding: 16,
  },

  primaryText: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.black,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-end",
    padding: 16,
  },

  secondaryText: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.black,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-end",
    padding: 16,
  },

  onlyTextButton: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.blue3P,
    textAlign: "right",
    alignItems: "center",
    padding: 16,
  },
  //---end of text css---
};
