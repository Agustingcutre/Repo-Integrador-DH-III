import "react-native-gesture-handler";
// import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createStackNavigator } from '@react-navigation/stack';

import ImportarTarjetas from "./pantallas/importarTarjetas";
import ScreenImportarTarjetas from "./pantallas/screenImportarTarjetas";
import AcercaDe from "./pantallas/acercaDe";
import BuscarModificar from "./pantallas/buscarModificar";
import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import PapeleraDe from "./pantallas/papeleraDe";

// const Stack = createStackNavigator () ;
const Drawer = createDrawerNavigator();

class App extends Component {
  render() {
    return (
      // <AcercaDe/>

      <NavigationContainer>
        <Drawer.Navigator initialRoutName="Importar Tarjetas">
          <Drawer.Screen name="Importador" component={ImportarTarjetas} />
          <Drawer.Screen name="Acerca De" component={AcercaDe} />
          <Drawer.Screen
            name="Tarjetas importadas"
            component={ScreenImportarTarjetas}
          />
          <Drawer.Screen name="Papelera de reciclaje" component={PapeleraDe} />
          {/* <Drawer.Screen name="Buscar Modificar" component={BuscarModificar} /> */}

          {/* <Stack.Screen name="Importador" component={ImportarTarjetas} />
          <Stack.Screen name="Acerca De" component={AcercaDe} />
          <Stack.Screen name="Vista Tarjetas" component={ScreenImportarTarjetas} /> */}

          {/* <Stack.Screen name="Buscador + Modificador" component={BuscarModificar} /> */}
          {/* <Stack.Screen name="Papelera" component={Papelera} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
