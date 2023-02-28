import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from "react-native";
import Header from "./header";
import { Sessionrequest } from "../API/TheMovieDB";
import { GetSavedKey } from "../API/Auth";

const Login = (props) => {

  const handleLogin = () => {
    Platform.OS !== "web" ? (
      <WebView
        onNavigationStateChange={(navigationDetails) => {
          navigationDetails.url.includes("/allow")
            ? Sessionrequest()
              ? props.setUserRegistered(true)
              : console.log("error on registration page")
            : null;
        }}
        source={{
          uri: `https://www.themoviedb.org/authenticate/${props.TemporalToken}`,
        }}
        style={styles.phonesWebView}
      />
    ) : (
      handlePopUpWindow()
    );
  };

  const handlePopUpWindow = () => {
    window.open(
      `https://www.themoviedb.org/authenticate/${props.TemporalToken}`
    );
    document.onvisibilitychange = function () {
      document.visibilityState === "visible"
        ? Sessionrequest(props.TemporalToken).then(() =>
            GetSavedKey("MySessionId").then((session) =>{
              session !== "undefined"
                ? props.setUserRegistered(true)
                : alert(
                    "Al parecer hubo un error al registrar sus credenciales, intente de nuevo."
                  )
                })
          )
        : null;
    };
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        blurRadius={6}
        source={{
          uri: "https://image.cnbcfm.com/api/v1/image/104768589-movies-anywhere.JPG",
        }}
        style={styles.header}
      >
        <View style={styles.content}>
          <Header />
          <Text style={styles.fonts}>by</Text>
          <Image
            style={styles.TheMovieDBLogo}
            resizeMode="stretch"
            source={{
              uri: "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg",
            }}
          ></Image>
          <TouchableOpacity
            onPress={() => {
              handleLogin();
            }}
          >
            <View style={styles.signInButton}>
              <Text style={styles.signInFont}>Iniciar sesion</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#00073A",
  },
  content: {
    backgroundColor: "black",
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  fonts: { color: "white", fontSize: 30 },
  header: {
    flex: 1,
    width: "100%",
    tintColor: "rgba(0,0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  phonesWebView: { height: "80%", width: "100%", marginTop: 45 },
  signInButton: {
    borderRadius: 20,
    backgroundColor: "#0d253f",
    justifyContent: "center",
    alignItems: "center",
  },
  signInFont: { padding: 20, color: "white", fontSize: 20 },
  TheMovieDBLogo: { width: "70%", height: "30%" },
});

export default Login;
