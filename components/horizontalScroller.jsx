import { View, ScrollView } from "react-native";

const HorizontalScroller = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "stretch" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View
          style={{
            overflow: "hidden",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-evenly",
            height: 300,
            alignItems: "center",
            backgroundColor: "rgba(195,195,195, 0.2)",
          }}
        >
          {props.content}
        </View>
      </ScrollView>
    </View>
  );
};

export default HorizontalScroller;
