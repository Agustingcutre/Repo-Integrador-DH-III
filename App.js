
import 'react-native-gesture-handler';
// import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import ImportarTarjetas from './pantallas/importarTarjetas';
import ScreenImportarTarjetas from './pantallas/screenImportarTarjetas';
import AcercaDe from './pantallas/acercaDe';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ImageBackground} from 'react-native';


const Stack = createStackNavigator () ; 

 class App extends Component{ 
  



 render() {


  
    return ( 
      // <AcercaDe/>

      <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Importador" component={ImportarTarjetas} />
          <Stack.Screen name="Acerca De" component={AcercaDe} />
          <Stack.Screen name="Vista Tarjetas" component={ScreenImportarTarjetas} />
          {/* <Stack.Screen name="Buscador + Modificador" component={BuscarModificar} /> */}
          {/* <Stack.Screen name="Papelera" component={Papelera} /> */}
          
      </Stack.Navigator>
      </NavigationContainer>
      
    )
  }
 
 }





 

 export default App; 
 




