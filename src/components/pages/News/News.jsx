import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { color } from "../../../styles/color";
import InputWithError from "../../../ui/InputWithError/InputWithError";
import { AntDesign } from "@expo/vector-icons";
import Btn from "../../../ui/Btn/Btn";
import * as WebBrowser from "expo-web-browser";

const key = "YOUR_API_KEY";
const NEWS_GET_TOPHEADLINES_URL = `https://newsapi.org/v2/top-headlines?country=fr&apiKey=${key}`;

const searchURL = (query) =>
  `https://newsapi.org/v2/everything?language=fr&q=${query}&apiKey=${key}`;

export default function News() {
  const [listArticles, setListArticles] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchArticleInput, setSearchArticleInput] = useState("");
  const [searchArticleError, setSearchArticleError] = useState();
  const [result, setResult] = useState(null);

  function handleSearchArticle(txt) {
    setSearchArticleInput(txt);
    setSearchArticleError("");
  }

  async function searchArticles() {
    if (searchArticleInput.length > 1) {
      fetch(searchURL(searchArticleInput)).then((response) => {
        response.json().then((data) => {
          setListArticles(data.articles);
        });
      });
    } else {
      searchArticleError("Please to give a key word");
    }
  }

  useEffect(() => {
    axios.get(NEWS_GET_TOPHEADLINES_URL).then((response) => {
      setListArticles(response.data.articles);
      setIsLoading(false);
    });
    return () => {
      setIsLoading(true);
      setListArticles([]);
    };
  }, [update]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const _handlePressButtonAsync = async (path) => {
    let result = await WebBrowser.openBrowserAsync(path);
    setResult(result);
  };

  return (
    <ScrollView>
      <View style={styles.searchArea}>
        <Text style={styles.content}>Search articles here</Text>
        <InputWithError
          value={searchArticleInput}
          onChangeText={handleSearchArticle}
          placeholder="Give some key words"
          keyboardType="default"
          errorMsg={searchArticleError}
        ></InputWithError>
        <Btn action={searchArticles} label={"Go search !"}>
          <AntDesign name="search1" size={24} color={color.lightColor} />
        </Btn>
      </View>
      {listArticles.map((art) => {
        return (
          <View style={styles.container} key={art.url}>
            <Text style={styles.title}>{art.title}</Text>
            <Image
              style={{ width: "100%", height: 300 }}
              source={{
                uri: art.urlToImage
                  ? art.urlToImage
                  : "https://via.placeholder.com/300",
              }}
            />
            <Text style={styles.content}>{art.author}</Text>
            <TouchableOpacity
              style={styles.content}
              onPress={() => _handlePressButtonAsync(art.url)}
            >
              Open article in a web browser
            </TouchableOpacity>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.refreshBtn}
        onPress={() => setUpdate(!update)}
      >
        <Text style={styles.txtBtn}>Refresh</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    margin: 20,
    padding: 20,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: color.secondaryColor,
    maxWidth: 500,
    alignSelf: "center",
  },

  searchArea: {
    backgroundColor: "#f8f8f8",
    margin: 10,
    padding: 10,
    alignSelf: "center",
    borderRadius: 4,
  },

  title: {
    color: color.thirdColor,
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  content: {
    margin: 12,
    color: color.thirdColor,
    fontSize: 20,
  },
  refreshBtn: {
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

  txtBtn: {
    color: color.lightColor,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 10,
  },
});
