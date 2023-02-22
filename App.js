import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/homeScreen';
import { getAuthToken } from './API/TheMovieDB';
import * as SecureStorage from "expo-secure-store";

export default function App() {
useEffect(() => {
  let ignore=false;
  if(!ignore){
    try{
      const sessionId=async()=>await SecureStorage.getItemAsync("SessionId")
    sessionId().then(token=>{
      if(token=== undefined){
      getAuthToken()}
    })
    }catch{console.log("BOBO");}
  }
  return () => 
    ignore=true;
  
}, []);
  return (
     <HomeScreen/>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
