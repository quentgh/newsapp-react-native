import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { color } from "../../styles/color";

export default function Btn({ action, children, label }) {
  return (
    <TouchableOpacity style={styles.connexionButton} onPress={action}>
      <View>{children}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  connexionButton: {
    alignItems: "center",
    backgroundColor: color.primaryColor,
    margin: 20,
    padding: 10,
    color: color.lightColor,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    color: color.lightColor,
    textAlign: "center",
    fontSize: 15,
    marginHorizontal: 10,
  },
});
