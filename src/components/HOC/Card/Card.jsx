import { StyleSheet, View, Text } from "react-native";
import { color } from "../../../styles/color";

export default function Card(props) {
  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.title}>{props.title}</Text>
      <Text style={cardStyle.content}>{props.content}</Text>
      <View style={cardStyle.children}>{props.children}</View>
    </View>
  );
}

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: color.primaryColor,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },

  title: {
    color: color.lightColor,
    fontSize: 35,
    textAlign: "center",
  },
  content: {
    color: color.lightColor,
    fontSize: 20,
    textAlign: "center",
    padding: 5,
  },
  children: {
    padding: 10,
    backgroundColor: color.lightColor,
  },
});
