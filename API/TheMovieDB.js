import { Alert } from "react-native";
import * as SecureStorage from "expo-secure-store"

const BaseUrl = "https://api.themoviedb.org/3/";
const APIKey = "b4d43d32d14924e767355712d31b5898";
const Language = "es";
export const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

export const getAuthToken = async () => {
  try {
    return await fetch(
      `${BaseUrl}/authentication/guest_session/new?api_key=${APIKey}`
    ).then((response) =>
      response.json().then(async(token) => {
        console.log(token.guest_session_id);
        await SaveToken(token.guest_session_id)
      })
    );
  } catch {
    return [];
  }
};

async function SaveToken(token) {
 await SecureStorage.setItemAsync("Session", token)
}
export function GetSession(){
  return SecureStorage.getItemAsync("SessionId").then(token=>token)
}

export async function RateMovie(rate, MovieId, MovieName) {
 GetSession().then(async(token)=>{
  try {
    return await fetch(
      `${BaseUrl}movie/${MovieId}/rating?api_key=${APIKey}&guest_session_id=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ value: rate }),
      }
    ).then((response) =>
      response.json().then((status) => Alert.alert(`Pelicula ${MovieName} calificada: ${rate}`))
    );
  } catch {
    (err)=>console.log(err);
  }})
}

export const FetchCast = async (movieId) => {
  try {
    return await fetch(
      `${BaseUrl}movie/${movieId}/credits?api_key=${APIKey}&language=${Language}/`
    ).then((response) => response.json().then((cast) => organize(cast)));
  } catch {
    return[];
  }
};

const organize = (list) => {
  return list.cast.filter((importance) => importance.order < 9);
};

export async function FetchMoviesData() {
  try {
    return await fetch(
      `${BaseUrl}movie/now_playing?api_key=${APIKey}&language=${Language}&page=1`
    ).then((response) =>
      response
        .json()
        .then((fetchedmovies) => organizeAlphabetically(fetchedmovies))
    );
  } catch {
    return [];
  }
}

function organizeAlphabetically(movies) {
  try {
    return movies.results.sort((current, next) => {
      switch (true) {
        case current.title < next.title:
          return -1;
          break;
        case current.title > next.title:
          return 1;
          break;
        default:
          return 0;
      }
    });
  } catch {
   return [];
  }
}

export const FetchMoviesGenres = async () => {
  try {
    return await fetch(
      `${BaseUrl}genre/movie/list?api_key=${APIKey}&language=${Language}`
    ).then((response) => response.json().then((genres) => genres));
  } catch {
    return [];
  }
};
