import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import Cards from "./cards";
import { FetchMoviesData, FetchFavoriteMoviesData } from "../API/TheMovieDB";
import Header from "./header";
import HorizontalScroller from "./horizontalScroller";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setfavorites] = useState([]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      FetchMoviesData().then((movies) => setMovies(movies));
      FetchFavoriteMoviesData().then((favoriteMovies) => {
        setfavorites(favoriteMovies);
      });
    }
    return () => (ignore = true);
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
          <Header />
          <View style={styles.content}>
            <View style={{ Flex: 1 }}>
              <Text style={styles.subTitles}>En cartelera</Text>
            </View>
            <HorizontalScroller
              content={
                movies !== undefined ? (
                  movies.map((movie) =>
                    movie.backdrop_path !== null ? (
                      <Cards
                        favoritesRef={setfavorites}
                        isFavorite={false}
                        key={movie.id}
                        Movie={movie}
                      />
                    ) : null
                  )
                ) : (
                  <Text style={styles.subTitles}>Cargando</Text>
                )
              }
            />

            <View style={{ Flex: 1 }}>
              <Text style={styles.subTitles}>favoritos</Text>
            </View>
            <HorizontalScroller
              content={
                favorites !== undefined ? (
                  favorites.map((movie) =>
                    movie.backdrop_path !== null ? (
                      <Cards
                        favoritesRef={setfavorites}
                        isFavorite={true}
                        key={movie.id}
                        Movie={movie}
                      />
                    ) : null
                  )
                ) : (
                  <Text style={styles.subTitles}>Cargando</Text>
                )
              }
            />
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
  header: {
    flex: 1,
    width: "100%",
    tintColor: "rgba(0,0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  subTitles: {
    fontSize: 20,
    paddingTop: 0,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
