import React from "react";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { FetchMoviesGenres, FetchMoviesData } from "../BackEnd/TheMovieDB";
import Cards from "./cards";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    FetchMoviesGenres().then((genres) => setGenres(genres));
    FetchMoviesData().then((movies) => setMovies(movies));
  }, []);

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
        <View style={styles.backGroundTint}>
          <Image
            resizeMode="stretch"
            style={styles.logo}
            source={{
              uri: "https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=video-camera",
            }}
          />
          <Text style={styles.headerTitle}>Movies Inc</Text>

          <View style={styles.content}>
            <View style={{ Flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: 0,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                En cartelera
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "rgba(195,195,195, 0.2)",
                padding: 0,
                height: "50%",
              }}
            >
             
              <View style={{ flex: 1, alignItems: "stretch" }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                >
                  <View
                    style={{
                      overflow: "hidden",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {movies.map((value) => (
                      <Cards
                        GenresList={genres}
                        key={value.name}
                        MovieGenre={value.genre_ids}
                        MovieId={value.id}
                        Title={value.title}
                        ImagePath={value.backdrop_path}
                        ReleaseDate={value.release_date}
                        Acceptance={value.vote_average}
                        Overview={value.overview}
                        Votes={value.vote_average}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backGroundTint: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7))",
  },
  cards: { flex: 1, width: "100%", height: "100%", flexDirection: "column" },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#00073A",
  },
  content: {
    flex: 9,
    marginTop: "5%",
    overflow: "hidden",
  },
  logo: {
    width: 50,
    height: 50,
    border: "2px solid white",
    padding: 10,
    borderRadius: 30,
  },
  header: {
    flex: 1,
    width: "100%",
    tintColor: "rgba(0,0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
