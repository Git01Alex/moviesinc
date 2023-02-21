const BaseUrl="https://api.themoviedb.org/3/";
const APIKey="b4d43d32d14924e767355712d31b5898";
const Language="es";
export const imageBaseUrl="https://image.tmdb.org/t/p/original/";

export const FetchCast = async (movieId) => {
  return await fetch(
    `${BaseUrl}movie/${movieId}/credits?api_key=${APIKey}&language=${Language}`
  ).then((response) => response.json().then((cast) => organize(cast)));
};

const organize = (list) => {
  return list.cast.filter((importance) => importance.order < 9);
};

export const RateMovie = async (rate, sessionId) => {
  await fetch(
    `${BaseUrl}movie/${props.MovieId}/rating?api_key=${APIKey}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ value: rate }),
    }
  );
};

export async function FetchMoviesData() {
  return await fetch(
    `${BaseUrl}movie/now_playing?api_key=${APIKey}&language=${Language}&page=1`
  ).then((response) =>
    response
      .json()
      .then((fetchedmovies) => organizeAlphabetically(fetchedmovies))
  );
}
function organizeAlphabetically(movies) {
  return movies.results.sort((current, next)=> {
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
}

export const FetchMoviesGenres = async () => {
  return await fetch(
    `${BaseUrl}genre/movie/list?api_key=${APIKey}`
  ).then((response) => response.json().then((genres) => genres));
};
