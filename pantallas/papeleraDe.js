import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

export default class PapeleraDe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("Borrados").then((res) => {
      this.setState({ items: JSON.parse(res) });
    });
  }

  deleteTrash() {
    AsyncStorage.removeItem("Borrados").then(() =>
      this.setState({ items: [] })
    );
  }

  refreshTrash() {
    AsyncStorage.getItem("Borrados").then((res) => {
      this.setState({ items: JSON.parse(res) });
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.guardarItems}
          onPress={() => this.refreshTrash()}
        >
          <Text style={styles.guardarItems}>Refrescar papelera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.guardarItems}
          onPress={() => this.deleteTrash()}
        >
          <Text style={styles.guardarItems}>Eliminar definitivamente</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.container}>
              <Image
                style={styles.imagen}
                source={{ uri: item.picture.thumbnail }}
              ></Image>
              <Text style={styles.claseUsuarios}>
                {" "}
                {item.name.first} {item.name.last}{" "}
              </Text>
              <Text style={styles.emaily}> {item.email} </Text>
              <Text style={styles.emaily}>
                {" "}
                {item.dob.date} ({item.dob.age} years)
              </Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={this.keyExtractor}
        >
          {" "}
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  guardarItems: {
    backgroundColor: "lightseagreen",
    margin: 10,
    marginTop: 70,
    textAlign: "center",
    paddingBottom: 30,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    display: "flex",
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "lightseagreen",
    borderRadius: 10,
  },
  claseUsuarios: {
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    height: 100,
    backgroundColor: "lightseagreen",
    display: "flex",
    width: "50%",
    margin: 5,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  imagen: {
    width: 100,
    height: 100,
    paddingBottom: 5,
    borderRadius: 100 / 2,
  },

  emaily: {
    backgroundColor: "lightseagreen",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
    marginBottom: 30,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 15,
    margin: 10,
  },
});
