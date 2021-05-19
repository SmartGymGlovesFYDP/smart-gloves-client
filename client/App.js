import React from "react";

import * as firebase from "firebase";
import apiKeys from "./app/config/keys";
import Providers from "./app/navigation/Providers";

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return <Providers />;
}
