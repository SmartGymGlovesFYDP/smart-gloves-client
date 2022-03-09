import React from "react";
import {View, StyleSheet,Text} from "react-native";
import colors from "../config/colors";
import { Rating } from "react-native-rating-element";

function DashboardScore({score,rating,month,workouts,minutes}) {
    return (
        <View style={styles.mainC}>
            <View style={styles.avatarC}></View>
            <Text style={styles.viewBreakDown}>View Breakdown</Text>
            <Text style={styles.scoreLabel}>{score}</Text>
            <View style={styles.stars}>
                <Rating
                rated={rating}
                size={24}
                ratingColor={colors.blue3P}
                />
            </View>
            <Text style={styles.monthLabel}>{month} Score</Text>
            <View style={{justifyContent:"space-between", flexDirection:"row"}}>
                <Text style={styles.workoutLabel}>{workouts} Workouts</Text>
                <Text style={styles.minutesLabel}>{minutes} Minutes</Text>
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
    scoreLabel:{
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