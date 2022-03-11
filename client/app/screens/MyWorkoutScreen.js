import React, { useState, useEffect, useContext } from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import { FirebaseContext } from "../api/FirebaseProvider";
import Header from "../components/Header";
import Screen from "../components/Screen";
import colors from "../config/colors";
import PATH from "../navigation/Path";
import WorkoutList from "../components/WorkoutList";
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from "react-native";

export default function MyWorkoutScreen({ navigation, route }) {
  const { getUserWorkoutHistory } = useContext(FirebaseContext);

  const [workoutHistory, setWorkoutHistory] = useState([]);

  const [currWeek, setCurrWeek] = useState([]);
  const [thisMonth, setThisMonth] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);
  const [previous, setPrevious] = useState([]);

  const [currWeekScore, setCurrWeekScore] = useState(0);
  const [thisMonthScore, setThisMonthScore] = useState(0);
  const [lastMonthScore, setLastMonthScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);
  const [currWeekStar, setCurrWeekStar] = useState(0);
  const [thisMonthStar, setThisMonthStar] = useState(0);
  const [lastMonthStar, setLastMonthStar] = useState(0);
  const [previousStar, setPreviousStar] = useState(0);

  // TODO : Fix Loading Issue
  // TODO : Fix View All Button

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getWorkoutHistory();
  }, []);

  const getWorkoutHistory = async () => {
    let workoutHistory = await getUserWorkoutHistory();
    const history = [];
    workoutHistory.docs.map((doc) => {
      // Append the history object to the array
      history.push(doc.data());
      console.log(JSON.stringify(doc.data()));
    });
    // console.log("history:", history);
    setWorkoutHistory(history);
    await populateAllList();
  };

  const populateAllList = async () => {
    const tmpCurrWeek = [];
    const tmpThisMonth = [];
    const tmpLastMonth = [];
    const tmpPrevious = [];
    let today = new Date();
    let currDay = today.getDate();
    let currMonth = today.getMonth();

    let tmpCurrWeekScore = 0;
    let tmpThisMonthScore = 0;
    let tmpLastMonthScore = 0;
    let tmpPreviousScore = 0;

    workoutHistory.forEach(function (workout) {
      let workoutDate = workout.timestamp.toDate();
      let workoutDay = workoutDate.getDate();
      let workoutMonth = workoutDate.getMonth();

      if (currMonth - workoutMonth > 1) {
        tmpPrevious.push(workout);
        tmpPreviousScore = tmpPreviousScore + workout.overallScore;
        // console.log(tmpPreviousScore)
      } else if (currMonth - workoutMonth == 1) {
        tmpLastMonth.push(workout);
        tmpLastMonthScore = tmpLastMonthScore + workout.overallScore;
      } else if (currMonth == workoutMonth) {
        if (currDay > 7) {
          let lWeek = currDay - 7;
          if (workoutDay <= lWeek) {
            tmpThisMonth.push(workout);
            tmpThisMonthScore = tmpThisMonthScore + workout.overallScore;
          } else {
            tmpCurrWeek.push(workout);
            tmpCurrWeekScore = tmpCurrWeekScore + workout.overallScore;
          }
        } else {
          tmpCurrWeek.push(workout);
          tmpCurrWeekScore = tmpCurrWeekScore + workout.overallScore;
        }
      }
      // console.log("TODAY: " + today);
      // console.log("HERE: " + workout.timestamp.toDate().getMonth());
    });

    setCurrWeek(tmpCurrWeek);
    setThisMonth(tmpThisMonth);
    setLastMonth(tmpLastMonth);
    setPrevious(tmpPrevious);

    if (tmpCurrWeekScore > 0) {
      setCurrWeekScore(tmpCurrWeekScore / currWeek.length);
      if (currWeekScore >= 90) {
        setCurrWeekStar(5.0);
      } else if (currWeekScore >= 80) {
        setCurrWeekStar(4.5);
      } else if (currWeekScore >= 70) {
        setCurrWeekStar(4.0);
      } else if (currWeekScore >= 60) {
        setCurrWeekStar(3.5);
      } else if (currWeekScore >= 50) {
        setCurrWeekStar(3.0);
      } else if (currWeekScore >= 40) {
        setCurrWeekStar(2.5);
      } else if (currWeekScore >= 30) {
        setCurrWeekStar(2.0);
      } else if (currWeekScore >= 20) {
        setCurrWeekStar(1.5);
      } else if (currWeekScore >= 10) {
        setCurrWeekStar(1.0);
      } else {
        setCurrWeekStar(0.0);
      }
    }
    if (tmpThisMonthScore > 0) {
      setThisMonthScore(tmpThisMonthScore / thisMonth.length);
      if (thisMonthScore >= 90) {
        setThisMonthStar(5.0);
      } else if (thisMonthScore >= 80) {
        setThisMonthStar(4.5);
      } else if (thisMonthScore >= 70) {
        setThisMonthStar(4.0);
      } else if (thisMonthScore >= 60) {
        setThisMonthStar(3.5);
      } else if (thisMonthScore >= 50) {
        setThisMonthStar(3.0);
      } else if (thisMonthScore >= 40) {
        setThisMonthStar(2.5);
      } else if (thisMonthScore >= 30) {
        setThisMonthStar(2.0);
      } else if (thisMonthScore >= 20) {
        setThisMonthStar(1.5);
      } else if (thisMonthScore >= 10) {
        setThisMonthStar(1.0);
      } else {
        setThisMonthStar(0.0);
      }
    }
    if (tmpLastMonthScore > 0) {
      setLastMonthScore(tmpLastMonthScore / lastMonth.length);
      if (lastMonthScore >= 90) {
        setLastMonthStar(5.0);
      } else if (lastMonthScore >= 80) {
        setLastMonthStar(4.5);
      } else if (lastMonthScore >= 70) {
        setLastMonthStar(4.0);
      } else if (lastMonthScore >= 60) {
        setLastMonthStar(3.5);
      } else if (lastMonthScore >= 50) {
        setLastMonthStar(3.0);
      } else if (lastMonthScore >= 40) {
        setLastMonthStar(2.5);
      } else if (lastMonthScore >= 30) {
        setLastMonthStar(2.0);
      } else if (lastMonthScore >= 20) {
        setLastMonthStar(1.5);
      } else if (lastMonthScore >= 10) {
        setLastMonthStar(1.0);
      } else {
        setLastMonthStar(0.0);
      }
    }
    if (tmpPreviousScore > 0) {
      setPreviousScore(tmpPreviousScore / previous.length);
      if (previousScore >= 90) {
        setPreviousStar(5.0);
      } else if (previousScore >= 80) {
        setPreviousStar(4.5);
      } else if (previousScore >= 70) {
        setPreviousStar(4.0);
      } else if (previousScore >= 60) {
        setPreviousStar(3.5);
      } else if (previousScore >= 50) {
        setPreviousStar(3.0);
      } else if (previousScore >= 40) {
        setPreviousStar(2.5);
      } else if (previousScore >= 30) {
        setPreviousStar(2.0);
      } else if (previousScore >= 20) {
        setPreviousStar(1.5);
      } else if (previousScore >= 10) {
        setPreviousStar(1.0);
      } else {
        setPreviousStar(0.0);
      }
    }

    console.log(
      "Current Week Workouts = " + currWeek + " SCORE = " + currWeekScore
    );
    console.log(
      "Current Month Workouts = " + thisMonth + " SCORE = " + thisMonthScore
    );
    console.log(
      "Last Month Workouts = " + lastMonth + " SCORE = " + lastMonthScore
    );
    console.log(
      "Previous Workouts = " + previous + " SCORE = " + previousScore
    );
  };

  let currWeekData = currWeek.map((exercise, index) => ({
    id: index + 1,
    title: exercise.workoutName,
    description: exercise.description,
    timestamp: exercise.timestamp.toDate().toString().substring(0, 15),
    minutes: exercise.duration,
    sets: exercise.sets,
    reps: exercise.reps,
    overallScore: exercise.overallScore,
    leftHandScore: exercise.leftHandScore,
    rightHandScore: exercise.rightHandScore,
    stars: exercise.stars,
    tips: exercise.tips,
  }));

  let thisMonthData = thisMonth.map((exercise, index) => ({
    id: index + 1,
    title: exercise.workoutName,
    description: exercise.description,
    timestamp: exercise.timestamp.toDate().toString().substring(0, 15),
    minutes: exercise.duration,
    sets: exercise.sets,
    reps: exercise.reps,
    overallScore: exercise.overallScore,
    leftHandScore: exercise.leftHandScore,
    rightHandScore: exercise.rightHandScore,
    stars: exercise.stars,
    tips: exercise.tips,
  }));

  let lastMonthData = lastMonth.map((exercise, index) => ({
    id: index + 1,
    title: exercise.workoutName,
    description: exercise.description,
    timestamp: exercise.timestamp.toDate().toString().substring(0, 15),
    minutes: exercise.duration,
    sets: exercise.sets,
    reps: exercise.reps,
    overallScore: exercise.overallScore,
    leftHandScore: exercise.leftHandScore,
    rightHandScore: exercise.rightHandScore,
    stars: exercise.stars,
    tips: exercise.tips,
  }));

  let previousData = previous.map((exercise, index) => ({
    id: index + 1,
    title: exercise.workoutName,
    description: exercise.description,
    timestamp: exercise.timestamp.toDate().toString().substring(0, 15),
    minutes: exercise.duration,
    sets: exercise.sets,
    reps: exercise.reps,
    overallScore: exercise.overallScore,
    leftHandScore: exercise.leftHandScore,
    rightHandScore: exercise.rightHandScore,
    stars: exercise.stars,
    tips: exercise.tips,
  }));

  return (
    <Screen style={styles.screen}>
      <Header title={"My Workouts"} navigation={navigation} PATH={PATH.HOME} />
      <ScrollView style={styles.scrollview}>
        <View>
          <WorkoutList
            title1={"This Week"}
            thisListScore={currWeekScore}
            thisListData={currWeekData}
            navigation={navigation}
            PATH={PATH.EXERCISE_HISTORY}
          />
          <WorkoutList
            title1={"This Month"}
            thisListScore={thisMonthScore}
            thisListData={thisMonthData}
            navigation={navigation}
            PATH={PATH.EXERCISE_HISTORY}
          />
          <WorkoutList
            title1={"Last Month"}
            thisListScore={lastMonthScore}
            thisListData={lastMonthData}
            navigation={navigation}
            PATH={PATH.EXERCISE_HISTORY}
          />
          <WorkoutList
            title1={"Previous"}
            thisListScore={previousScore}
            thisListData={previousData}
            navigation={navigation}
            PATH={PATH.EXERCISE_HISTORY}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "flex-start",
    backgroundColor: colors.white,
  },
  scrollview: {
    backgroundColor: colors.icewhite,
    flex: 1,
  },
  title: {
    color: colors.greyP,
    fontWeight: "bold",
    fontSize: 16,
    borderStyle: "dashed",
    textAlign: "left",
    paddingTop: 10,
    // paddingBottom: 2,
    paddingLeft: 5,
  },
});
