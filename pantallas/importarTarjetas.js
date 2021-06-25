import { StatusBar } from 'expo-status-bar';
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
  Alert,
} from "react-native";
import { getData } from "../src/api/usuarios";

export default class ImportarTarjetas extends React.Component {
  constructor(props) {
    super(props);

    // 1) GUARDAMOS EN EL STATE LOS INDICES DE LOS ITEMS - TARJETAS SELECCIONADAS
    this.state = {
      items: [],
      seleccionado: [],
      tarjetas: 0,
    };
  }

  componentDidMount() {
    Alert.prompt("Hola", "Cuantas tarjetas queres traer?", [
      {
        text: "Buscar",
        onPress: (resultados) => {
          getData(resultados).then((results) => {
            console.log(results.length);
            this.setState({ items: results, tarjetas: resultados });
          });
        },
      },
    ]);
  }

  refrescar() {
    getData(this.state.tarjetas).then((results) => {
      console.log(results.length);
      this.setState({ items: results });
    });
  }

  // dos parametros
  async storeData(Usuarios, results) {
    try {
      // 5) PARA TODOS LOS SELECCIONADOS QUE SON NUMEROS SON LOS INDEXES LOS CONVIERTO EN EL ITEM --> AGARRO EL JSON
      // PARA CADA ITEM SELECCIONADO
      const usuariosJsonViejos = JSON.parse(
        await AsyncStorage.getItem("Usuarios")
      );
      const jsonUsers = JSON.stringify([
        ...usuariosJsonViejos,
        ...this.state.seleccionado.map(
          (seleccionado) => this.state.items[seleccionado]
        ),
      ]);

      console.log(jsonUsers);
      const seleccionadosLength =
        "Se importaron las " +
        this.state.seleccionado.length +
        " tarjetas seleccionadas";

      // 6) LO SETEO EN EL ASYNC STORAGE Y // LOS ITEMS QUE SON LOS JSON LE BORRO TODOS LOS QUE ESTABAN ANTES EN
      // SELECCIONADOS asi cuando guardo se van los que ya estaban seleccionados
      await AsyncStorage.setItem("Usuarios", jsonUsers);

      this.setState({
        items: this.state.items.filter(
          (tarjeta, idx) => !this.state.seleccionado.includes(idx)
        ),
      });

      // 7) SETEO SELECCIONADO A UN ARRAY VACIO PARA QUE SE RESETEE LA SELECCION
      this.setState({ seleccionado: [] });
      console.log("Almacenados con exito");
      alert(seleccionadosLength);
    } catch (e) {
      console.log(e);
    }
  }

  // 4) LOS SELECCIONADOS SON LOS SELECCIONADOS PREVIOS (ELIPSIS) Y EN REALIDAD ESTOY GUARDANDO LOS INDEXES POR ESO PONGO "TARJETA".
  // ENTONCES CON LA ELIPSIS DIGO LOS DE ANTES M´AS EL NUEVO PARA QUE SE VAYAN ACUMULANDO

  seleccionar = (tarjeta) => {
    if (!this.state.seleccionado.includes(tarjeta)) {
      this.setState({ seleccionado: [...this.state.seleccionado, tarjeta] });
    }
  };

  // EL KEY
  keyExtractor = (item, idx) => idx.toString();

  // LO QUE SE MUESTRA

  render() {
    var { items } = this.state;

    return (
      <View>
        {/* <Text style={styles.guardarItems} onPress={ () => this.props.navigation.navigate('Acerca De')}>
               Ir a Acerca De
        </Text> */}
        <TouchableOpacity
          style={styles.guardarItems}
          onPress={() => this.storeData({ items })}
        >
          <Text style={styles.guardarItems}>Guardar Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.guardarItems}
          onPress={() => this.refrescar()}
        >
          <Text style={styles.guardarItems}>Refrescar Items</Text>
        </TouchableOpacity>

        {/* 2) EN ESTA FLATLIST RENDERIZAMOS LAS TARJETAS DEPENDIENDO SI ESTAN SELECCIONADAS O NO
          PREGUNTANDO SI EN EL ESTADO DE LOS SELECCIONADOS INCLUYE "ESTA" TARJETA O ITEM DE LA QUE ESTAMOS ITERANDO
          SI ES VERDADERO ME SALTA SELECCIONADA Y SINO UN STRING VACIO*/}
        <FlatList
          data={this.state.items}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => this.seleccionar(index)}
              style={styles.container}
            >
              <Text style={{ color: "black", fontSize: 18, margin: 5 }}>
                {this.state.seleccionado.includes(index)
                  ? "¡seleccionada!"
                  : ""}
              </Text>
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

// 3) SI LA TARJETA SI ESTA SELECCIONADA MUESTRA LA LEYENDA "SELECCIONADA" Y SINO UN STRING VACIO

const styles = StyleSheet.create({
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
    width: 150,
    height: 100,
    backgroundColor: "lightseagreen",
    display: "flex",
    width: "50%",
    margin: 5,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  verDetalle: {
    backgroundColor: "grey",
  },
  guardarItems: {
    backgroundColor: "lightseagreen",
    margin: 5,
    marginTop: 70,
    marginBottom: 0,
    textAlign: "center",
    paddingBottom: 30,
    borderRadius: 30,
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

