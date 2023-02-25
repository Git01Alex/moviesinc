import * as SecureStorage from "expo-secure-store";
import { Platform } from "react-native";
import { BaseUrl, APIKey } from "./TheMovieDB";

export const getCredentials = async () => {
  try {
   return await fetch(`${BaseUrl}/authentication/token/new?api_key=${APIKey}`).then(
      (response) =>
        response.json().then(async (token) => { console.log(token.request_token);
        return  await SaveToStore("TemporalAccessToken", token.request_token).then(()=>false)
        })
    );
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
export async function CheckCredentials() {
  try {
    return await GetSavedKey("MySessionId").then((token) => { 
      return (token === undefined) | (token === null) ? getCredentials().then(isUserRegister=>isUserRegister) : true;
    });
  } catch {
    (err) => console.log(err);
  }
}
