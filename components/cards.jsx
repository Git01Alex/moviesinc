import React, { lazy, Suspense } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { imageBaseUrl } from "../API/TheMovieDB";
const Movieinfo = lazy(() => import("./movieinfo"));

const Cards = (props) => {
  const [moreInfo, showMoreInfo] = useState(false);
  
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
          uri: `${imageBaseUrl + props.Movie.backdrop_path}`,
        }}
        style={styles.background}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.infoContainerTitle}>{props.Movie.title}</Text>
          <Text style={styles.infoContainerRelaeaseDate}>
            {props.Movie.release_date}
          </Text>
          <Text style={styles.infoContainerAcceptance}>
            Votos: {props.Movie.vote_average}
          </Text>
        </View>
      </ImageBackground>
      {moreInfo ? (
        <Suspense>
          <Movieinfo
            Movie={props.Movie.id}
            Visible={moreInfo}
            HandleVisible={showMoreInfo}
            SetFavorites={props.favoritesRef}
            Favorite={props.isFavorite}
          />
        </Suspense>
      ) : null}
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
    height: "90%",
  },
  image: { width: "100%", height: "100%", flex: 1, borderRadius: 10 },
  infoContainer: {
    flex: 0.25,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  infoContainerTitle: { fontSize: 13, color: "white", fontWeight: "bold" },
  infoContainerRelaeaseDate: { fontSize: 12, color: "white" },
  infoContainerAcceptance: { fontSize: 12, color: "yellow" },
});

export default Cards;
