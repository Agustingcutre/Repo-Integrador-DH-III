import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';

export default class AcercaDe extends Component {

render() {

  return( 
    <View style={styles.silla}> 
        <Text>
                 Manuel Firpo, Tomás López Saavedra y Agustín Cutre son los desarrolladores de esta
        </Text>
  </View>
  )

    

        }
  

    }


    const styles = StyleSheet.create({
      silla: {
        margin: 100,
      },
    
    
    });

