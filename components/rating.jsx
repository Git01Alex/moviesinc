import StarRating from "react-native-star-rating-widget";
import { useState } from "react";

const Rating = (props) => {
  const [rate, setRate] = useState(props.InitialRate);
  return <StarRating rating={rate} onChange={(value) => setRate(value)} />;
};

export default Rating;
