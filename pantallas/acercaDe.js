import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default class AcercaDe extends Component {
  render() {
    return (
      <View style={styles.silla}>
        {/* <Text onPress={ () => this.props.navigation.navigate('Vista Tarjetas')}>
               Ir a vista tarjetas
        </Text> */}
        <Text>
          Manuel Firpo, Tomás López Saavedra y Agustín Cutre son los
          desarrolladores de esta app.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  silla: {
    marginTop: 100,
    marginRight: 20,
    marginLeft: 20,
    paddingBottom: 100,
    paddingTop: 100,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "lightseagreen",
    borderRadius: 10,
  },
});
