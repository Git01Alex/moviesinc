import { useEffect, useState } from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import HomeScreen from "./components/homeScreen";
import { CheckCredentials, GetSavedKey } from "./API/Auth";
import { WebView } from "react-native-webview";
import Header from "./components/header";
import { Sessionrequest } from "./API/TheMovieDB";
import Login from "./components/login";

export default function App() {
  const [registered, setregistered] = useState(false);
  const [temporalToken, settemporalToken] = useState("");

  useEffect(() => {
    CheckCredentials().then(async (userRegistered) => {
      userRegistered
        ? setregistered(userRegistered)
        : await GetSavedKey("TemporalAccessToken")
            .then((token) => settemporalToken(token))
            .finally(() => false);
    });
  }, []);

  return registered && registered ? <HomeScreen /> : <Login TemporalToken={temporalToken} setUserRegistered={setregistered}/>;
}

const styles = StyleSheet.create({});
