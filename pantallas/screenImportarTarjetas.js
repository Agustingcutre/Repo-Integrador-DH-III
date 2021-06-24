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
            
            <TextInput style={styles.nombre} onChangeText={(buscado) => this.filtrarPorNombre(buscado)} type="text" placeholder=" Buscar (3 filtros) " ></TextInput>


                <TouchableOpacity style={styles.guardarItems} onPress={ async () => {
                  await AsyncStorage.setItem("Usuarios", JSON.stringify([]))
                  await AsyncStorage.setItem("Borrados", JSON.stringify(this.state.items))
                  this.setState({items:[]})
                }} >
                          <Text style={{marginBottom: 40, borderWidth: 1, padding: 10,}} >Enviar a papelera todos</Text>
                </TouchableOpacity>
                


    <FlatList style={styles.jose}
      data={this.state.items}
      renderItem={({item}) => <TouchableOpacity


      onPress={() => {alert(
        "Calle y numero:\n" +

      item.location.street.name+ item.location.street.number + "\n"
        + "\nCiudad:\n" + item.location.city
        + "\n\nPais:\n " + item.location.country


        + "\n\nCodigo postal:\n " + item.location.postcode

        + "\n\nFecha de registro:\n " + item.registered.date
        + "\n\nTelefono:\n " + item.phone
        + "\n\nEmail:\n " + item.email
        
        + "\n\nFecha:\n " + item.dob.date
        + "\n\nEdad:\n " + item.dob.age


      )}}

      >

              <View style={styles.prueba}>
              <Text style={styles.claseUsuarios}>{item.name.first} {item.name.last}</Text>
              <Text style={{marginLeft: 10, marginBottom: 30, padding: 20, paddingLeft: 35, borderRadius: 15,  borderStyle: "solid", borderWidth: 1, color: "white"}}>Ver más </Text>
              <Text style={{marginLeft: 10,  marginBottom: 30, padding: 20, paddingLeft: 35, borderRadius: 15,  borderStyle: "solid", borderWidth: 1, color: "white"}}>Eliminar tarjeta</Text>
              <Image  style={styles.imagen} source={{uri:item.picture.thumbnail}} ></Image>
              </View>
        
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
    paddingTop: 35,
    paddingLeft: 30,
    
    width:150,
    height:100,
    backgroundColor: 'lightseagreen',
    display: "flex",
    width: "100%",
    margin: 5,
  
    color: "white",
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 15,
    
    
  },
  imagen: { 
    width: 125,
    height: 100,
    borderRadius: 100 / 2,
    marginLeft: 10,
    


  },
  prueba: { 
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 60,
    padding: 60,


  },


});
