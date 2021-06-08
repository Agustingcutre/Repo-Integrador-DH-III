// import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native';
import { getData } from '../src/api/usuarios';


export default class ImportarTarjetas extends React.Component{ 
  constructor(props){
    super(props);
    
    this.state = {
      items: [],
      
    }
  }

  componentDidMount(){
    getData()
    .then( results => {
      console.log(results)
      this.setState({items:results});
    }
      )

  }

  async storeData(Usuarios, results){
    try{
      const jsonUsers = JSON.stringify(this.state.items);
      await AsyncStorage.setItem('Usuarios', jsonUsers);
      console.log("Almacenados con exito");
      alert("Almacenado con exito");
    }catch(e){
      console.log(e);
    }
  };

  






// EL KEY
  keyExtractor = (item,idx) => idx.toString();
  // LO QUE SE MUESTRA
  renderItem = ({item}) =>
  <View style={styles.container}> 
  <Image  style={styles.imagen} source={{uri:item.picture.thumbnail}} ></Image>
    <Text style={styles.claseUsuarios}> {item.name.first} {item.name.last} </Text>
    <Text style={styles.emaily}> {item.email} </Text>
    <Text style={styles.emaily}> {item.dob.date} ({item.dob.age} years)</Text>
    
  </View>
  
 

 render() {
   
  var {items} = this.state
  
 

  
    return ( 
      <View> 

        <TouchableOpacity style={styles.guardarItems} onPress={ () => this.storeData({items})} > 
               <Text style={styles.guardarItems}>Guardar Items</Text>              
          </TouchableOpacity>
          <TouchableOpacity style={styles.guardarItems} onPress={ () => this.setState({})} > 
               <Text style={styles.guardarItems}>Refrescar Items</Text>              
          </TouchableOpacity>
          
            <FlatList  data={this.state.items}
                      renderItem={ this.renderItem
                    }  
                    numColumns={3}
                    keyExtractor= {this.keyExtractor}
                    
                  
            > </FlatList>


            
            

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
  verDetalle: {
    backgroundColor: 'grey',
    

  },
  guardarItems: {
    backgroundColor: 'red',
    margin: 5,
    marginTop: 30,

  },
  imagen: { 
    width: 100,
    height: 100,


  },
  emaily:{
    backgroundColor: 'black',
    color: "white",
    justifyContent: 'center',
    alignItems: "center",

  }
  
});

