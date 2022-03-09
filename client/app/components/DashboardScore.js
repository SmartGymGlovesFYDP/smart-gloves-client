import React from "react";
import {View, StyleSheet,Text} from "react-native";
import colors from "../config/colors";
import { Rating } from "react-native-rating-element";

function DashboardScore() {
    return (
        <View style={styles.mainC}>
            <View style={styles.avatarC}></View>
            <Text style={styles.viewBreakDown}>View Breakdown</Text>
            <Text style={styles.score}>80</Text>
            <View style={styles.stars}>
                <Rating
                rated={4}
                size={24}
                ratingColor={colors.blue3P}
                />
            </View>
            <Text style={styles.monthLabel}>June Score</Text>
            <View style={{justifyContent:"space-between", flexDirection:"row"}}>
                <Text style={styles.workoutLabel}>15 Workouts</Text>
                <Text style={styles.minutesLabel}>269 Minutes</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainC:{
        height: 200,
        backgroundColor: colors.whiteP,
      },
    avatarC:{
        position: "absolute",
        width: 36,
        height: 36,
        left: 16,
        top: 5,
        backgroundColor: colors.black,
        borderColor: colors.lightGreyP,
        borderRadius: 100,
    },
    viewBreakDown:{
        position: "absolute",
        right: 16,
        top: 16,
        fontStyle: "normal",
        fontSize: 14,
        textAlign: "right",
        color: colors.blue3P,
    },
    score:{
        alignSelf: "center",
        top: 50,
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 36,
        textAlign: "center",
        color: colors.black,
    },
    monthLabel:{
        alignSelf: "center",
        top: 65,
        fontStyle: "normal",
        fontSize: 18,
        textAlign: "center",
        color: colors.black,
    },
    stars:{
        alignSelf: "center",
        top: 55,
    },
    workoutLabel:{
        left: 16,
        top: 80,
        fontStyle: "normal",
        fontSize: 14,
        textAlign: "left",
        color: colors.greyP,
    },
    minutesLabel:{
        //alignSelf: "flex-end",
        right: 16,
        top: 80,
        fontStyle: "normal",
        fontSize: 14,
        textAlign: "right",
        color: colors.greyP,
    }
});

export default DashboardScore;