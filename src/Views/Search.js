import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { db } from "../../config";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchText !== "") {
      searchFirestore();
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const searchFirestore = async () => {
    console.log("Searching Firestore for:", searchText);
    try {
      const collectionRef = db.collection("trees");
      const querySnapshot = await collectionRef
        .where("name", ">=", searchText)
        .where("name", "<=", searchText + "\uf8ff")
        .limit(10)
        .get();

      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });

      setSearchResults(results);
    } catch (error) {
      console.error("Error searching Firestore:", error);
    }
  };

  const handleClick = (item) => {
    navigation.navigate("info", { tree: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleClick(item)}
    >
      <Text style={styles.resultText}>
        {item.name} ({item.family}) {item.scName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search trees"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resultsContainer}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 50,
    backgroundColor: "white",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "lightgray",
    marginTop: 20,
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  resultText: {
    fontSize: 16,
  },
});
