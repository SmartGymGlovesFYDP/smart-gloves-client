import React, { useEffect, useState, useContext } from "react";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FirebaseContext } from "../api/FirebaseProvider";
import colors from "../config/colors";
import Header from "../components/Header";
import { Calendar } from "react-native-calendars";
import KeyLabel from "../components/KeyLabel";
import defaultStyles from "../config/styles";
import SimpleCard from "../components/SimpleCard";
import { date } from "yup";

export default function MyProgressScreen({ navigation }) {
  const { getUserWorkoutHistory } = useContext(FirebaseContext);

  const [dataMonth, setDataMonth] = useState(3);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  let tempMarkedDates = {
    "2022-02-04": {
      selected: true,
      selectedColor: colors.green,
    },
    "2022-02-06": {
      selected: true,
      selectedColor: colors.red,
    },
    "2022-02-09": {
      selected: true,
      selectedColor: colors.orange,
    },
    "2022-02-10": {
      selected: true,
      selectedColor: colors.highlight,
    },
    "2022-02-14": {
      selected: true,
      selectedColor: colors.red,
    },
    "2022-02-15": {
      selected: true,
      selectedColor: colors.highlight,
    },
    "2022-02-18": {
      selected: true,
      selectedColor: colors.red,
    },
    "2022-02-22": {
      selected: true,
      selectedColor: colors.green,
    },
    "2022-02-24": {
      selected: true,
      selectedColor: colors.highlight,
    },
    "2022-02-26": {
      selected: true,
      selectedColor: colors.red,
    },
    "2022-02-28": {
      selected: true,
      selectedColor: colors.orange,
    },
    "2022-03-04": {
      selected: true,
      selectedColor: colors.highlight,
    },
    "2022-03-06": {
      selected: true,
      selectedColor: colors.red,
    },
  };
  const [markedDates, setMarkedDates] = useState(tempMarkedDates);

  useEffect(() => {
    getWorkoutHistory();
  }, []);

  useEffect(() => {
    updateCalender();
  }, [workoutHistory]);

  const getWorkoutHistory = async () => {
    let workoutHistory = await getUserWorkoutHistory();
    const history = [];
    workoutHistory.docs.map((doc) => {
      // Append the history object to the array
      history.push(doc.data());
      // console.log(JSON.stringify(doc.data()));
    });
    // console.log("history:", history);
    setWorkoutHistory(history);
  };

  const updateCalender = () => {
    const newMarkedDates = {};
    workoutHistory.forEach((h) => {
      const t = new Date(h.timestamp.seconds * 1000);
      let monthVal = t.getMonth() + 1;
      monthVal =
        monthVal <= 9 ? "0" + monthVal.toString() : monthVal.toString();
      let dayVal = t.getDate();
      dayVal = dayVal <= 9 ? "0" + dayVal.toString() : dayVal.toString();
      const formattedDate =
        t.getFullYear().toString() + "-" + monthVal + "-" + dayVal;
      // console.log(formattedDate);
      if (h.hasOwnProperty("majorMuscle")) {
        let col =
          h.majorMuscle == "Arms"
            ? colors.orange
            : h.majorMuscle == "Legs"
            ? colors.highlight
            : h.majorMuscle == "Chest"
            ? colors.green
            : colors.red;
        newMarkedDates[formattedDate] = {
          selected: true,
          selectedColor: col,
        };
      }
    });
    setMarkedDates({ ...markedDates, ...newMarkedDates });
  };

  // default values
  const countFeb = [4, 2, 3, 2];
  const countMarch = [1, 1, 1, 0];
  let countWorkouts = countMarch;
  const setWorkoutsCount = (month, type) => {
    if (month == 2) {
      countWorkouts = countFeb;
    } else if (month == 3) {
      countWorkouts = countMarch;
    } else {
      countWorkouts = [0, 0, 0, 0];
    }
    return countWorkouts[type];
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header title={"Progress"} primary={true} />
        <ScrollView style={{ height: "100%" }}>
          <Calendar
            enableSwipeMonths={true}
            markedDates={markedDates}
            onMonthChange={(month) => {
              setDataMonth(month.month);
              updateCalender();
            }}
          />
          <Text style={styles.monthlySummaryText}>Month Summary</Text>
          <ScrollView style={styles.scrollHor} horizontal={true}>
            <KeyLabel
              backgroundColor={colors.red}
              title={"Cardio Days"}
              number={setWorkoutsCount(dataMonth, 0)}
            />
            <KeyLabel
              backgroundColor={colors.green}
              title={"Chest Days"}
              number={countWorkouts[1]}
            />
            <KeyLabel
              backgroundColor={colors.highlight}
              title={"Leg Days"}
              number={countWorkouts[2]}
            />
            <KeyLabel
              backgroundColor={colors.orange}
              title={"Arms Days"}
              number={countWorkouts[3]}
            />
          </ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={defaultStyles.primaryText}>My Plans</Text>
            <Text style={defaultStyles.onlyTextButton}>View All</Text>
          </View>
          <SimpleCard name={"Best Chest"} />
          <SimpleCard name={"Army Arms"} />
          <SimpleCard name={"Legs for Days"} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={defaultStyles.primaryText}>My Exercises</Text>
            <Text style={defaultStyles.onlyTextButton}>View All</Text>
          </View>
          <SimpleCard name={"Best Chest"} />
          <SimpleCard name={"Army Arms"} />
          <SimpleCard name={"Legs for Days"} />
          <View style={{ height: 120 }}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteP,
  },
  monthlySummaryText: {
    left: 16,
    top: 5,
    fontStyle: "normal",
    fontSize: 14,
    textAlign: "left",
    color: colors.greyP,
  },
  scrollHor: {
    paddingLeft: 16,
    paddingTop: 10,
    width: "100%",
    flexDirection: "row",
    marginBottom: 16,
  },
});
