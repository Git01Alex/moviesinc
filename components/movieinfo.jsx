import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import {
  imageBaseUrl,
  getGenres,
  FetchCast,
  GetSimilarMovies,
  FetchMovie,
  setFavoriteMovie,
} from "../API/TheMovieDB";
import Rating from "./rating";
import Cards from "./cards";
const HorizontalScroller = lazy(() => import("./horizontalScroller"));

const Movieinfo = (props) => {
  const [screenSize, setScreenSize] = useState(Dimensions.get("screen").width);
  const [movie, setMovie] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const screenChange = Dimensions.addEventListener("change", () => {
      setScreenSize(Dimensions.get("screen").width);
    });
    let ignore = false;
    if (!ignore) {
      FetchCast(props.Movie.id).then((result) => setCast(result));
      FetchMovie(props.Movie.id).then((result) => setMovie(result));
      GetSimilarMovies(props.Movie.id).then((value) => setSimilarMovies(value));
      setFavorite(props.Favorite)
    }
    return () => {
      screenChange?.remove();
      ignore = true;
    };
  }, []);
  return (
    <Modal animationType="slide" transparent={true} visible={props.Visible}>
      <View style={styles.modalDarkness}>
        <View
          style={{
            backgroundColor: "black",
            width: screenSize < 700 ? "100%" : "60%",
            height: "80%",
            borderRadius: 15,
          }}
        >
          <View style={{ flex: 10 }}>
            <TouchableOpacity
              onPress={() => {
                props.HandleVisible(false);
              }}
              style={styles.closeButton}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 30, color: "white" }}>{"x"}</Text>
              </View>
            </TouchableOpacity>

            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View>
                {movie.backdrop_path !== undefined ? (
                  <View>
                    <Image
                      style={styles.image}
                      resizeMode="stretch"
                      source={{
                        uri: `${imageBaseUrl + movie.backdrop_path}`,
                      }}
                    />
                  </View>
                ) : null}
                <View style={styles.infoContainer}>
                  <Text style={styles.infoContainerTitleModal}>
                    {movie.title}{" "}
                  </Text>
                  <TouchableOpacity
                      onPress={async() => {
                        setFavorite(!favorite);
                        await setFavoriteMovie(movie, !favorite).then(favorites=>props.SetFavorites(favorites))
                      }}
                      style={{
                        borderRadius: 40,
                        backgroundColor: favorite ? "red":"black",
                        width: 50,
                        height: 50,
                        margin:10,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        zIndex: 2,
                        alignSelf:"flex-end"
                      }}
                    >
                      <Image 
                      source={{uri:"https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/hearts-icon-18-256.png"}}
                      resizeMode="stretch"
                      style={{width:30, height:30}}
                      />
                    </TouchableOpacity>
                  <Text style={styles.infoContainerRelaeaseDateModal}>
                    {movie.release_date!== undefined ? new Date(movie.release_date).getFullYear():null}
                  </Text>
                  <Text style={styles.overview}>{getGenres(movie)}</Text>
                  <Text style={styles.infoContainerAcceptanceModal}>
                    Calificacion: {movie.popularity}
                  </Text>
                  <Text></Text>
                  <Text style={styles.title}>
                    Reseña:{" "}
                    <Text style={styles.overview}> {movie.overview}</Text>
                  </Text>
                  <Text style={styles.title}>
                    Reparto:{" "}
                    <Text style={styles.overview}>
                      {" "}
                      {cast.map(
                        (value) => `${value.name}:  ${value.character}, `
                      )}
                    </Text>
                  </Text>
                  <View style={styles.rateContainer}>
                    <Text style={styles.primaryTextColor}>
                      Calificar pelicula
                    </Text>
                    <Rating
                      InitialRate={0}
                      MovieId={movie.id}
                      MovieName={movie.title}
                    />
                  </View>
                  <View style={{ color: "white", height: "100%" }}>
                    <Text style={styles.title}>Peliculas similares</Text>
                    <Suspense>
                      <HorizontalScroller
                        content={similarMovies.map((movie) =>
                          movie.backdrop_path !== null ? (
                            <Cards  favoritesRef={ props.SetFavorites} isFavorite={false}  key={movie.id} Movie={movie} />
                          ) : null
                        )}
                      />
                    </Suspense>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalDarkness: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    borderRadius: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignSelf: "flex-end",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
  },
  favoriteButton: {
    borderRadius: 40,
    backgroundColor: "red",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 2,
    alignSelf:"flex-end"
  },
  infoContainer: {
    flex: 0.6,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  infoContainerTitleModal: { fontSize: 30, color: "white", fontWeight: "bold" },
  infoContainerRelaeaseDateModal: { fontSize: 19, color: "white" },
  infoContainerAcceptanceModal: { fontSize: 15, color: "yellow" },
  image: { width: "100%", height: 400 },
  overview: { fontSize: 15, color: "white", color: "gray" },
  title: { fontSize: 15, color: "white" },
  primaryTextColor: { color: "white" },
  rateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "4%",
  },
});

export default Movieinfo;
