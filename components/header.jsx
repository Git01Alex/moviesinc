import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="stretch"
        style={styles.logo}
        source={{
          uri: "https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=video-camera",
        }}
      />
      <Text style={styles.headerTitle}>Movies Inc</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems:"center", justifyContent:"center" },
  logo: {
    width: 50,
    height: 50,
    border: "2px solid white",
    padding: 10,
    borderRadius: 30,
  },
  headerTitle: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});

export default Header;
