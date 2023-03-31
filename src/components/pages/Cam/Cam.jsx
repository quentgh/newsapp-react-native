import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const card = {
  title: "Camera preview",
  content: "Take a picture for your avatar",
};

export default function Cam(props) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camType, setCamType] = useState(CameraType.back);
  let size = Dimensions.get("window");
  const camWidth = size.width;
  const camHeight = (size.width * 16) / 9;
  const camRef = useRef();

  const { utilisateur, setUtilisateur } = useContext(UserContext);

  useEffect(() => {
    if (permission && permission.status != "granted") {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <Text>Please accept to use camera</Text>;
  }

  if (!permission.granted) {
    return <Text>Camera access denied</Text>;
  }

  function toggleCameraType() {
    setCamType(
      camType === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    let picture = await camRef.current.takePictureAsync();
    setUtilisateur({ ...utilisateur, avatar: picture });
    props.navigation.pop();
  }

  return (
    <View style={styles.camPrw}>
      <Camera
        ref={camRef}
        type={camType}
        ratio="16:9"
        style={{ width: camWidth, height: camHeight }}
      >
        <View style={styles.flipCamBtn}>
          <TouchableOpacity onPress={toggleCameraType}>
            <MaterialCommunityIcons
              name="camera-flip-outline"
              size={40}
              color="whitesmoke"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture}>
            <MaterialIcons name="photo-camera" size={50} color="teal" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 50,
  },

  camPrw: {
    padding: 16,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  flipCamBtn: {
    marginTop: "auto",
    marginBottom: 80,
    marginLeft: "auto",
    marginRight: 20,
    width: 200,
    height: 80,
    backgroundColor: "hsl(180,20%,25%)",

    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
  },
});
