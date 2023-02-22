import * as SecureStorage from "expo-secure-store";
import { Platform } from "react-native";

export const getAuthToken = async () => {
    try {
      return await fetch(
        `${BaseUrl}/authentication/guest_session/new?api_key=${APIKey}`
      ).then((response) =>
        response.json().then(async (token) => {
          await SaveToken(token.guest_session_id);
        })
      );
    } catch {
      return [];
    }
  };
  
  async function SaveToken(token) {
    Platform.OS!== "web" ? await SecureStorage.setItemAsync("Session", token): localStorage.setItem("SessionId", token)
  }
  export async function GetSession() {
    return Platform.OS !== "web" ? await SecureStorage.getItemAsync("SessionId").then((token) => token): localStorage.getItem("SessionId")
  }
  export function CheckCredentials(){
    try {
      GetSession().then((token) =>
        (token === undefined|token === null) ? getAuthToken() : {}
      );
    } catch {
      (err) => console.log(err);
    }
  }