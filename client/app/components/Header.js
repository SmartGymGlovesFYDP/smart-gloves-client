import React from "react";
import {View, StyleSheet,Text} from "react-native";
import { Button } from "react-native-paper";
import colors from "../config/colors";
import AppBackButton from "./AppBackButton";

function Header({ title, primary,}) {
    if (primary){
        return (
            <View style={styles.mainHeaderWrapper}>
                <Text style={styles.mainHeader}>{title}</Text>
            </View>
        );
    }else{
        return (
            <View style={styles.secondaryHeaderWrapper}>
                <Text style={styles.secondaryHeader}>{title}</Text>
                <AppBackButton></AppBackButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  mainHeaderWrapper:{
    height: 120,
    backgroundColor: colors.whiteP,
    flexDirection: "column-reverse",
  },
  secondaryHeaderWrapper:{
    height: 120,
    backgroundColor: colors.blue2P,
    flexDirection: "column-reverse",
  },
  mainHeader: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "left",
    padding: 16,
  },
  secondaryHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
    padding: 16,
  },
});

export default Header;
