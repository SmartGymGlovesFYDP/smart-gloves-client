import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { FirebaseContext } from "../api/FirebaseProvider";
import Card from "../components/Card";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import AppSearchBar from "../components/AppSearchBar";
import colors from "../config/colors";
import PATH from "../navigation/Path";

export default function ExercisesScreen({ navigation }) {
  // NOTE: Ideally this will be the DS used to add a single workout back to the DB
  // var temp = {
  //   createdBy: "Smart Gym",
  //   dateCreated: new Date().toLocaleString(),
  //   equipment: ["Dumbbells"],
  //   exerciseType: ["Cardio"],
  //   gloveSupport: true,
  //   howToDescription: "To be added",
  //   majorMuscle: ["Core"],
  //   minorMuscle: ["N/A"],
  //   name: "Weighted Punches",
  //   notes: "",
  //   userId: ["dSxXdEz906Yso1XK9nTK805XQWA3"],
  //   variation: [
  //     { difficulty: 2, minutes: 10, repetition: 10, sets: 3 },
  //     { difficulty: 4, minutes: 20, repetition: 20, sets: 5 },
  //     { difficulty: 5, minutes: 30, repetition: 30, sets: 7 },
  //   ],
  //   visibility: "public",
  // };

  // NOTE: Example of an object printed on console
  // Object {
  //   "createdBy": "Smart Gym",
  //   "dateCreated": "Thu Jun 24 14:06:52 2021",
  //   "equipment": Array [
  //     "Dumbbells",
  //   ],
  //   "exerciseType": Array [
  //     "Weight",
  //   ],
  //   "gloveSupport": true,
  //   "howToDescription": "To be added",
  //   "majorMuscle": Array [
  //     "Arms",
  //   ],
  //   "minorMuscle": Array [
  //     "Bicep",
  //     "Shoulders",
  //   ],
  //   "name": "Arnold Press",
  //   "notes": "",
  //   "userId": Array [
  //     "dSxXdEz906Yso1XK9nTK805XQWA3",
  //   ],
  //   "variation": Array [
  //     Object {
  //       "difficulty": 2,
  //       "minutes": 10,
  //       "repetition": 10,
  //       "sets": 3,
  //     },
  //     Object {
  //       "difficulty": 4,
  //       "minutes": 20,
  //       "repetition": 20,
  //       "sets": 5,
  //     },
  //     Object {
  //       "difficulty": 5,
  //       "minutes": 30,
  //       "repetition": 30,
  //       "sets": 7,
  //     },
  //   ],
  //   "visibility": "public",
  // }

  // Firebase Context for handling the fetching of the workouts from Firestore DB
  const { rawData, getRawData, setRawData, getAllWorkouts, addWorkout } =
    useContext(FirebaseContext);

  // Array of exercise objects
  const [exercises, setExercises] = useState([]);
  const [workoutsAll, setWorkoutsAll] = useState([]);

  const [search, setSearch] = useState("");
  // right now the mainDataState will seem very redundant but when pulling data from server we will need to handle the initial fetch
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [mainDataSource, setMainDataSource] = useState([]);

  // TODO: deserialize JSON response of exercise list from server
  useEffect(() => {
    setFilteredDataSource(workoutsAll);
    setMainDataSource(workoutsAll);
  }, [workoutsAll, exercises]);

  const resetRawData = async () => {
    setRawData([]);
    console.log("Data has been reset.");
  };

  const fetchRawData = async () => {
    if (rawData.length === 0) {
      await getRawData();
    }
    // console.log(rawData[0].ax);
    console.log(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      console.log(rawData[i]);
    }
    // console.log(JSON.stringify(rawData));
    // setData(getRawData());
    // console.log(data);
  };

  const fetchWorkouts = async () => {
    let workouts = await getAllWorkouts();
    // This will add all exercises from the database
    workouts.docs.map((doc) => {
      // Append the exercise object to the array
      setExercises((exercises) => [...exercises, doc.data()]);
      // console.log(JSON.stringify(doc.data()));
    });

    let temp = exercises.map((exercise, index) => ({
      id: index + 1,
      title: exercise.name,
      difficulty: exercise.variation[0].difficulty,
      minutes: exercise.variation[0].minutes,
      sets: exercise.variation[0].sets,
      reps: exercise.variation[0].repetition,
      majorMuscle: exercise.majorMuscle[0],
    }));

    // console.log("HEREEEE" + JSON.stringify(temp));

    setWorkoutsAll(temp);

    // Example to print the specific field from exercise object
    // console.log(exercises[0].equipment);
    // console.log(exercises[0]);
  };

  const clearWorkouts = () => {
    console.log("CLEARED");
    setExercises([]);
    setWorkoutsAll([]);
  };

  const addNewWorkout = async () => {
    console.log("This function will be used to add a new workout");
    // This is for adding all the Workout Objects
    // allWorkouts.forEach(async function (arrayItem) {
    //   console.log(arrayItem);
    //   await addWorkout(arrayItem, "dSxXdEz906Yso1XK9nTK805XQWA3");
    // });
  };

  const searchFilterFunction = (text) => {
    if (text) {
      // check exists search request matches by checking if index exists
      const newData = mainDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // reset to show original list
      setFilteredDataSource(mainDataSource);
      setSearch(text);
    }
  };

  return (
    <Screen style={styles.screen}>
      <AppSearchBar
        placeholder="Discover your next workout! ..."
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction("")}
        value={search}
      />
      <AppButton
        title="Print All Workouts"
        color="black"
        onPress={fetchWorkouts}
      />
      <AppButton
        title="Clear Workout Array"
        color="black"
        onPress={clearWorkouts}
      />
      <FlatList
        data={filteredDataSource}
        keyExtractor={(workoutsAll) => workoutsAll.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            difficulty={item.difficulty}
            // image={item.image}
            minutes={item.minutes}
            sets={item.sets}
            reps={item.reps}
            onPress={() => navigation.navigate(PATH.EXERCISE_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
  },
});
