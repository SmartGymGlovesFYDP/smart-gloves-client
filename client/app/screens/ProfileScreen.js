import React, { useState, useEffect, useRef  } from 'react';
import { Button, View, Image, Text, Platform, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView   } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import { IconButton, Colors } from 'react-native-paper';
import * as firebase from "firebase";
import ProfileButton from "../components/ProfileButton";
import { FirebaseContext } from "../api/FirebaseProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

function HomeScreen({ navigation }) {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  state = {
    names: [
       {'name': 'Ben', 'id': 1},
       {'name': 'Susan', 'id': 2},
       {'name': 'Robert', 'id': 3},
       {'name': 'Mary', 'id': 4},
       {'name': 'Daniel', 'id': 5},
       {'name': 'Laura', 'id': 6},
       {'name': 'John', 'id': 7},
       {'name': 'Debra', 'id': 8},
       {'name': 'Aron', 'id': 9},
       {'name': 'Ann', 'id': 10},
       {'name': 'Steve', 'id': 11},
       {'name': 'Olivia', 'id': 12}
    ]
 }
  
  useEffect(() => {
    async function getUserInfo() {
      try {
        let doc = await firebase
          .firestore()
          .collection("users")
          .doc(currentUserUID)
          .get();

        if (!doc.exists) {
          Alert.alert("No user data found!");
        } else {
          let dataObj = doc.data();
          setFirstName(dataObj.firstName);
          setLastName(dataObj.lastName);
        }
      } catch (err) {
        Alert.alert("There is an error.", err.message);
      }
    }
    getUserInfo();
    async function getUserInfo() {
      try {
        let doc = await firebase
          .firestore()
          .collection("users")
          .doc(currentUserUID)
          .get();

        if (!doc.exists) {
          Alert.alert("No user data found!");
        } else {
          let dataObj = doc.data();
          setFirstName(dataObj.firstName);
          setLastName(dataObj.lastName);
          setEmail(dataObj.email);
        }
      } catch (err) {
        Alert.alert("There is an error.", err.message);
      }
    }
    getUserInfo();
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  

  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <IconButton
    icon="pencil"
    color={Colors.grey900}
    size={20}
    style={styles.absolute}
    onPress={pickImage}
      />
      <View style={{position: 'absolute', top: 10, left: 100, right: 0, bottom: 0}}>
        {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 150 / 2 }} />}
      </View>

      <View style={{position: 'absolute', top: 175, left: 130, right: 0, bottom: 0, fontWeight: 'bold'}}>
        <Text style={styles.absoluteName}>
          {firstName} {lastName}
        </Text>
      </View>

     
      <View style={{position: 'absolute', top: 215, left: 30, right: 0, bottom: 0}}>
      <Text style={styles.text}>
          My Records 
        </Text>

      <ProfileButton
        title="PersonalRecords"
        width="auto"
        fontWeight="normal"
        onPress={() => navigation.navigate('PersonalRecords')}
      />

      <ProfileButton
        title="Achievements"
        width="auto"
        fontWeight="normal"
        onPress={() => navigation.navigate('Achievements')}
      />

      <ProfileButton
        title="Goals"
        width="auto"
        fontWeight="normal"
        onPress={() => navigation.navigate('Goals')}
      />

        <Text style={styles.text}>
          My Settings
        </Text>
      

      {/* <View style={{position: 'absolute', top: 340, left: 30, right: 0, bottom: 0}}> */}
      <ProfileButton
        title="Notification settings"
        width="auto"
        fontWeight="normal"
        onPress={() => navigation.navigate('Details')}
      />
      <ProfileButton
        title="Edit Profile"
        width="auto"
        fontWeight="normal"
        onPress={() => navigation.navigate('EditProfile')}
      />
      <ProfileButton
        title="Manage Gloves"
        width="auto"
        fontWeight="normal"
        onPress={() => navigation.navigate('ManageGloves')}
      />
{/* 
      
      </View> */}
      </View>
    </View>



  );
}

function Achievements({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      
    </View>
  );
}

function Goals({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      
    </View>
  );
}

function EditProfile({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      
    </View>
  );
}

function ManageGloves({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      
    </View>
  );
}


function PersonalRecordsScreen({ navigation }) {
  

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      
    </View>
  );
}

function DetailsScreen({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

const Stack = createStackNavigator();


const styles = StyleSheet.create({
  
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
 },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  absolute: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 115,
    left: 190,
    zIndex: 5,
  },
  absoluteMyProfile: {
    color: '#000',
    fontSize: 25,
    width: 100,
    height: 100,
    position: 'absolute',
    top: 40,
    left: 40,
    zIndex: 5,
    fontWeight: 'bold',
  },
  absoluteName: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

function App() {
  return (
      <Stack.Navigator initialRouteName="My Profile">
        <Stack.Screen name="My Profile" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="PersonalRecords" component={PersonalRecordsScreen} />
        <Stack.Screen name="Achievements" component={Achievements} />
        <Stack.Screen name="Goals" component={Goals} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ManageGloves" component={ManageGloves} />
      </Stack.Navigator>
  );
}

export default App;