import React, { useState } from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { imageBaseUrl } from "../API/TheMovieDB";
import Rating from "./rating";

const Movieinfo = (props) => {
  const [rate, setRate] = useState(0);
  const getGenres = () => {
    try {
      return `${props.Movie.MovieGenre.map(
        (value) =>
          props.Movie.GenresList.genres.filter((val) => val.id === value)[0]
            .name
      )} `;
    } catch {
      return [];
    }
  };
  return (
    <Modal animationType="slide" transparent={true} visible={props.Visible}>
      <View style={styles.modalDarkness}>
        <View style={styles.container}>
          <View style={{ flex: 10 }}>
            <TouchableOpacity
              onPress={() => props.HandleVisible(false)}
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
                <View>
                  <Image
                    style={styles.image}
                    resizeMode="stretch"
                    source={{
                      uri: `${imageBaseUrl + props.Movie.ImagePath}`,
                    }}
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoContainerTitleModal}>
                    {props.Movie.Title}
                  </Text>
                  <Text style={styles.infoContainerRelaeaseDateModal}>
                    {new Date(props.Movie.ReleaseDate).getFullYear()}
                  </Text>
                  <Text style={styles.overview}>{getGenres()}</Text>
                  <Text style={styles.infoContainerAcceptanceModal}>
                    Calificacion: {props.Movie.Acceptance}
                  </Text>
                  <Text></Text>
                  <Text style={styles.title}>
                    Reseña:{" "}
                    <Text style={styles.overview}> {props.Movie.Overview}</Text>
                  </Text>
                  <Text style={styles.title}>
                    Reparto:{" "}
                    <Text style={styles.overview}>
                      {" "}
                      {props.Cast.map(
                        (value) => `${value.name}:  ${value.character}, `
                      )}
                    </Text>
                  </Text>
                  <View style={styles.rateContainer}>
                    <Text style={styles.primaryTextColor}>
                      Calificar pelicula
                    </Text>
                    <Rating InitialRate={0} />
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
  container: {
    backgroundColor: "black",
    width: "100%",
    height: "80%",
    borderRadius: 15,
  },
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
