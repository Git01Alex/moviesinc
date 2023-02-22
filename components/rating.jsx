import StarRating from "react-native-star-rating-widget";
import { useState } from "react";
import { RateMovie } from "../API/TheMovieDB";

const Rating = (props) => {
  const [rate, setRate] = useState(props.InitialRate);
  return <StarRating rating={rate} onChange={(value) => setRate(value)} onRatingEnd={async()=>await RateMovie((rate*2),props.MovieId, props.MovieName)} />;
};

export default Rating;
