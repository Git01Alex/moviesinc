import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./components/homeScreen";
import { CheckCredentials, GetSavedKey } from "./API/Auth";
import { WebView } from "react-native-webview";

import { Sessionrequest } from "./API/TheMovieDB";

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

  return registered && registered ? (
    <HomeScreen />
  ) : (
    <WebView
      onNavigationStateChange={(navigationDetails) => {
        navigationDetails.url.includes("/allow")
          ? Sessionrequest()
            ? setregistered(true)
            : console.log("error on registration page")
          : null;
      }}
      source={{
        uri: `https://www.themoviedb.org/authenticate/${temporalToken}`,
      }}
      style={{ height: "80%", width: "100%", marginTop: 45 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});
