import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Card from "../../HOC/Card/Card";
import defaultImage from "../../../../assets/johnDoe-avatar-cadet-blue.png";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const card = {
  title: "Your profil",
  content: "with personal informations",
};

export default function Profil(props) {
  const { utilisateur, setUtilisateur } = useContext(UserContext);

  async function openLibrary() {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setUtilisateur({ ...utilisateur, avatar: result.assets[0] });
    }
  }

  function goToCam() {
    return props.navigation.navigate("camera");
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 100 }}
      style={styles.container}
    >
      <Card title={card.title} content={card.content}>
        <View>
          <Image
            style={styles.img}
            source={utilisateur.avatar ? utilisateur.avatar : defaultImage}
          />
          <View style={styles.btn}>
            <TouchableOpacity onPress={openLibrary}>
              <MaterialIcons name="photo-library" size={35} color="cadetblue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToCam}>
              <Feather name="camera" size={35} color="cadetblue" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.userZone}>
          <View style={styles.userZoneLabel}>
            <Text style={styles.title}>Email :</Text>
            <Text style={styles.label}>{utilisateur.email}</Text>
          </View>
          <View style={styles.userZoneLabel}>
            <Text style={styles.title}>Username :</Text>
            <Text style={styles.label}>{utilisateur.username}</Text>
          </View>
          <View style={styles.userZoneLabel}>
            <Text style={styles.title}>Description :</Text>
            <Text style={styles.label}>
              {utilisateur.description
                ? utilisateur.description
                : "Please, give a personal description"}
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },

  title: {
    padding: 10,
    fontSize: 20,
  },

  userZone: {
    marginTop: 20,
    padding: 8,
    backgroundColor: "#5F9EA0",
    borderRadius: 4,
  },

  userZoneLabel: {
    margin: 2,
    padding: 2,
    backgroundColor: "#eee",
  },

  label: {
    height: 40,
    margin: 6,
    paddingHorizontal: 20,
  },

  img: {
    display: "flex",
    alignSelf: "center",
    width: 140,
    height: 140,
    margin: 8,
    padding: 10,
    borderRadius: 90,
  },

  btn: {
    width: 300,
    margin: 10,
    padding: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    backgroundColor: "hsl(0, 0%, 90%)",
    borderRadius: 4,
  },
});
