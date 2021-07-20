import React from "react";
import { FirebaseProvider } from "../api/FirebaseProvider";
import Routes from "./routes";

const Providers = () => {
  return (
    <FirebaseProvider>
      <Routes />
    </FirebaseProvider>
  );
};

export default Providers;
