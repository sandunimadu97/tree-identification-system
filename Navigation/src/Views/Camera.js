import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const handleCapturePhoto = async () => {
    if (cameraPermission) {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo:", photo);
        navigation.navigate("result", { image: photo.uri });
      }
    } else {
      console.log("camera not ready.");
    }
  };

  const handleChooseFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log("Gallery Result:", result);
      if (!result.canceled) {
        navigation.navigate("result", { image: result.uri });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
        // onCameraReady={handleCameraReady}
        // onMountError={(e) => {
        //   console.log("Camera preview could not start", e);
        // }}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleCapturePhoto}
          disabled={isCameraReady}
        >
          <Ionicons name={"camera-outline"} size={20} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={handleChooseFromGallery}
        >
          <Ionicons name={"images-outline"} size={20} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  backButtonText: {
    fontSize: 18,
    color: "black",
  },
  camera: {
    width: "90%",
    height: 500,
  },
  captureButton: {
    backgroundColor: "black",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  captureButtonText: {
    fontSize: 12,
    color: "white",
  },
  galleryButton: {
    backgroundColor: "black",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  galleryButtonText: {
    fontSize: 12,
    color: "white",
  },
});

export default CameraScreen;
