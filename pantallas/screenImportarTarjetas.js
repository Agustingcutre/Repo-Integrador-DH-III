import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import {getData} from '../src/api/usuarios'
import { storeData} from './importarTarjetas';

export default class ScreenImportarTarjetas extends Component {

    constructor(props){
        super(props);

        this.state = {
          items: [],

        }
      }
      componentDidMount() {
        this.traerUsuarios()

      }

      async traerUsuarios() {
        try {
          const jsonUsers = await AsyncStorage.getItem("Usuarios");
          console.log(jsonUsers)
          const usuariosImportados = JSON.parse(jsonUsers);
          this.setState({items: usuariosImportados})

        }
        catch(e){
          alert("No pudimos cargar los usuarios");

        }
      }






    render(){
      var {items} = this.state

        return(
          <View style={styles.container}>


                <TouchableOpacity style={styles.guardarItems} onPress={ async () => {
                  await AsyncStorage.setItem("Usuarios", JSON.stringify([]))
                  await AsyncStorage.setItem("Borrados", JSON.stringify(this.state.items))
                  this.setState({items:[]})
                }} >
                          <Text style={styles.guardarItems}>ELIMINAR ITEMS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.guardarItems} onPress={ () => this.setState({})} >
                          <Text style={styles.guardarItems}>RECUPERAR ITEMS</Text>
                </TouchableOpacity>


    <FlatList
      data={this.state.items}
      renderItem={({item}) => <TouchableOpacity


      onPress={() => {alert(
        "Calle y numero:\n" +

      item.location.street.name+ item.location.street.number + "\n"
        + "Ciudad:\n " + item.location.city
        + "\nPais:\n " + item.location.country


        + "\nCodigo postal:\n " + item.location.postcode

        + "\nFecha de registro:\n " + item.registered.date
        + "\nTelefono:\n " + item.phone


      )}}

      >
          <Text>{item.name.first} {item.name.last}</Text>
        </TouchableOpacity>}
    />

          </View>




        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    marginTop: 50,
    justifyContent: 'center',
    alignItems: "center",
    margin: 5,
    backgroundColor: "purple"
  },


});
