import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./components/homeScreen";
import { CheckCredentials, GetSavedKey } from "./API/Auth";

export default function App() {

  useEffect(() => {
    CheckCredentials("SessionId");
  }, []);
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {},
});
