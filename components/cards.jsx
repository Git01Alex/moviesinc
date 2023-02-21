import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FetchCast, imageBaseUrl } from "../BackEnd/TheMovieDB";

const Cards = (props) => {
  const [moreInfo, showMoreInfo] = useState(false);
  const [cast, setCast] = useState([]);

  useEffect(() => { 
    FetchCast(props.MovieId).then(result=> setCast(result))
  }, []);

  return (
    <TouchableOpacity style={{borderRadius:10}} onPress={() => showMoreInfo(true)}>
      <ImageBackground
      resizeMode="stretch"
        source={{
          uri: `${imageBaseUrl + props.ImagePath}`,
        }}
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          <Image resizeMode="stretch" style={styles.image} />
        </View>
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
      <Modal animationType="slide" transparent={true} visible={moreInfo}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              width: "100%",
              height: "80%",
              borderRadius: 15,
            }}
          >
            <View style={{ flex: 10 }}>
              <TouchableOpacity
                onPress={() => showMoreInfo(false)}
                style={{
                  borderRadius: 40,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  alignSelf: "flex-end",
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  zIndex: 2,
                }}
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
                      style={{ width: "100%", height: 400 }}
                      resizeMode="stretch"
                      source={{
                        uri: `${imageBaseUrl + props.ImagePath}`,
                      }}
                    />
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.infoContainerTitleModal}>
                      {props.Title}
                    </Text>
                    <Text style={styles.infoContainerRelaeaseDateModal}>
                      {new Date(props.ReleaseDate).getFullYear()}
                    </Text>
                    <Text
                      style={styles.infoContainerOverview}
                    >{`${props.MovieGenre.map(
                      (value) =>
                        props.GenresList.genres.filter(
                          (val) => val.id === value
                        )[0].name
                    )} `}</Text>
                    <Text style={styles.infoContainerAcceptanceModal}>
                      Calificacion: {props.Acceptance}
                    </Text>
                    <Text></Text>
                    <Text style={styles.infoContainerOverviewTitle}>
                      Reseña:{" "}
                      <Text style={styles.infoContainerOverview}>
                        {" "}
                        {props.Overview}
                      </Text>
                    </Text>
                    <Text style={styles.infoContainerOverviewTitle}>
                      Reparto:{" "}
                      <Text style={styles.infoContainerOverview}>
                        {" "}
                        {cast.map(
                          (value) => `${value.name}:  ${value.character}, `
                        )}
                      </Text>
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: 220,
    flex: 1,
    borderRadius: 10,
    backgroundColor: "black",
  },
  imageContainer: { flex: 2, borderRadius: 10 },
  image: { width: "100%", height: "100%", flex: 1, borderRadius: 10 },
  infoContainer: {
    flex: 0.6,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  infoContainerTitle: { fontSize: 13, color: "white", fontWeight: "bold" },
  infoContainerRelaeaseDate: { fontSize: 12, color: "white" },
  infoContainerAcceptance: { fontSize: 12, color: "yellow" },
  infoContainerTitleModal: { fontSize: 30, color: "white", fontWeight: "bold" },
  infoContainerRelaeaseDateModal: { fontSize: 19, color: "white" },
  infoContainerAcceptanceModal: { fontSize: 15, color: "yellow" },
  infoContainerOverview: { fontSize: 15, color: "white", color: "gray" },
  infoContainerOverviewTitle: { fontSize: 15, color: "white" },
});

export default Cards;
