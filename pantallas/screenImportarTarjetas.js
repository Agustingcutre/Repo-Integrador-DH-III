import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextComponent, TextInput, Image} from 'react-native';
import {getData} from '../src/api/usuarios'
import { storeData} from './importarTarjetas';

export default class ScreenImportarTarjetas extends Component {

    constructor(props){
        super(props);

        this.state = {
          items: [],
          usuariosImportados: [],
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

     
      
// BUSCADOR
async filtrarPorNombre(buscado) {
  if (buscado.length >0) {
    var escrito = buscado 
    let usuariosImportados = this.state.items
    
  
    let filtrado = usuariosImportados.filter(respuesta => {
      let itemData = respuesta.name.first.toUpperCase()
      let lastName = respuesta.name.last.toUpperCase()
      let age = respuesta.dob.age.toString()
      let textData = escrito.toUpperCase()
      if(itemData.includes(textData)) 
      return(
        itemData.includes(textData) || lastName.includes(textData) || age.includes(textData)
      )
    })
      console.log(buscado)
      this.setState({usuariosImportados:filtrado})
  
  }
  else{
    await this.getData()
    console.log("No buscaste nada")
  }
  
  }

  // TERMINA BUSCADOR



    render(){
      var {items} = this.state

        return(
          <View style={styles.container}>
            
            <TextInput style={styles.nombre} onChangeText={(buscado) => this.filtrarPorNombre(buscado)} type="text" placeholder="buscar por nombre" ></TextInput>


                <TouchableOpacity style={styles.guardarItems} onPress={ async () => {
                  await AsyncStorage.setItem("Usuarios", JSON.stringify([]))
                  await AsyncStorage.setItem("Borrados", JSON.stringify(this.state.items))
                  this.setState({items:[]})
                }} >
                          <Text style={styles.guardarItems} >ELIMINAR ITEMS</Text>
                </TouchableOpacity>
                


    <FlatList style={styles.jose}
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
        + "\nEmail:\n " + item.email
        
        + "\nFecha:\n " + item.dob.date
        + "\nEdad:\n " + item.dob.age


      )}}

      >
          <Text style={styles.claseUsuarios}>{item.name.first} {item.name.last}</Text>
          <Image  style={styles.imagen} source={{uri:item.picture.thumbnail}} ></Image>
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
    marginTop: 70,
    justifyContent: 'center',
    alignItems: "center",
    margin: 30,
    backgroundColor: 'lightseagreen',
    borderRadius: 15, 
    paddingTop: 50, 
    paddingBottom: 50, 

  },
  nombre: {
    margin:40,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "white",
    width:150,
    height:50,
  },
  claseUsuarios: {
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    width:150,
    height:100,
    backgroundColor: 'black',
    display: "flex",
    width: "50%",
    margin: 5,
    color: "white",
    justifyContent: 'center',
    alignItems: "center",
    
    
  },
  imagen: { 
    width: 100,
    height: 100,


  },


});
