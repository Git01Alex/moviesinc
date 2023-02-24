import * as SecureStorage from "expo-secure-store";
import { Platform } from "react-native";
import { CreateFavoriteList, BaseUrl, APIKey } from "./TheMovieDB";

export const setCredentials = async () => {
  try {
     await fetch(
      `${BaseUrl}/authentication/guest_session/new?api_key=${APIKey}`
    ).then((response) =>
      response.json().then(token => {
        SaveToStore("SessionId", token.guest_session_id)
        CreateFavoriteList()
        return token.guest_session_id}))
  } catch {
    console.log("Error setting credentials");
  }
};

export const SaveToStore = async (key, token) =>
  Platform.OS !== "web"
    ? await SecureStorage.setItemAsync(key, token)
    : localStorage.setItem(key, token);

export async function GetSavedKey(key) {
  return (await Platform.OS) !== "web"
    ? await SecureStorage.getItemAsync(key).then((token) => token)
    : localStorage.getItem(key);
}
export async function CheckCredentials(key) {
  try {
    return await GetSavedKey(key).then((token) => {
      return (token === undefined) | (token === null)
        ? setCredentials()
        : token;
    });
  } catch {
    (err) => console.log(err);
  }
}
