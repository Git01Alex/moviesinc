import { Alert, Platform } from "react-native";
import {  GetSavedKey, SaveToStore } from "./Auth";
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

export async function Sessionrequest() {
  GetSavedKey("TemporalAccessToken").then(async (token) => {
    try {
      return await fetch(
        `${BaseUrl}authentication/session/new?api_key=${APIKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ request_token: token }),
        }
      ).then((response) =>
        response.json().then(async (sessionId) => {
          SaveToStore("MySessionId", sessionId.session_id);
          return true;
        })
      );
    } catch {
      (err) => console.log(err);
    }
  });
}

export async function RateMovie(rate, MovieId, MovieName) {
  GetSavedKey("MySessionId").then(async (session) => {
    try {
      return await fetch(
        `${BaseUrl}movie/${MovieId}/rating?api_key=${APIKey}&session_id=${session.id}`,
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

export async function setFavoriteMovie(movie, favorite) {
  GetSavedKey("MySessionId").then(async (sessionID) => {
    try {
      return await fetch(
        `${BaseUrl}account?api_key=${APIKey}&session_id=${sessionID}`
      ).then((accountDetails) =>
        accountDetails.json().then(async (account) => {
          return await fetch(
            `${BaseUrl}account/${account.id}/favorite?api_key=${APIKey}&session_id=${sessionID}&language=${Language}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                media_type: "movie",
                media_id: movie.id,
                favorite: favorite,
              }),
            }
          ).then((response) =>
            response.json().then((action) =>
            Platform.OS !== "web"
              ? Alert.alert("Hecho",`Pelicula ${movie.title} ${(action.status_code===1|action.status_code===12)? "añadida a":"removida de"} favoritos`)
              : alert(`Pelicula ${MovieName} calificada: ${rate}`))
          );
        })
      );
    } catch {
       console.log("error marking movie as favorite");
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
