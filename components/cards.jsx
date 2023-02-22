import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FetchCast, imageBaseUrl } from "../API/TheMovieDB";
import Movieinfo from "./movieinfo";

const Cards = (props) => {
  const [moreInfo, showMoreInfo] = useState(false);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      FetchCast(props.MovieId).then((result) => setCast(result));
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        showMoreInfo(true);
      }}
    >
      <ImageBackground
        resizeMode="stretch"
        source={{
          uri: `${imageBaseUrl + props.ImagePath}`,
        }}
        style={styles.background}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.infoContainerTitle}>{props.Title}</Text>
          <Text style={styles.infoContainerRelaeaseDate}>
            {props.ReleaseDate}
          </Text>
          <Text style={styles.infoContainerAcceptance}>
            Votos: {props.Votes}
          </Text>
        </View>
      </ImageBackground>
      {showMoreInfo && (
        <Movieinfo
          Movie={props}
          Cast={cast}
          Visible={moreInfo}
          HandleVisible={showMoreInfo}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, flexDirection: "column-reverse" },
  container: {
    margin: 20,
    width: 220,
    flex: 1,
    borderRadius: 20,
    backgroundColor: "black",
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%", flex: 1, borderRadius: 10 },
  infoContainer: {
    flex: 0.22,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  infoContainerTitle: { fontSize: 13, color: "white", fontWeight: "bold" },
  infoContainerRelaeaseDate: { fontSize: 12, color: "white" },
  infoContainerAcceptance: { fontSize: 12, color: "yellow" },
});

export default Cards;
