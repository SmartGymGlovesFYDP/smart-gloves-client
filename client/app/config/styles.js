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
    fontWeight: "medium",
    color: colors.greyP,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-end",
    padding: 16,
  },

  primaryText: {
    fontSize: 18,
    fontWeight: "medium",
    color: colors.black,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-end",
    padding: 16,
  },

  secondaryText: {
    fontSize: 14,
    fontWeight: "regular",
    color: colors.black,
    textAlign: "left",
    display: "flex",
    alignItems: "flex-end",
    padding: 16,
  },
  //---end of text css---

  //
};
