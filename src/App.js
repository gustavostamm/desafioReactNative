import React, {useState, useEffect} from "react";
import api from "./services/api";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [repositories, setRepositories] = useState([]);

    useEffect (() => {
        api.get('repositories').then(response => {
            console.log(response.data);
            setRepositories(response.data);
        });
}, []);

  async function handleLikeRepository(id) {
    const url = 'repositories/';
    const url2 = '/like';
            
    api.post(url + id + url2).then(res => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
      }); 
    })
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository}) => (

            <View style={styles.repositoryContainer}>

            <Text style={styles.repository}>{repository.title}</Text>

            <Text style={styles.url}>{repository.url}</Text>

            <View style={styles.techsContainer}>
              
              <Text style={styles.tech}>{repository.techs[0]}</Text>
              <Text style={styles.tech}>{repository.techs[1]}</Text>
            </View>

            <View style={styles.likesContainer}>
            <Text style={styles.likeText} testID={`repository-likes-1`}>{repository.likes} curtidas</Text>
              
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(repository.id)}
              
              testID={`like-button-1`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
            </View>

          )}
        />
          
            
          
       
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  url: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
