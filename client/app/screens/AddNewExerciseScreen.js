import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FirebaseContext } from "../api/FirebaseProvider";
import colors from "../config/colors";
import Screen from "../components/Screen";
import Header from "../components/Header";
import PATH from "../navigation/Path";
import DropDownPicker from "react-native-dropdown-picker";
import AddButton from "../components/AddButton";

export default function AddNewExerciseScreen({ navigation }) {

  difficultyDictionary = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];

  equipmentDictionary = [
    { label: "Band", value: "Band" },
    { label: "Dumbbells", value: "Dumbbells" },
    { label: "Body Weight", value: "Body Weight" },
    { label: "Medicine Ball", value: "Medicine Ball" },
    { label: "Bar", value: "Bar" },
  ];

  exerciseTypeDictionary = [
    { label: "Cardio", value: "Cardio" },
    { label: "Weight", value: "Weight" },
    { label: "Lap", value: "Lap" },
    { label: "Plyo", value: "Plyo" },
    { label: "Machine", value: "Machine" },
  ];

  // Firebase Context for handling the fetching of the workouts from Firestore DB
  const { addWorkout } = useContext(FirebaseContext);

  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDesc, setExerciseDesc] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [mins, setMins] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [difficulty, setDifficulty] = useState(difficultyDictionary);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [equipment, setEquipment] = useState(equipmentDictionary);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [exerciseType, setExerciseType] = useState(exerciseTypeDictionary);

  const [createdBy, setCreatedBy] = useState("");
  const [dateCreated, setDateCreated] = useState();
  const [gloveSupport, setGloveSupport] = useState(false);
  const [majorMuscle, setMajorMuscle] = useState();
  const [minorMuscle, setMinorMuscle] = useState();
  const [notes, setNotes] = useState();
  const [userId, setUserId] = useState();
  const [visibility, setVisibility] = useState();
  const [variation, setVariation] = useState();

  useEffect(() => {
    clearFields();
    setCreatedBy("Smart Gym");
    setDateCreated(new Date().toLocaleString());
    setGloveSupport(false);
    setMajorMuscle(["N/A"]);
    setMinorMuscle(["N/A"]);
    setNotes("");
    setUserId(["dSxXdEz906Yso1XK9nTK805XQWA3"]);
    setVisibility("public");
  }, []);

  useEffect(() => {
    setVariation([
      {
        difficulty: parseInt(value),
        minutes: parseInt(mins),
        repetition: parseInt(reps),
        sets: parseInt(sets),
      },
    ]);
  }, [value]);

  const clearFields = () => {
    setExerciseName("");
    setExerciseDesc("");
    setReps("");
    setSets("");
    setMins("");
    setOpen(false);
    setValue(null);
    setDifficulty(difficultyDictionary);
    setOpen1(false);
    setValue1(null);
    setEquipment(equipmentDictionary);
    setOpen2(false);
    setValue2(null);
    setExerciseType(exerciseTypeDictionary);
    setCreatedBy("");
    setDateCreated();
    setGloveSupport(false);
    setMajorMuscle();
    setMinorMuscle();
    setNotes();
    setUserId();
    setVisibility();
    setVariation();
  };

  const submitExercise = () => {
    if (exerciseName != "" && exerciseDesc != "" && reps != "" && sets != "" && mins != "") {
      var temp = {
        createdBy: createdBy,
        dateCreated: dateCreated,
        equipment: [value1],
        exerciseType: [value2],
        gloveSupport: gloveSupport,
        howToDescription: exerciseDesc,
        majorMuscle: majorMuscle,
        minorMuscle: minorMuscle,
        name: exerciseName,
        notes: notes,
        userId: userId,
        variation: variation,
        visibility: visibility,
      };
      console.log(temp);
      Alert.alert(exerciseName + " has been added to the workout library!");
      addWorkout(temp);
      navigation.navigate(PATH.EXERCISES);
    } else {
      Alert.alert("Exercise fields are required!");
    }

  };

  return (
    <Screen style={styles.screen}>
      <Header
        title={"Create New Exercise"}
        navigation={navigation}
        PATH={PATH.EXERCISES}
      />
      <View style={styles.scrollview}>
        <ScrollView>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Name of Exercise</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="e.g. Jumping Jacks"
              value={exerciseName}
              onChangeText={(exerciseName) => setExerciseName(exerciseName)}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Description of Exercise</Text>
            <TextInput
              style={styles.inputBox2}
              placeholder="e.g. Jumping Jacks are easy and simple to do. First, start with your hands by your side standing straight, then jump into a star pose and jump back. That's it!"
              multiline={true}
              value={exerciseDesc}
              onChangeText={(exerciseDesc) => setExerciseDesc(exerciseDesc)}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Number of Repetitions</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="e.g. 10"
              value={reps}
              onChangeText={(reps) => setReps(reps)}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Number of Sets</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="e.g. 5"
              value={sets}
              onChangeText={(sets) => setSets(sets)}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Estimated Time (Minutes)</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="e.g. 5"
              value={mins}
              onChangeText={(mins) => setMins(mins)}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>
              Difficulty 1-5 (1 = Easy, 5 = Hard)
            </Text>
            <DropDownPicker
              open={open}
              value={value}
              items={difficulty}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setDifficulty}
              listMode="SCROLLVIEW"
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Select the equipment used</Text>
            <DropDownPicker
              open={open1}
              value={value1}
              items={equipment}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setEquipment}
              listMode="SCROLLVIEW"
              style={styles.dropdown}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}>Select the exercise type</Text>
            <DropDownPicker
              open={open2}
              value={value2}
              items={exerciseType}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={setExerciseType}
              listMode="SCROLLVIEW"
              style={styles.dropdown}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}></Text>
            <TextInput
              placeholder=""
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputTitle}></Text>
            <TextInput
              placeholder=""
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <AddButton
            title="     Cancel     "
            color="greyP"
            onPress={() => navigation.navigate(PATH.EXERCISES)}
          />
          <AddButton title="       Save        " color="blue3P" onPress={submitExercise} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "flex-start",
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
  },
  scrollview: {
    backgroundColor: colors.icewhite,
    flex: 1,
  },
  inputView: {
    top: "5%",
    left: "5%",
    paddingRight: "10%",
  },
  inputTitle: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 12,
    borderColor: colors.black,
    borderWidth: 0,
    borderStyle: "dashed",
    textAlign: "left",
    paddingTop: 10,
    // paddingBottom: 2,
    paddingLeft: 5,
  },
  inputBox: {
    fontSize: 14,
    borderRadius: 12,
    borderColor: colors.greyP,
    borderWidth: 1,
    borderStyle: "solid",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputBox2: {
    fontSize: 14,
    borderRadius: 12,
    borderColor: colors.greyP,
    borderWidth: 1,
    borderStyle: "solid",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    zIndex: 10,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
