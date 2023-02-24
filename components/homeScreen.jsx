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
import { FetchMoviesData, FetchMoviesGenres} from "../API/TheMovieDB";
import Header from "./header";
import HorizontalScroller from "./horizontalScroller";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    let ignore= false;
    if(!ignore){
    FetchMoviesGenres().then((genres) => setGenres(genres));
    FetchMoviesData().then((movies) => setMovies(movies));}
    return()=>ignore=true;
    
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
          <Header/>
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
             <HorizontalScroller 
             content={movies.map((movie)=> movie.backdrop_path !==null? <Cards key={movie.id} Movie={movie}/>:null)}
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
});

export default HomeScreen;
