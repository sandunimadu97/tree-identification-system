import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as speech from "expo-speech";

const PlantDetailsPage = ({ route }) => {
  const { tree } = route.params;
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [translate, setTranslate] = React.useState(false);

  const handleTextToSpeech = () => {
    if (!isSpeaking) {
      setIsSpeaking(true);
      speech.speak(
        tree.description +
          ". Scientific name: " +
          tree.scName +
          ". Family: " +
          tree.family +
          ". Order: " +
          tree.order +
          ". Higher Classification: " +
          tree.hClass +
          ". Rank: " +
          tree.rank +
          ". Kingdom: " +
          tree.kingdom,
        {
          onDone: () => setIsSpeaking(false),
        }
      );
    } else {
      speech.stop();
      setIsSpeaking(false);
    }
  };

  const html = `
<html>
  <body>
    <h2>${tree.name.toUpperCase()}</h2>
    <div style="display: flex; flex-direction: column; align-items: center;">
      <img src="${tree.img}" alt="Tree Image" style="max-width: 50%;" />
      <div style="width: 100%; max-width: 600px;">
        <p style="font-size: 16px; margin-top: 10px;">${tree.description}</p>
        <p style="font-size: 16px; margin-top: 5px;">Advantages</p>
        <p>${tree.advantages}</p>
        <p style="font-size: 16px; margin-top: 5px;">Nutritional Value</p>
        <p>${tree.nValue}</p>
        <p style="font-weight: bold; margin-top: 10px;">Scientific Name:</p>
        <p>${tree.scName}</p>
        <p style="font-weight: bold;">Family:</p>
        <p>${tree.family}</p>
        <p style="font-weight: bold;">Order:</p>
        <p>${tree.order}</p>
        <p style="font-weight: bold;">Higher Classification:</p>
        <p>${tree.hClass}</p>
        <p style="font-weight: bold;">Rank:</p>
        <p>${tree.rank}</p>
        <p style="font-weight: bold;">Kingdom:</p>
        <p>${tree.kingdom}</p>
      </div>
    </div>
  </body>
</html>
`;

  const generatedPdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });
    await shareAsync(file.uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {translate ? tree.sinhalaName : tree.name.toUpperCase()}
      </Text>
      <Image src={tree.img} style={styles.image} />
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.description}>{tree.description}</Text>
        <Text style={styles.subtitle}>Advantages:</Text>
        <Text style={styles.description}>{tree.advantages}</Text>
        <Text style={styles.subtitle}>Nutritional Value:</Text>
        <Text style={styles.description}>{tree.nValue}</Text>
        <Text style={styles.subtitle}>Scientific Name:</Text>
        <Text style={styles.text}>{tree.scName}</Text>
        <Text style={styles.subtitle}>Family:</Text>
        <Text style={styles.text}>{tree.family}</Text>
        <Text style={styles.subtitle}>Order:</Text>
        <Text style={styles.text}>{tree.order}</Text>
        <Text style={styles.subtitle}>Higher Classification:</Text>
        <Text style={styles.text}>{tree.hClass}</Text>
        <Text style={styles.subtitle}>Rank:</Text>
        <Text style={styles.text}>{tree.rank}</Text>
        <Text style={styles.subtitle}>Kingdom:</Text>
        <Text style={styles.text}>{tree.kingdom}</Text>
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity style={styles.topButton} onPress={handleTextToSpeech}>
          <Text style={styles.buttonText}>
            {isSpeaking ? "Stop reading" : "Read text"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => {
            setTranslate(!translate);
          }}
        >
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={generatedPdf}>
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PlantDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 25,
    resizeMode: "cover",
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "black",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
    width: "100%",
  },
  topButton: {
    backgroundColor: "black",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
    width: "45%",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
