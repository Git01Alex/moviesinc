import { Alert, Platform } from "react-native";
import { CheckCredentials, GetSavedKey, SaveToStore } from "./Auth";

export const BaseUrl = "https://api.themoviedb.org/3/";
export const APIKey = "b4d43d32d14924e767355712d31b5898";
export const Language = "es-Es";
export const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

export const FetchMoviesGenres = async () => {
  try {
    return await fetch(
      `${BaseUrl}genre/movie/list?api_key=${APIKey}&language=${Language}`
    ).then((response) => response.json().then((genres) => genres));
  } catch {
    return [];
  }
};

export async function RateMovie(rate, MovieId, MovieName) {
  CheckCredentials("SessionId").then(async (token) => {
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
        response
          .json()
          .then(() =>
            Platform.OS !== "web"
              ? Alert.alert(`Pelicula ${MovieName} calificada: ${rate}`)
              : alert(`Pelicula ${MovieName} calificada: ${rate}`)
          )
      );
    } catch {
      (err) => console.log(err);
    }
  });
}

export async function CreateFavoriteList() {
  GetSavedKey("SessionId").then(async (token) => {console.log(token);
    try {
      return await fetch(
        `${BaseUrl}list?api_key=${APIKey}&guest_session_id=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            name: "favorites",
            description:
              "This is the list where you store your favorite movies",
            language: Language,
          }),
        }
      ).then((response) =>
        response.json().then((list) => {console.log(list);SaveToStore("favoriteList",list.list_id)})
      );
    } catch {
      (err) => console.log(err);
    }
  });
}

export const getGenres = (Movie) => {
  try {
    return `${Movie.genres.map((genre) => `${genre.name}`)} `;
  } catch {
    return [];
  }
};
export const FetchCast = async (movieId) => {
  try {
    return await fetch(
      `${BaseUrl}movie/${movieId}/credits?api_key=${APIKey}&language=${Language}/`
    ).then((response) => response.json().then((cast) => organizeCast(cast, 9)));
  } catch {
    return [];
  }
};

const organizeCast = (list, people) => {
  return list.cast.filter((importance) => importance.order < people);
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

export async function FetchMovie(movieId) {
  try {
    return await fetch(
      `${BaseUrl}movie/${movieId}?api_key=${APIKey}&language=${Language}`
    ).then((response) =>
      response.json().then((fetchedmovies) => fetchedmovies)
    );
  } catch {
    return [];
  }
}

export async function GetSimilarMovies(movieId) {
  try {
    return await fetch(
      `${BaseUrl}movie/${movieId}/similar?api_key=${APIKey}&language=${Language}&page=1`
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
