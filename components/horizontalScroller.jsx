import { View, ScrollView, StyleSheet } from "react-native";

const HorizontalScroller = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View style={styles.content}>{props.content}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "stretch" },
  content: {
    overflow: "hidden",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 300,
    alignItems: "center",
    backgroundColor: "rgba(195,195,195, 0.2)",
  },
});
export default HorizontalScroller;
