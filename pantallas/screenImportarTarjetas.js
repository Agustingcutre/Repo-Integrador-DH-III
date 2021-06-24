import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextComponent, TextInput, Image, Alert} from 'react-native';
import {getData} from '../src/api/usuarios'
import { storeData} from './importarTarjetas';

export default class ScreenImportarTarjetas extends Component {

    constructor(props){
        super(props);

        this.state = {
          items: [],
<<<<<<< Updated upstream
          comentarios:"",
        
         
          
=======
>>>>>>> Stashed changes
          
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
buscar(buscado) {

  if(buscado.length !==0) {
    const data = this.state.items.filter(respuesta => {
      const itemData = respuesta.name.first.toUpperCase(); 
      const lastNameData = respuesta.name.last.toUpperCase();
<<<<<<< Updated upstream
      const ciudadData = respuesta.location.city.toUpperCase() 
      const paisData = respuesta.location.state.toUpperCase() 
      const buscadoData = buscado.toUpperCase();
      return itemData.includes(buscadoData) || lastNameData.includes(buscadoData) || ciudadData.includes(buscadoData) || paisData.includes(buscadoData)
=======
      const edadData = respuesta.dob.age.toString()
      const buscadoData = buscado.toUpperCase();
      return itemData.includes(buscadoData) || lastNameData.includes(buscadoData) || edadData.includes(buscadoData)
>>>>>>> Stashed changes

    });
      this.setState({
        items : data,
        buscado: buscado
      })

<<<<<<< Updated upstream
  }
  else {
    this.setState({
      items:this.state.items
    })
   
  }
}
   

  // TERMINA BUSCADOR


  // COMENTARIOS

async storageComentarios (value) {
  try{
      Object.assign(value, { comentarios: this.state.comentarios} );
      const jsonValue = JSON.stringify(this.state.items)
      await AsyncStorage.setItem("Usuarios", jsonValue)
      console.log("se guardo en comentario")




  }
  catch(error){
    console.log(error);

=======
  }
  else{
    this.setState({
      items:this.state.items
    })
   
>>>>>>> Stashed changes
  }
}
   


}







  // TERMINA COMENTARIOS



    render(){
      var {items} = this.state
<<<<<<< Updated upstream
      var comentarios = this.state.comentarios
     
=======
>>>>>>> Stashed changes
      

        return(
          <View style={styles.container}>
            
<<<<<<< Updated upstream
            <TextInput  placeholder="Buscar"  style={styles.nombre}  onChangeText={(buscado) => this.buscar(buscado) }  />  
=======
            <TextInput  placeholder="Filtrar por nombre"  style={styles.nombre}  onChangeText={(buscado) => this.buscar(buscado) }  />  
>>>>>>> Stashed changes


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
              <Text> {comentarios}</Text>
              
              {/* COMENTARIOS */}
              <TextInput  
                       placeholder="Ingrese algun comentario.."
                       style={styles.nombre}
                       numberOfLines={10}
                       multiline={true}
                      onChangeText={text=> this.setState({comentarios : text})}
                            /> 


                        <TouchableOpacity onPress= {()=> this.storageComentarios(item)}>
                              <Text> Guardar comentario </Text>
                         </TouchableOpacity>
                         {/* TERMINAN COMENTARIOS */}
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
