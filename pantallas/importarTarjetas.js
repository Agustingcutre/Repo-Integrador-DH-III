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
      seleccionado: [],
      
    }
  }

  componentDidMount(){
    getData()
    .then( results => {
      console.log(results.length)
      this.setState({items:results});
    }
      )

    
  }

  refrescar(){
    getData()
    .then( results => {
      console.log(results.length)
      this.setState({items:results});
    }
      )

  }

  async storeData(Usuarios, results){
    try{
      const jsonUsers = JSON.stringify(this.state.seleccionado.map((seleccionado) => this.state.items[seleccionado]));
      
      console.log(jsonUsers)
      const seleccionadosLength = "se importaron las " +  this.state.seleccionado.length  + " tarjetas seleccionadas"
      await AsyncStorage.setItem('Usuarios', jsonUsers);


      this.setState({items: this.state.items.filter((tarjeta, idx) => !this.state.seleccionado.includes(idx))})
      this.setState({seleccionado: []})
      console.log("Almacenados con exito");
      alert(seleccionadosLength);
    }catch(e){
      console.log(e);
    }
  };

  




  seleccionar = (tarjeta) => {

    if (!this.state.seleccionado.includes(tarjeta)) {
      
    this.setState({seleccionado: [...this.state.seleccionado, tarjeta] })
    }

  }

// EL KEY
  keyExtractor = (item,idx) => idx.toString();
  // LO QUE SE MUESTRA
  
 

 render() {
   
  var {items} = this.state
  
  
    return ( 
      <View> 
        {/* <Text style={styles.guardarItems} onPress={ () => this.props.navigation.navigate('Acerca De')}>
               Ir a Acerca De
        </Text> */}
        <TouchableOpacity style={styles.guardarItems} onPress={ () => this.storeData({items})} > 
               <Text style={styles.guardarItems}>Guardar Items</Text>              
          </TouchableOpacity>
          <TouchableOpacity style={styles.guardarItems} onPress={ () => this.refrescar()} > 
               <Text style={styles.guardarItems}>Refrescar Items</Text>              
          </TouchableOpacity>
         
          
            <FlatList  data={this.state.items}
                      renderItem={ ({item, index}) =>
                      <TouchableOpacity onPress={() => this.seleccionar(index)} style={styles.container}>
                        <Text style={{color: "black", fontSize: 18}}>{this.state.seleccionado.includes(index) ? "seleccionada" : ""}</Text>
                      <Image  style={styles.imagen} source={{uri:item.picture.thumbnail}} ></Image>
                        <Text style={styles.claseUsuarios}> {item.name.first} {item.name.last} </Text>
                        <Text style={styles.emaily}> {item.email} </Text>
                        <Text style={styles.emaily}> {item.dob.date} ({item.dob.age} years)</Text>
                        
                        
                      </TouchableOpacity>
                    }  
                    numColumns={2}
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
    backgroundColor: 'lightseagreen',
    borderRadius: 10,
    
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
    backgroundColor: 'lightseagreen',
    margin: 10,
    marginTop: 70,
    textAlign: 'center',
    paddingBottom: 30,
    borderRadius: 30,
    

  },
  imagen: { 
    width: 100,
    height: 100,
    paddingBottom: 5,


  },
  emaily:{
    backgroundColor: 'black',
    color: "white",
    justifyContent: 'center',
    alignItems: "center",
    paddingBottom: 30,
    marginBottom: 30,
    paddingLeft: 5,
    paddingRight: 5,

  }
  
});

