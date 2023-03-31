import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import Cam from "../pages/Cam/Cam";
import Profil from "../pages/Profil/Profil";
import { color } from "../../styles/color";

const Pile = createStackNavigator();

export default function ProfilStack() {
  return (
    <Pile.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: color.primaryColor },
        headerTitleStyle: { color: color.lightColor },
      }}
    >
      <Pile.Screen
        name="profil"
        component={Profil}
        options={{
          title: "Your profile page",
          headerShown: false,
        }}
      />
      <Pile.Screen
        options={{ title: "Take a picture" }}
        name="camera"
        component={Cam}
      />
    </Pile.Navigator>
  );
}
