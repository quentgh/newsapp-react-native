import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfilStack from "../../stacks/ProfilStack";
import Navbar from "../../Container/Navbar/Navbar";
import News from "../../pages/News/News";

const Drawer = createDrawerNavigator();

export default function GlobalDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (navProps) => <Navbar {...navProps} />,
      }}
    >
      <Drawer.Screen
        name="news"
        component={News}
        options={{
          title: "Top headlines from News API",
        }}
      />
      <Drawer.Screen
        name="profilstack"
        component={ProfilStack}
        options={{
          title: "Profile page",
        }}
      />
    </Drawer.Navigator>
  );
}
