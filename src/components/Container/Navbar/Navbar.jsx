import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../../contexts/UserContext";
import { color } from "../../../styles/color";

export default function Navbar({ navigation, options }) {
  const { setUtilisateur } = useContext(UserContext);

  function openMenu() {
    navigation.toggleDrawer();
  }

  function logOUt() {
    setUtilisateur(null);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openMenu}>
        <AntDesign name="menu-fold" size={32} color={color.lightColor} />
      </TouchableOpacity>
      <Text style={styles.title}>{options.title}</Text>
      <TouchableOpacity onPress={logOUt}>
        <AntDesign name="logout" size={32} color={color.lightColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.secondaryColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    paddingTop: 35,
  },
  title: {
    color: "whitesmoke",
    fontSize: 25,
  },
});
