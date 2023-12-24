import React, { startTransition, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { db } from "../../config";

const ResultScreen = ({ navigation, route }) => {
  const { image } = route.params;
  const [result, setResult] = useState({});
  const [tree, setTree] = useState({});

  useEffect(() => {
    const getDetails = async () => {
      try {
        const formData = new FormData();
        formData.append("image", {
          uri: image,
          name: "image.jpg",
          type: "image/jpeg",
        });

        console.log(formData);

        const response = await axios.post(
          "https://6192-2407-c00-c000-c8c7-f132-96b-25b5-b4ba.ngrok-free.app/classify",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Here");
        setResult(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getDetails();
  }, []);

  const handleViewDetails = () => {
    db.collection("trees")
      .where("name", "==", result.predicted_class)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No document found.");
          return;
        }

        querySnapshot.forEach((doc) => {
          console.log("document:", doc.data());
          navigation.navigate("info", { tree: doc.data() });
        });
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
      });
  };

  const handleRetry = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Image Results</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.subTitle}>Result</Text>
      <Text style={styles.resultText}>
        {result.predicted_class ? result.predicted_class : "Loading ..."}
      </Text>
      <Text style={styles.confidenceText}>
        Search Confidence ={" "}
        {result.confidence
          ? (result.confidence * 100).toFixed(2) + "%"
          : "Loading ..."}
      </Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={handleViewDetails}
      >
        <Text style={styles.detailsButtonText}>View More Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 70,
    borderRadius: 8,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  resultText: {
    fontSize: 30,
    marginBottom: 10,
  },
  confidenceText: {
    fontSize: 16,
    marginBottom: 100,
  },
  detailsButton: {
    width: "80%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 8,
    marginBottom: 10,
  },
  detailsButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  retryButton: {
    width: "80%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000000",
  },
  retryButtonText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
  },
});

export default ResultScreen;
