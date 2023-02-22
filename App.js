import { useEffect } from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./components/homeScreen";
import { CheckCredentials} from "./API/Auth";

export default function App() {
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      CheckCredentials();
    }
    return () => (ignore = true);
  }, []);
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {},
});
