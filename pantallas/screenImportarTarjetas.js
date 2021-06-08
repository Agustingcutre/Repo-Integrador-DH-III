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
          const usuariosImportados = Json.parse(jsonUsers);
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

                
                <TouchableOpacity style={styles.guardarItems} onPress={ () => this.setState({items:[]})} > 
                          <Text style={styles.guardarItems}>ELIMINAR ITEMS</Text>              
                </TouchableOpacity>
                <TouchableOpacity style={styles.guardarItems} onPress={ () => this.setState({})} > 
                          <Text style={styles.guardarItems}>RECUPERAR ITEMS</Text>              
                </TouchableOpacity>

                

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